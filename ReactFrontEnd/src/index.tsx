import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactApplication from "./application";
import { BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(<Router><ReactApplication /></Router>, document.getElementById("container"));