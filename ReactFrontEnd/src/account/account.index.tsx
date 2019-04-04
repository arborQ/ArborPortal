import * as React from "react";
import { Route } from "react-router-dom";

import ListComponent from "./list";
import EditComponent from "./edit";
import AddComponent from "./create";
import LoginComponent from "./login";

export var ListUsersPath = "/users/c/1";
export var EditUserPath = "/users/edit";
export var CreateUserPath = "/users/add";

export function AccountRoutes(): JSX.Element {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Route path={"/users/:loginSearch/:page"} component={ListComponent} />
      <Route path={CreateUserPath} component={AddComponent} />
      <Route path={EditUserPath} component={EditComponent} />
      <Route path={"/login"} component={LoginComponent} />
    </React.Suspense>
  );
}
