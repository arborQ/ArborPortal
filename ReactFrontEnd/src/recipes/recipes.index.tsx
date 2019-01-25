import * as React from "react";
import { Route } from "react-router-dom";

import ListComponent from "./recipes.list";

export function RecipesRoutes(): JSX.Element {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Route path="/recipes" component={ListComponent} /> <Route />
    </React.Suspense>
  );
}
