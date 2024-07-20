import express from "express";
import cors from "cors";
// import https from "https";
// import fs from "fs";

import filesRoutes from "./routes/files";
import usersRoutes from "./routes/users";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/api/users", usersRoutes);
app.use("/api/files", filesRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
  });
}

// const PORT = 3004;
// const KEY = fs.readFileSync("/etc/letsencrypt/live/seucardapioaqui.com-0001/privkey.pem");
// const CA = fs.readFileSync("/etc/letsencrypt/live/seucardapioaqui.com-0001/chain.pem");
// const CERT = fs.readFileSync("/etc/letsencrypt/live/seucardapioaqui.com-0001/cert.pem");

// const https_options = {
//   key: KEY,
//   ca: CA,
//   cert: CERT,
// };

// https.createServer(https_options, app).listen(PORT, "", undefined, () => {
//   console.log(`CSV Upload File: ${PORT}`);
// });

export default app;
