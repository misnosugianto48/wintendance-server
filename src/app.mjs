import { web } from "./apps/web.mjs";
import { config } from "./utils/config.mjs";

web.get("/", (req, res) => {
  res.send("Wintendance");
});

web.listen(config.app.port, () => {
  console.info(`listening on port ${config.app.port}`);
});
