import React from "react";
import AssignIncident from "./AssignIncident";
import style from "./Dashboard.module.css";
import {
  ComponentTypes,
  IDashboardRightProps,
  IDashboardRightState,
} from "./Dashboard.types";
import LogIncidentInternal from "./LogIncidentInternal";
import ViewIncident from "./ViewIncident";
import UpdateIncident from "./UpdateIncident";
import AssignedIncidents from "./AssignedIncidents";
class DashboardRight extends React.Component<
  IDashboardRightProps,
  IDashboardRightState
> {
  state = {};
  getSelectedComponent = (): JSX.Element => {
    const component = this.props.currentComponent;
    switch (component) {
      case ComponentTypes.CreateIncident:
        return <LogIncidentInternal />;
      case ComponentTypes.ViewIncidents:
        return <ViewIncident />;
      case ComponentTypes.UpdateIncident:
        return <UpdateIncident />;
      case ComponentTypes.AssignIncident:
        return <AssignIncident />;
      case ComponentTypes.MyIncidents:
        return <AssignedIncidents />;
      default:
        return <></>;
    }
  };
  render(): React.ReactNode {
    return <div className={style.right}>{this.getSelectedComponent()}</div>;
  }
}
export default DashboardRight;
