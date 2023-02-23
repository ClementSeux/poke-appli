import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = ({ size }) => {
  return (
    <div className="navigation">
      <ul>
        {window.innerWidth > 1000 && <h3 id="title-menu">WIKIMON</h3>}
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
      </ul>
    </div>
  );
};
export default Navigation;
