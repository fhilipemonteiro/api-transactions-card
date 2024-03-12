import Express, { json } from "express";
import "dotenv/config";

const app = Express();

app.use(json);

app.listen(process.env.PORT_SERVER || 3000, () => {
  console.log(`Server running on port ${process.env.PORT_SERVER || 3000}.`);
});
