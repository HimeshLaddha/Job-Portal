import express from "express"
import { applyForJob, getUserData, getUserJobApplications, updateResume } from "../controllers/userController.js";
import upload from "../config/multer.js"

const router = express.Router();

// get user data
router.get('/user', getUserData);

// apply for a job
router.post("/apply", applyForJob);

// get applied jobs data
router.get("/applications", getUserJobApplications);

// update user data (resume)
router.post("/update-resume", upload.single('resume'), updateResume)

export default router;