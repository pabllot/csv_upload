import express from "express";
import filesRoutes from "./routes/files";
import usersRoutes from "./routes/users";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3000;

app.use("/api/users", usersRoutes);
app.use("/api/files", filesRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
  });
}

export default app;
