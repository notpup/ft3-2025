// De mi pana felipe :pray:
import morgan from "morgan";
import chalk from "chalk";

morgan.token("body", (req, res) =>
  Object.values(req.body).length > 0
    ? `\n${chalk.hex("00ECFF").bold("Request Body")}: ${JSON.stringify(
        req.body
      )}`
    : ""
);

morgan.token("label", (req, res) =>
  res.statusCode >= 400 && res.statusCode <= 500
    ? chalk.hex("FF1B00").bold("ERROR")
    : chalk.hex("0FFF00").bold("INFO")
);

morgan.token("statusColor", (req, res) => {
  const status = (
    typeof res.headersSent !== "boolean" ? Boolean(res.header) : res.headersSent
  )
    ? res.statusCode
    : undefined;

  const color =
    status >= 500
      ? "FF1B00" // red
      : status >= 400
      ? "FFC500" // yellow
      : status >= 300
      ? "00ECFF" // cyan
      : status >= 200
      ? "0FFF00" // green
      : 0;

  return chalk.hex(color).bold(status);
});

morgan.token("errorMessage", (req, res) => {
  return res.locals.body?.details?.success || res.locals.body?.success
    ? ` ${chalk.hex("FFC500").bold("\nError message: ")}${chalk.yellowBright(
        JSON.stringify(res.locals.body.message)
      )}`
    : "";
});

const morganConfig = (tokens, req, res) => {
  return [
    tokens.label(req, res),
    res.statusMessage,
    tokens.statusColor(req, res),
    tokens.date(req, res, "web"),
    tokens.url(req, res),
    tokens.res[(req, res, "content-length")],
    `${tokens["response-time"](req, res)} ms`,
    tokens.body(req, res),
    tokens.errorMessage(req, res),
  ].join(" ");
};
