import React from "react";
import style from "./Dashboard.module.css";
import {
  customThemeForShimmer,
  dropdownStyles,
  Status,
  TextFieldStates,
  textFieldStyles,
  wrapperClass,
} from "./Dashboard.types";
import { TextField } from "@fluentui/react/lib/TextField";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Dropdown, IDropdownOption, Shimmer } from "@fluentui/react";
import axios from "axios";

class UpdateIncident extends React.Component<any, any> {
  state = {
    incidentId: "",
    status: Status.NotStarted,
    incidentData: [],
    incidentStatus: undefined,
    comment: "",
    assignedTo: "",
    userList: [],
    updateResponse: "",
  };
  handleIncidentIdFieldChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (typeof newValue !== "undefined" && !isNaN(Number(newValue))) {
      this.setState({ incidentId: newValue });
    }
  };
  handleCommentFieldChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    this.setState({ comment: newValue });
  };
  handleUpdateIncidentClick = () => {
    const { incidentStatus, comment, incidentData } = this.state;
    if (incidentStatus && incidentData.length) {
      // merge comment parse
      try {
        //@ts-ignore
        const commentList: any[] = JSON.parse(incidentData[0].comments);
        commentList.push(comment);
        axios
          .post("/api/updateIncident", {
            comment: JSON.stringify(commentList),
            //@ts-ignore
            status: incidentStatus.text,
            //@ts-ignore
            incidentId: incidentData[0].incidentId,
          })
          .then((response: any) => {
            this.setState({
              updateResponse: "Updated incident",
              comment: "",
            });
            console.log(response);
          })
          .catch((error: any) => {
            console.log(error);
            this.setState({
              updateResponse: "Error while updating incident",
            });
          });
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  handleButtonClick = () => {
    console.log("clicked");
    const { incidentId } = this.state;
    if (incidentId.length) {
      this.setState({
        status: Status.Started,
      });
      axios
        .get(`/api/getIncidents/${incidentId}`)
        .then((data) => {
          let incidentData: any = data?.data?.data;
          console.log(incidentData);
          if (!incidentData || !incidentData.length) {
            incidentData = [];
            this.setState({
              status: Status.Completed,
              incidentData: incidentData,
            });
            return;
          }
          let incidentStatus = { key: "sl4", text: "CLEARED" };
          switch (incidentData[0].status) {
            case "CREATED":
              incidentStatus = { key: "sl1", text: "CREATED" };
              break;
            case "IN PROGRESS":
              incidentStatus = { key: "sl2", text: "IN PROGRESS" };
              break;
            case "WORK STOPPED":
              incidentStatus = { key: "sl3", text: "WORK STOPPED" };
              break;
            case "CLEARED":
              incidentStatus = { key: "sl4", text: "CLEARED" };
              break;
            case "ABANDONED":
              incidentStatus = { key: "sl5", text: "ABANDONED" };
              break;
          }
          this.setState({
            status: Status.Completed,
            incidentData: incidentData,
            incidentStatus: incidentStatus,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            status: Status.Error,
          });
        });
    }
  };
  onStatusChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption<any> | undefined,
    index?: number | undefined
  ): void => {
    this.setState({
      incidentStatus: item,
    });
  };
  render(): React.ReactNode {
    const incidentStatusList = [
      { key: "sl1", text: "CREATED" },
      { key: "sl2", text: "IN PROGRESS" },
      { key: "sl3", text: "WORK STOPPED" },
      { key: "sl4", text: "CLEARED" },
      { key: "sl5", text: "ABANDONED" },
    ];
    const {
      incidentId,
      status,
      incidentData,
      updateResponse,
      incidentStatus,
      comment,
    } = this.state;
    return (
      <div>
        <h2 className={style.header}>Update incident</h2>
        <div className={style.incidentContainer}>
          <div className={style.singleField}>
            <TextField
              label="Incident Id"
              value={incidentId}
              onChange={this.handleIncidentIdFieldChange}
              styles={textFieldStyles}
              name={TextFieldStates.incidentId}
            />
          </div>
        </div>
        <div className={style.singleField}>
          <PrimaryButton
            text="Find Incidence"
            onClick={this.handleButtonClick}
            allowDisabledFocus
            disabled={false}
          />
        </div>
        <div className={style.recordDetails}>
          <p className={style.recordTittle}>
            Incident details will appear here
          </p>
          <div className={style.detailsWrapper}>
            {status === Status.Completed && incidentData.length === 0 && (
              <div>The incident is either closed or does not exist</div>
            )}
            {status === Status.Completed && incidentData.length > 0 && (
              <div>
                <div className={style.incidentDetails}>
                  <div>
                    <strong>Incident Id: </strong>
                    <span>
                      {
                        //@ts-ignore
                        incidentData[0].incidentId
                      }
                    </span>
                  </div>
                  <div>
                    <strong>Incident Type: </strong>
                    <span>
                      {
                        //@ts-ignore
                        incidentData[0].incidentType
                      }
                    </span>
                  </div>
                  <div>
                    <strong>Title: </strong>
                    <span>
                      {
                        //@ts-ignore
                        incidentData[0].incidentTitle
                      }
                    </span>
                  </div>
                  <div>
                    <strong>Description: </strong>
                    <span>
                      {
                        //@ts-ignore
                        incidentData[0].incidentDescription
                      }
                    </span>
                  </div>
                  <div>
                    <strong>Status: </strong>
                    <span>
                      {
                        //@ts-ignore
                        incidentData[0].status
                      }
                    </span>
                  </div>
                  <div>
                    <strong>Created Date: </strong>
                    <span>
                      {
                        //@ts-ignore
                        incidentData[0].createdDate
                      }
                    </span>
                  </div>
                  <div>
                    <strong>Severity: </strong>
                    <span>
                      {
                        //@ts-ignore
                        incidentData[0].severityLevel
                      }
                    </span>
                  </div>
                  <div>
                    <strong>Assigned To: </strong>
                    <span>
                      {
                        //@ts-ignore
                        incidentData[0].assignedTo ?? "NA"
                      }
                    </span>
                  </div>
                  <div>
                    <strong>Comments: </strong>
                    <ul style={{ listStyleType: "disc", paddingLeft: 20 }}>
                      {
                        //@ts-ignore
                        JSON.parse(incidentData[0].comments).map(
                          (item: any, index: number) => (
                            <li key={index}>{item}</li>
                          )
                        )
                      }
                    </ul>
                  </div>
                </div>

                <div>
                  <hr />
                  <br />
                  <h2>Update Details</h2>
                  <br />
                  <br />
                  <div>
                    <Dropdown
                      label="Incident Status"
                      selectedKey={
                        // @ts-ignore
                        incidentStatus ? incidentStatus?.key : undefined
                      }
                      onChange={this.onStatusChange}
                      placeholder="Select new status"
                      options={incidentStatusList}
                      styles={dropdownStyles}
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      label="Add Comment"
                      value={comment}
                      onChange={this.handleCommentFieldChange}
                      styles={textFieldStyles}
                      name={TextFieldStates.comment}
                      multiline
                      rows={3}
                    />
                  </div>
                  <br />
                  <div>
                    <i>{updateResponse.length > 0 && updateResponse}</i>
                  </div>
                  <br />
                  <div>
                    <PrimaryButton
                      text="Update Incidence"
                      onClick={this.handleUpdateIncidentClick}
                      allowDisabledFocus
                      disabled={false}
                    />
                  </div>
                </div>
              </div>
            )}
            {status === Status.Started && (
              <div className={style.shimmerWrapper}>
                <div className={wrapperClass}>
                  <Shimmer
                    shimmerColors={{
                      shimmer: customThemeForShimmer.palette.themeTertiary,
                      shimmerWave: customThemeForShimmer.palette.themeSecondary,
                    }}
                  />
                  <Shimmer
                    width="75%"
                    shimmerColors={{
                      shimmer: customThemeForShimmer.palette.themeTertiary,
                      shimmerWave: customThemeForShimmer.palette.themeSecondary,
                    }}
                  />
                  <Shimmer
                    width="50%"
                    shimmerColors={{
                      shimmer: customThemeForShimmer.palette.themeTertiary,
                      shimmerWave: customThemeForShimmer.palette.themeSecondary,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default UpdateIncident;
