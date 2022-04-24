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

class AssignIncident extends React.Component<any, any> {
  state = {
    userList: [],
    incidentId: "",
    selectedUser: undefined,
    apiMessage: "",
    status: Status.NotStarted,
  };
  componentDidMount() {
    this.getUsers();
  }
  getUsers = () => {
    this.setState({
      status: Status.Started,
    });
    axios
      .get("/api/users")
      .then((res: any) => {
        console.log(res.data.data);
        const userData = res.data.data;
        const dropdownOptions = userData.map((user: any, index: number) => {
          const obj = {
            key: `drop-${index}`,
            text: user.userEmail,
          };
          return obj;
        });
        this.setState({
          userList: dropdownOptions,
          status: Status.Completed,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          status: Status.Error,
        });
      });
  };
  handleFieldChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (typeof newValue !== "undefined" && !isNaN(Number(newValue))) {
      //set state of incident ID
      this.setState({
        incidentId: newValue,
      });
    }
  };
  handleButtonClick = () => {
    const { selectedUser, incidentId } = this.state;
    if (selectedUser && incidentId && !isNaN(Number(incidentId))) {
      this.setState({
        status: Status.Started,
      });
      axios
        .post("/api/assignIncident", {
          incidentId: incidentId,
          //@ts-ignore
          userEmail: selectedUser.text,
        })
        .then((response: any) => {
          console.log(response);
          if (response.data.data.affectedRows > 0) {
            this.setState({
              status: Status.Completed,
              apiMessage: "Assigned the incident to selected user",
            });
          } else {
            this.setState({
              status: Status.Completed,
              apiMessage: "No such incident id",
            });
          }
        })
        .catch((error: any) => {
          console.log(error);
          this.setState({
            status: Status.Error,
            apiMessage: "Error while assigning the incident",
          });
        });
    }
  };
  onUserChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption<any> | undefined,
    index?: number | undefined
  ): void => {
    this.setState({
      selectedUser: item,
    });
  };
  render(): React.ReactNode {
    const { userList, incidentId, apiMessage, status } = this.state;
    return (
      <div>
        <h2 className={style.header}>Assign Incident</h2>
        <div className={style.incidentContainer}>
          <div className={style.singleField}>
            <Dropdown
              label="User email"
              selectedKey={
                // @ts-ignore
                userList ? userList?.key : undefined
              }
              onChange={this.onUserChange}
              placeholder="Select user email"
              options={userList}
              styles={dropdownStyles}
            />
          </div>
          <div className={style.singleField}>
            <TextField
              label="Incident Id"
              value={incidentId}
              onChange={this.handleFieldChange}
              styles={textFieldStyles}
              name={TextFieldStates.incidentId}
            />
          </div>
        </div>
        <div className={style.singleField}>
          <PrimaryButton
            text="Assign Incidence"
            onClick={this.handleButtonClick}
            allowDisabledFocus
            disabled={false}
          />
        </div>
        <div className={style.recordDetails}>
          <p className={style.recordTittle}>
            Please enter the details to update it in the database.
          </p>
          <br />
          <br />
          <br />
          <p className={style.recordTittle}>
            {apiMessage.length > 0 && apiMessage}
          </p>
          <div className={style.detailsWrapper}>
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
export default AssignIncident;
