import { Router } from "express";
import {
  getIncidents,
  updateIncident,
  login,
  logIncident,
  assignIncident,
  getUsers,
} from "./controller";

const router = Router();

router.post("/login", login);

router.post("/logIncident", logIncident);

router.get("/getIncidents/:id", getIncidents);

router.get("/getIncidents", getIncidents);

router.post("/updateIncident", updateIncident);

router.post("/assignIncident", assignIncident);

router.get("/users", getUsers);

module.exports = router;
