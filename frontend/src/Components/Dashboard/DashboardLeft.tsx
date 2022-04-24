import React from "react";
import {
  IPersonaSharedProps,
  Persona,
  PersonaSize,
  PersonaPresence,
} from "@fluentui/react/lib/Persona";
import person from "../../images/person.png";

import style from "./Dashboard.module.css";
import { ComponentTypes, IDashboardLeftState } from "./Dashboard.types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
class DashboardLeft extends React.Component<any, IDashboardLeftState> {
  state = {
    userObject: null,
  };
  componentDidMount() {
    const userObject = this.getUserObject();
    this.setState({
      userObject: userObject,
    });
  }
  getUserObject = () => {
    try {
      const userObject = localStorage.getItem("userObject");
      if (userObject) {
        return JSON.parse(userObject);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  handleLogout = () => {
    localStorage.removeItem("userObject");
    this.props.history.push("/login");
  };
  render(): React.ReactNode {
    const { userObject } = this.state;
    const personaDetails: IPersonaSharedProps = {
      imageUrl: person,
      imageInitials: "PT",
      //@ts-ignore
      text: userObject ? userObject.fullName : "Admin",
      secondaryText: "Online",
      tertiaryText: "Available",
      optionalText: "Available",
      showSecondaryText: true,
    };

    const { setCurrentComponent, currentComponent } = this.props;
    return (
      <div className={style.left}>
        <div className={style.personaContainer}>
          <Persona
            {...personaDetails}
            size={PersonaSize.size32}
            presence={PersonaPresence.online}
            imageAlt="Admin"
            style={{ color: "#fff" }}
          />
        </div>
        <div>
          <div className={style.mainNavigationIndicator}>Main Navigation</div>
          <div
            className={classNames(
              style.leftNavItem,
              currentComponent === ComponentTypes.CreateIncident
                ? style.activeNavItem
                : ""
            )}
            onClick={() => {
              setCurrentComponent(ComponentTypes.CreateIncident);
            }}
          >
            Create an incidence
          </div>
          <div
            className={classNames(
              style.leftNavItem,
              currentComponent === ComponentTypes.ViewIncidents
                ? style.activeNavItem
                : ""
            )}
            onClick={() => {
              setCurrentComponent(ComponentTypes.ViewIncidents);
            }}
          >
            View logged incidents
          </div>
          <div
            className={classNames(
              style.leftNavItem,
              currentComponent === ComponentTypes.UpdateIncident
                ? style.activeNavItem
                : ""
            )}
            onClick={() => {
              setCurrentComponent(ComponentTypes.UpdateIncident);
            }}
          >
            Update incident
          </div>
          <div
            className={classNames(
              style.leftNavItem,
              currentComponent === ComponentTypes.AssignIncident
                ? style.activeNavItem
                : ""
            )}
            onClick={() => {
              setCurrentComponent(ComponentTypes.AssignIncident);
            }}
          >
            Assign incident
          </div>
          <div
            className={classNames(
              style.leftNavItem,
              currentComponent === ComponentTypes.MyIncidents
                ? style.activeNavItem
                : ""
            )}
            onClick={() => {
              setCurrentComponent(ComponentTypes.MyIncidents);
            }}
          >
            My Assigned incidents
          </div>
        </div>
        <div
          className={style.leftNavFooter}
          onClick={this.handleLogout}
          style={{ cursor: "pointer" }}
        >
          Logout
        </div>
      </div>
    );
  }
}
export default withRouter(DashboardLeft);
