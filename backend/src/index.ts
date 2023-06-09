import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  getAllJobListings,
  getSingleJob,
  newJoblisting,
  getUserByLensId,
} from "./controllers/company.controller.js";
import {
  getStatus,
  initSession,
  responseFromReclaimWallet,
} from "./controllers/reclaim.controller.js";
import { getAllUser, registerUser } from "./controllers/user.controller.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json()); // body parser- parse JSON

//Reclaim

app.post("/verify/init", initSession);
app.get("/verify/status/:id", getStatus);

// Company
app.get("/company/job", getAllJobListings);
app.get("/company/job/:id", getSingleJob);
app.post("/company/job", newJoblisting);

//user
app.post("/user/register", registerUser);
app.get("/user", getAllUser);
app.get("/user/:id", getUserByLensId);

//React Native
app.use(express.text({ type: "*/*" }));
app.post("/callback/:callbackId", responseFromReclaimWallet);

app.get("/", (req, res) => {
  res.send("This route works!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on Prort- ${PORT}`);
});
