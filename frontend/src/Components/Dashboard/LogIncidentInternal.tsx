import React from "react";
import style from "./Dashboard.module.css";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";
import {
  customThemeForShimmer,
  dropdownStyles,
  ILogIncidentInternalProps,
  ILogIncidentInternalState,
  Status,
  TextFieldStates,
  textFieldStyles,
  wrapperClass,
} from "./Dashboard.types";
import { TextField } from "@fluentui/react/lib/TextField";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Shimmer } from "@fluentui/react";
import axios from "axios";

class LogIncidentInternal extends React.Component<
  ILogIncidentInternalProps,
  ILogIncidentInternalState
> {
  state = {
    incidentType: undefined,
    severityLevel: undefined,
    accountNumber: "57927665430",
    incidentTitle: "ATM Card fraud",
    incidentDescription: "Money deducted after sharing OTP with hacker",
    customerName: "Ram Shyam",
    submitStatus: Status.NotStarted,
    incidentId: 0,
  };
  onIncidentTypeChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption<any> | undefined,
    index?: number | undefined
  ): void => {
    this.setState({
      incidentType: item,
    });
  };
  onSeverityLevelChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption<any> | undefined,
    index?: number | undefined
  ): void => {
    this.setState({
      severityLevel: item,
    });
  };
  handleFieldChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (typeof newValue !== "undefined") {
      switch (event.currentTarget.name) {
        case TextFieldStates.customerName:
          this.setState({ customerName: newValue });
          break;
        case TextFieldStates.incidentTitle:
          this.setState({ incidentTitle: newValue });
          break;
        case TextFieldStates.incidentDescription:
          this.setState({ incidentDescription: newValue });
          break;
        case TextFieldStates.accountNumber:
          this.setState({ accountNumber: newValue });
          break;
        default:
          break;
      }
    }
  };
  handleButtonClick = () => {
    const {
      incidentType,
      severityLevel,
      accountNumber,
      incidentTitle,
      incidentDescription,
      customerName,
    } = this.state;
    if (
      incidentType &&
      severityLevel &&
      accountNumber.length &&
      incidentTitle.length &&
      incidentDescription.length &&
      customerName
    ) {
      //@ts-ignore
      const incidentTypeS = incidentType.text;
      //@ts-ignore
      const severityLevelS = severityLevel.text;
      //@ts-ignore
      this.setState({
        submitStatus: Status.Started,
      });
      axios
        .post("/api/logIncident", {
          incidentType: incidentTypeS,
          severityLevel: severityLevelS,
          accountNumber: accountNumber,
          customerName: customerName,
          incidentTitle: incidentTitle,
          incidentDescription: incidentDescription,
        })
        .then((data: any) => {
          console.log(data);
          this.setState({
            submitStatus: Status.Completed,
            incidentId: data?.data?.data?.insertId,

            incidentType: undefined,
            severityLevel: undefined,

            accountNumber: "",
            incidentTitle: "",
            incidentDescription: "",
            customerName: "",
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            submitStatus: Status.Error,
          });
        });
    }

    console.log("clicked");
  };
  render(): React.ReactNode {
    const inidentTypeList = [
      {
        key: "header1",
        text: "Debit Card",
        itemType: DropdownMenuItemType.Header,
      },
      { key: "dc1", text: "ATM issue" },
      { key: "dc2", text: "Debit Card Fraud" },
      { key: "dc3", text: "Turn off debit card usage" },
      { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
      {
        key: "header2",
        text: "Internet Banking",
        itemType: DropdownMenuItemType.Header,
      },
      { key: "ib1", text: "Money dedeuction" },
      { key: "ib2", text: "Net Banking Fraud" },
      { key: "ib3", text: "Other issues" },
      { key: "divider_2", text: "-", itemType: DropdownMenuItemType.Divider },
      {
        key: "header3",
        text: "Internal Bank issue",
        itemType: DropdownMenuItemType.Header,
      },
      { key: "ibi1", text: "Server Outage" },
      { key: "ibi2", text: "Firewall Issue" },
      { key: "ibi3", text: "Security Threat" },
    ];

    const severityLevelList = [
      { key: "sl1", text: "Critical" },
      { key: "sl2", text: "High" },
      { key: "sl3", text: "Medium" },
      { key: "sl4", text: "Low" },
      { key: "sl5", text: "Informative" },
      { key: "sl6", text: "No Priority" },
    ];
    const {
      incidentType,
      severityLevel,
      incidentDescription,
      incidentTitle,
      accountNumber,
      customerName,
      submitStatus,
      incidentId,
    } = this.state;
    return (
      <div>
        <h2 className={style.header}>Log a new incident</h2>
        <div className={style.incidentContainer}>
          <div className={style.singleField}>
            <Dropdown
              label="Incident Type"
              // @ts-ignore
              selectedKey={incidentType ? incidentType?.key : undefined}
              onChange={this.onIncidentTypeChange}
              placeholder="Select an incident type"
              options={inidentTypeList}
              styles={dropdownStyles}
            />
          </div>
          <div className={style.singleField}>
            <Dropdown
              label="Severity Level"
              selectedKey={
                // @ts-ignore
                severityLevel ? severityLevel?.key : undefined
              }
              onChange={this.onSeverityLevelChange}
              placeholder="Select a severity level"
              options={severityLevelList}
              styles={dropdownStyles}
            />
          </div>
          <div className={style.singleField}>
            <TextField
              label="Account Number"
              value={accountNumber}
              onChange={this.handleFieldChange}
              styles={textFieldStyles}
              name={TextFieldStates.accountNumber}
            />
          </div>
          <div className={style.singleField}>
            <TextField
              label="Customer Name"
              value={customerName}
              onChange={this.handleFieldChange}
              styles={textFieldStyles}
              name={TextFieldStates.customerName}
            />
          </div>
          <div className={style.singleField}>
            <TextField
              label="Incident Title"
              value={incidentTitle}
              onChange={this.handleFieldChange}
              styles={textFieldStyles}
              name={TextFieldStates.incidentTitle}
            />
          </div>
          <div className={style.singleField}>
            <TextField
              label="Incident Description"
              value={incidentDescription}
              onChange={this.handleFieldChange}
              styles={textFieldStyles}
              name={TextFieldStates.incidentDescription}
              multiline
              rows={3}
            />
          </div>
        </div>
        <div className={style.singleField}>
          <PrimaryButton
            text="Log Incident"
            onClick={this.handleButtonClick}
            allowDisabledFocus
            disabled={false}
          />
        </div>
        <div className={style.recordDetails}>
          <p className={style.recordTittle}>
            Incident details will appear here once a record is successfully
            submitted.
          </p>
          <div className={style.detailsWrapper}>
            {submitStatus === Status.Started && (
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
            {submitStatus === Status.Completed && (
              <div>
                <strong>
                  {incidentId ? (
                    <span>The incident Id is: {incidentId}</span>
                  ) : (
                    <span>Error while logging the incident!</span>
                  )}
                </strong>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default LogIncidentInternal;
