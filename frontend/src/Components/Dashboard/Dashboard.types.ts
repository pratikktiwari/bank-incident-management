import { createTheme, mergeStyles } from "@fluentui/react";
import {
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/components/Dropdown";
import { ITextFieldStyles } from "@fluentui/react/lib/components/TextField";

export enum Status {
  NotStarted = 0,
  Started = 1,
  Completed = 2,
  Error = 3,
}

export interface ILogIncidentInternalProps {}
export interface ILogIncidentInternalState {
  incidentType: IDropdownOption<string> | undefined;
  severityLevel: IDropdownOption<string> | undefined;
  accountNumber: string;
  incidentTitle: string;
  incidentDescription: string;
  customerName: string;
  submitStatus: Status;
  incidentId: string | number;
}
export interface IAccountSettingProps {}
export interface IAccountSettingState {
  userEmail: string;
  userName: string;
  newPassword: string;
  repeatPassword: string;
}

/**
 * Dashboard right state and props
 */
export interface IDashboardRightProps {
  currentComponent: ComponentTypes;
}
export interface IDashboardRightState {}

/**
 * Dashboard state and props
 */
export interface IDashboardProps {}
export interface IDashboardState {
  currentComponent: ComponentTypes;
}
/**
 * Dashbiard right
 */
export interface IDashboardLeftProps {
  setCurrentComponent: (componentName: ComponentTypes) => void;
  currentComponent: ComponentTypes;
}
export interface IDashboardLeftState {
  userObject: any;
}

export enum ComponentTypes {
  CreateIncident = "CreateIncident",
  ViewIncidents = "ViewIncidents",
  UpdateIncident = "UpdateIncident",
  AssignIncident = "AssignIncident",
  AddEmployee = "AddEmployee",
  MyIncidents = "MyIncidents",
}
export enum TextFieldStates {
  accountNumber = "accountNumber",
  customerName = "customerName",
  incidentTitle = "incidentTitle",
  incidentDescription = "incidentDescription",
  comment = "comment",
  incidentId = "incidentId",
  userEmail = "userEmail",
  userName = "userName",
  newPassword = "newPassword",
  repeatPassword = "repeatPassword",
  tokenNumber = "tokenNumber",
}

export const textFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { width: 300 },
};
export const wrapperClass = mergeStyles({
  padding: 2,
  selectors: {
    "& > .ms-Shimmer-container": {
      margin: "10px 0",
      background: "transparent",
    },
  },
});

export const customThemeForShimmer = createTheme({
  palette: {
    // palette slot used in Shimmer for main background
    neutralLight: "#bdd4ed",
    // palette slot used in Shimmer for tip of the moving wave
    neutralLighter: "#7AAFE7",
    // palette slot used in Shimmer for all the space around the shimmering elements
    white: "#0078D4",
  },
});
export const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};
