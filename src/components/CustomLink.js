import React from "react";
import { Route, Link } from "react-router-dom";

export default function CustomLink({ to, children, isExact = false}) {
    return (
      <Route
        path={to.pathname}
        exact={isExact}
        children={({ match }) => (
          <li
            style={{ listStyle: "none", fontWeight: match ? "bold" : "normal" }}
          >
            <Link to={to}>{children}</Link>
          </li>
        )}
      />
    );
  }