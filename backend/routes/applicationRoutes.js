import express from "express";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";
import {
  deleteApplication,
  employerGetAllApplication,
  jobSeekerGetAllApplication,
  postApplication,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

const router = express.Router();

// Post new application
router.post(
  "/post/:id",
  isAuthenticated,
  isAuthorized("Job Seeker"),
  postApplication
);

// Get all applications for employer
router.get(
  "/employer/getall",
  isAuthenticated,
  isAuthorized("Employer"),
  employerGetAllApplication
);

// Get all applications for job seeker
router.get(
  "/jobseeker/getall",
  isAuthenticated,
  isAuthorized("Job Seeker"),
  jobSeekerGetAllApplication
);

// Delete application
router.delete("/delete/:id", isAuthenticated, deleteApplication);

// Update application status
router.put(
  "/:id/status",
  isAuthenticated,
  isAuthorized("Employer"),
  updateApplicationStatus
);

export default router;