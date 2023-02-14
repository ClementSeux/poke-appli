import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = ({ size }) => {
  return (
    <div className={"navigation card size-" + size}>
      <h3 id="title-menu">MENU</h3>
      <ul>
        <NavLink
          className={(nav) => "button " + (nav.isActive ? "nav-active" : "")}
          to="/ "
        >
          <li>Home</li>
        </NavLink>
        <NavLink
          className={(nav) => "button " + (nav.isActive ? "nav-active" : "")}
          to="/poke-info"
        >
          <li>Database</li>
        </NavLink>
        <NavLink
          className={(nav) => "button " + (nav.isActive ? "nav-active" : "")}
          to="/team-builder "
        >
          <li>Team Builder</li>
        </NavLink>
        <NavLink
          className={(nav) => "button " + (nav.isActive ? "nav-active" : "")}
          to="/ "
        >
          <li>Card</li>
        </NavLink>
      </ul>
    </div>
  );
};
export default Navigation;
