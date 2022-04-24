import axios from "axios";
import React from "react";
import style from "./Dashboard.module.css";
export default class ViewIncident extends React.Component<any, any> {
  state = {
    data: [],
    activeIndex: 0,
  };
  componentDidMount() {
    axios
      .get("/api/getIncidents")
      .then((res: any) => {
        console.log(res?.data?.data);
        this.setState({
          data: res.data.data,
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  render(): React.ReactNode {
    const { data, activeIndex } = this.state;
    const mappedData = data.map((incident: any, index: number) => {
      return (
        <tr
          key={index}
          onClick={() => {
            this.setState({
              activeIndex: index,
            });
          }}
          style={{
            backgroundColor: activeIndex === index ? "#ddd" : "transparent",
          }}
        >
          <td title={incident.incidentId}>{incident.incidentId}</td>
          <td title={incident.incidentType}>{incident.incidentType}</td>
          <td title={incident.incidentTitle}>{incident.incidentTitle}</td>
          <td title={incident.status}>{incident.status}</td>
          <td title={new Date(incident.createdDate).toLocaleString()}>
            {new Date(incident.createdDate).toLocaleString()}
          </td>
          <td title={incident.severityLevel}>{incident.severityLevel}</td>
          <td title={incident.assignedTo}>{incident.assignedTo ?? "NA"}</td>
        </tr>
      );
    });
    return (
      <div>
        <h2 className={style.header}>Incident List</h2>
        <div className={style.incidentListParent}>
          {data.length > 0 && (
            <div className={style.incidentDetails}>
              <div>
                <strong>Incident Id: </strong>
                <span>
                  {
                    //@ts-ignore
                    data[activeIndex].incidentId
                  }
                </span>
              </div>
              <div>
                <strong>Incident Description: </strong>
                <span>
                  {
                    //@ts-ignore
                    data[activeIndex].incidentDescription
                  }
                </span>
              </div>
              <div>
                <strong>Customer name: </strong>
                <span>
                  {
                    //@ts-ignore
                    data[activeIndex].customerName
                  }
                </span>
              </div>
              <div>
                <strong>Comments: </strong>
                <ul style={{ listStyleType: "disc", paddingLeft: 20 }}>
                  {
                    //@ts-ignore
                    JSON.parse(data[activeIndex].comments).map(
                      (item: any, index: number) => (
                        <li key={index}>{item}</li>
                      )
                    )
                  }
                </ul>
              </div>
            </div>
          )}
          <table>
            <tr>
              <th>Incident Id</th>
              <th>Type</th>
              <th>Title</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Severity</th>
              <th>Assigned to</th>
            </tr>
            {mappedData}
          </table>
        </div>
      </div>
    );
  }
}
