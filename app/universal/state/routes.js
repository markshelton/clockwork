import React from "react";

import App from "../views/App";

import Splash from "../views/auth/Splash";
import Signup from "../views/auth/containers/Signup";
import Goodbye from "../views/auth/containers/Goodbye";
import Login from "../views/auth/containers/Login";
import PasswordReset from "../views/auth/containers/PasswordReset";
import PasswordUpdate from "../views/auth/containers/PasswordUpdate";

import Home from "../views/calendar/Home";
import Welcome from "../views/calendar/containers/Welcome";
import Calendar from "../views/calendar/containers/Calendar";
import Settings from "../views/calendar/containers/Settings";
import ViewTask from "../views/calendar/containers/ViewTask";
import EditTask from "../views/calendar/containers/EditTask";
import NewTask from "../views/calendar/containers/NewTask";

import checkAuth from "../views/auth/hocs/checkAuth";
import requireAuth from "../views/auth/hocs/requireAuth";

//prettier-ignore
export default [
  {
    ...checkAuth(App, "/app"),
    routes: [
      { 
        path: "/", exact: true, ...Splash, 
        routes: [
          { path: "/", exact: true, ...Signup },
          { path: "/goodbye", exact: true, ...Goodbye },
          { path: "/login", exact: true, ...Login },
          { path: "/reset", exact: true, ...PasswordReset },
          { path: "/update/:token", exact: true, ...PasswordUpdate }, 
          { ...Signup }
        ] 
      },
      {
        path: "/app", ...requireAuth(Home, "/login"),
        routes: [
          { path: "/app/welcome", exact: true, ...Welcome },          
          { path: "/app/calendar", exact: true, ...Calendar },
          { path: "/app/settings", exact: true, ...Settings },
          { path: "/app/tasks/:id/view", exact: true, ...ViewTask },
          { path: "/app/tasks/:id/edit", exact: true, ...EditTask },
          { path: "/app/tasks/new", exact: true, ...NewTask },
          { ...Calendar }
        ]
      }
    ]
  }
];
