import config from "./utils/config";
import app from "./app";

const PORT = Number(config.PORT);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});