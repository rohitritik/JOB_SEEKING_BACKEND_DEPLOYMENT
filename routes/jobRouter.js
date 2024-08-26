import express from "express";
import { getAllJobs, postJob, getmyJobs,updateJob,deleteJob } from "../controllers/jobController.js";
import { isAuthorized } from "../middlewares/auth.js";
import { getSingleJob } from "../controllers/userController.js";

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post",isAuthorized, postJob);
router.get("/getmyJobs",isAuthorized, getmyJobs);
router.put("/update/:id",isAuthorized, updateJob);
router.delete("/delete/:id",isAuthorized, deleteJob);
router.get("/:id",isAuthorized,getSingleJob);

export default router;