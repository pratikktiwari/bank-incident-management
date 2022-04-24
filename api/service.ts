import { createPool } from "mysql";
import { Request } from "express";
import { CheckStatus, IncidentData, UserData } from "./Types";

const sqlConnection = createPool({
  port: parseInt(process.env.MYSQL_PORT),
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASS,
  database: process.env.MYSQL_DB_NAME,
});

const loginService = (
  data: UserData,
  req: Request<any>,
  callBack: Function
) => {
  //@ts-ignore
  sqlConnection.query(
    `SELECT userEmail, fullName, isAdmin FROM user WHERE userEmail='${data.userEmail}' AND password='${data.userPassword}'`,
    [],
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return callBack(error);
      }
      console.log(results);
      return callBack(null, results);
    }
  );
};

const getIncidentsService = (
  incidentId: any,
  req: Request<any>,
  callBack: Function
) => {
  let query = `SELECT incidentId, comments, status, clearedDate, incidentType, severityLevel, accountNumber, customerName, incidentTitle, incidentDescription, assignedTo, createdDate FROM incident`;
  if (incidentId) {
    query = `SELECT incidentId, comments, status, clearedDate, incidentType, severityLevel, accountNumber, customerName, incidentTitle, incidentDescription, assignedTo, createdDate FROM incident WHERE incidentId=${incidentId}`;
  }
  sqlConnection.query(query, [], (error, results, fields) => {
    if (error) {
      console.log("Error while fetching data");
      console.log(error);
      return callBack(error);
    }
    console.log("Fetched data successfully");
    console.log(results);
    return callBack(null, results);
  });
};

const getUsersService = (
  incidentId: any,
  req: Request<any>,
  callBack: Function
) => {
  let query = `SELECT userEmail, fullName, isAdmin FROM user`;
  sqlConnection.query(query, [], (error, results, fields) => {
    if (error) {
      console.log("Error while fetching data");
      console.log(error);
      return callBack(error);
    }
    console.log("Fetched data successfully");
    console.log(results);
    return callBack(null, results);
  });
};

const logIncidentService = (
  data: IncidentData,
  req: Request<any>,
  callBack: Function
) => {
  sqlConnection.query(
    `INSERT INTO incident (incidentType, severityLevel, accountNumber, customerName, incidentTitle, incidentDescription) VALUES ('${data.incidentType}', '${data.severityLevel}', '${data.accountNumber}', '${data.customerName}', '${data.incidentTitle}', '${data.incidentDescription}')`,
    (error, results, fields) => {
      if (error) {
        console.log("Error while saving incident data");
        console.log(error);
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

const updateIncidentService = (
  data: IncidentData,
  req: Request<any>,
  callBack: Function
) => {
  const incidentId = Number(data.incidentId);
  sqlConnection.query(
    `UPDATE incident SET comments='${data.comment}', status='${data.status}' WHERE incidentId=${incidentId}`,
    (error, results, fields) => {
      if (error) {
        console.log("Error while saving incident data");
        console.log(error);
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
const assignIncidentService = (
  data: IncidentData,
  req: Request<any>,
  callBack: Function
) => {
  const incidentId = Number(data.incidentId);
  sqlConnection.query(
    `UPDATE incident IT SET IT.assignedTo=(SELECT USR.userId FROM user USR WHERE USR.userEmail='${data.userEmail}') WHERE incidentId=${incidentId};`,
    (error, results, fields) => {
      if (error) {
        console.log("Error while saving incident data");
        console.log(error);
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export {
  loginService,
  logIncidentService,
  getIncidentsService,
  updateIncidentService,
  getUsersService,
  assignIncidentService,
};
