import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import CardContent from "@material-ui/core/CardContent"
import Container from "@material-ui/core/Container"

const links = [
  { text: "Home", path: "/" },
  { text: "List", path: "/account/users?sortBy=login&sortDirection=asc" },
  { text: "Recepies", path: "/recipes/list" },
  { text: "Error", path: "/error" },
]

export function Header() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {links.map(l => (
            <Link
              className={"MuiButtonBase-root MuiButton-root MuiButton-text"}
              to={l.path}
            >
              {l.text}
            </Link>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  )
}
