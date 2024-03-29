import Express, { json } from "express";
import cors from "cors";
import { route } from "./application/http/transaction/transaction.route";
import "dotenv/config";

const app = Express();

app.use(json());
app.use(cors());

app.use(route);

app.listen(process.env.PORT_SERVER || 3000, () => {
  console.log(`Server running on port ${process.env.PORT_SERVER || 3000}.`);
});
