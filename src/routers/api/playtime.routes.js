// routes/playtime.js
import express from "express";
import db from "../../models/index.js";

const router = express.Router();

const TIPOS = ["map", "lobby", "system", "gamemode"];
const SOURCES = ["official", "custom"];
const MAX_ENTRIES = 500;

const Models = {
  official: db.OfficialPlaytime,
  custom: db.CustomPlaytime,
};

function periodos(now = new Date()) {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");

  const t = new Date(Date.UTC(y, now.getUTCMonth(), now.getUTCDate()));
  const dia = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - dia);
  const inicio = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const sem = Math.ceil(((t - inicio) / 86400000 + 1) / 7);

  return {
    year: String(y),
    month: `${y}-${m}`,
    week: `${t.getUTCFullYear()}-W${String(sem).padStart(2, "0")}`,
  };
}

const isEmptyArray = (v) => Array.isArray(v) && v.length === 0;

router.post("/", async (req, res) => {
  const p = periodos();
  const opsPorSource = {};
  let total = 0;

  for (const source of SOURCES) {
    const bloque = req.body?.[source];
    if (bloque === undefined || isEmptyArray(bloque)) continue;

    if (typeof bloque !== "object" || bloque === null || Array.isArray(bloque)) {
      return res.status(400).json({ error: `${source} debe ser un objeto` });
    }

    const ops = [];

    for (const type of TIPOS) {
      const data = bloque[type];
      if (data === undefined || isEmptyArray(data)) continue;

      if (typeof data !== "object" || data === null || Array.isArray(data)) {
        return res
          .status(400)
          .json({ error: `${source}.${type} debe ser un objeto { nombre: segundos }` });
      }

      for (const [name, seconds] of Object.entries(data)) {
        if (
          !name ||
          name.length > 100 ||
          typeof seconds !== "number" ||
          !Number.isFinite(seconds) ||
          seconds <= 0
        ) {
          return res
            .status(400)
            .json({ error: `valor inválido en ${source}.${type}.${name}` });
        }

        ops.push({
          updateOne: {
            filter: { _id: `${type}:${name}` },
            update: {
              $inc: {
                total: seconds,
                [`year.${p.year}`]: seconds,
                [`month.${p.month}`]: seconds,
                [`week.${p.week}`]: seconds,
              },
              $setOnInsert: { name, type },
            },
            upsert: true,
            setDefaultsOnInsert: false,
          },
        });
      }
    }

    if (ops.length) {
      opsPorSource[source] = ops;
      total += ops.length;
    }
  }

  if (total === 0) return res.status(400).json({ error: "sin datos para guardar" });
  if (total > MAX_ENTRIES) return res.status(400).json({ error: "demasiadas entradas" });

  const fuentes = Object.keys(opsPorSource);
  const resultados = await Promise.allSettled(
    fuentes.map((s) => bulkConReintento(Models[s], opsPorSource[s]))
  );

  const failed = [];
  resultados.forEach((r, i) => {
    if (r.status === "rejected") {
      failed.push(fuentes[i]);
      console.error(`playtime ${fuentes[i]}:`, r.reason);
    }
  });

  if (failed.length) return res.status(500).json({ ok: false, failed });
  res.json({ ok: true, saved: total });
});

async function bulkConReintento(Model, ops) {
  try {
    await Model.bulkWrite(ops, { ordered: false });
  } catch (err) {
    const errores = err.writeErrors;
    if (!errores?.length || !errores.every((e) => e.code === 11000)) throw err;
    // Reintentar solo las que fallaron por duplicate key
    await Model.bulkWrite(
      errores.map((e) => ops[e.index]),
      { ordered: false }
    );
  }
}

// GET /official/map  |  GET /custom/lobby
router.get("/:source/:type", async (req, res) => {
  const { source, type } = req.params;
  if (!SOURCES.includes(source)) {
    return res.status(400).json({ error: `source debe ser ${SOURCES.join("|")}` });
  }
  if (!TIPOS.includes(type)) {
    return res.status(400).json({ error: `type debe ser ${TIPOS.join("|")}` });
  }

  const docs = await Models[source]
    .find({ type })
    .sort({ total: -1 })
    .limit(100)
    .lean();
  res.json(docs);
});

export default router;