import { Request, Response } from "express";
import {
  loginService,
  logIncidentService,
  getIncidentsService,
  updateIncidentService,
  getUsersService,
  assignIncidentService,
} from "./service";
import { ErrorConstants, IncidentData, UserData } from "./Types";

const login = (req: Request<UserData>, res: Response) => {
  const body = req.body;
  loginService(body, req, (error: Error, results: any) => {
    if (error) {
      return res.status(500).json(ErrorConstants.DatabaseConnection);
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

const logIncident = (req: Request<IncidentData>, res: Response) => {
  console.log("hello world");

  const body = req.body;
  logIncidentService(body, req, (error: Error, results: any) => {
    if (error) {
      return res.status(500).json(ErrorConstants.DatabaseConnection);
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

const updateIncident = (req: Request<IncidentData>, res: Response) => {
  console.log("hello world");

  const body = req.body;
  updateIncidentService(body, req, (error: Error, results: any) => {
    if (error) {
      return res.status(500).json(ErrorConstants.DatabaseConnection);
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

const assignIncident = (req: Request<IncidentData>, res: Response) => {
  console.log("hello world");

  const body = req.body;
  assignIncidentService(body, req, (error: Error, results: any) => {
    if (error) {
      return res.status(500).json(ErrorConstants.DatabaseConnection);
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

const getIncidents = (req: Request<any>, res: Response) => {
  console.log("Check  status");
  //@ts-ignore
  const incidentId = req.params?.id ?? 0;
  console.log(incidentId);
  getIncidentsService(incidentId, req, (error: Error, results: any) => {
    if (error) {
      return res.status(500).json(ErrorConstants.DatabaseConnection);
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};
const getUsers = (req: Request<any>, res: Response) => {
  console.log("Check  status");
  //@ts-ignore
  getUsersService({}, req, (error: Error, results: any) => {
    if (error) {
      return res.status(500).json(ErrorConstants.DatabaseConnection);
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

export {
  login,
  logIncident,
  getIncidents,
  updateIncident,
  getUsers,
  assignIncident,
};
