import cluster from "cluster";
import { availableParallelism } from "node:os";
import Express from "express";
import { json } from "express";
import cors from "cors";
import { route } from "./application/http/transaction/transaction.route";
import "dotenv/config";

const PORT = process.env.PORT_SERVER || 3000;

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Worker - Initialize Express server
  const app = Express();

  app.use(json());
  app.use(cors());

  app.use(route);

  app.listen(PORT, () => {
    console.log(
      `Worker ${process.pid} started. Server running on port ${PORT}.`
    );
  });
}
