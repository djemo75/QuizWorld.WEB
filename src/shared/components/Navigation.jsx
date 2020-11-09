import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { STATIC_ROUTES } from "../../routes";

export const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const { user, logout } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectTo = (url) => {
    history.push(url);
    handleClose();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <div className="left-side">
            <div className="navigation">
              <Link to={STATIC_ROUTES.home} className="navigation-link">
                Home
              </Link>
              <Link to={STATIC_ROUTES.users} className="navigation-link">
                Users
              </Link>
            </div>
          </div>
          <div className="right-side">
            {user.username}
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClick}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={() => redirectTo(STATIC_ROUTES.profile)}>
                Profile
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <style jsx>{`
        .toolbar {
          display: flex;
          justify-content: space-between;
        }
        .navigation > * {
          margin-right: 30px;
        }
        .navigation-link {
          color: #ffffff;
          text-decoration: none;
          transition: 0.3s;
        }
        .navigation-link:hover {
          color: #ffffff;
        }
      `}</style>
    </>
  );
};
