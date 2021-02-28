import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import logo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";
import { STATIC_ROUTES } from "../../routes";
import { JoinTestDialog } from "../main/JoinTestDialog";

export const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const { user, isAdmin, logout } = useContext(AuthContext);

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
      {isAdmin && (
        <div className="top-bar">
          <div className="MuiToolbar-gutters">
            As an administrator, you have full access to the system
          </div>
        </div>
      )}
      <AppBar
        position="static"
        className="appbar"
        style={{ borderTop: `${!isAdmin ? "5px" : "0px"} solid #2196f3` }}
      >
        <Toolbar className="toolbar">
          <div className="left-side">
            <Link to={STATIC_ROUTES.myResults} className="navigation-link">
              <img className="logo" src={logo} alt="QuizWorld" />
            </Link>
            <div className="navigation">
              <Link to={STATIC_ROUTES.myResults} className="navigation-link">
                My results
              </Link>
              <Link to={STATIC_ROUTES.tests} className="navigation-link">
                Tests
              </Link>
              <Link to={STATIC_ROUTES.users} className="navigation-link">
                Users
              </Link>
            </div>
          </div>
          <div className="right-side">
            <IconButton
              aria-label="search"
              color="primary"
              onClick={() => setVisible(true)}
              style={{ marginRight: "15px" }}
            >
              <SearchIcon />
            </IconButton>
            {user.username}
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
              style={{ color: "#2196f3" }}
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

      {visible && (
        <JoinTestDialog
          visible={visible}
          handleClose={() => setVisible(false)}
        />
      )}
      <style jsx global>{`
        .appbar {
          background: #f9f9f9;
          color: #838383;
        }
        .toolbar {
          display: flex;
          justify-content: space-between;
        }
        .left-side {
          display: flex;
          align-items: center;
        }
        .left-side .logo {
          max-height: 30px;
          margin-right: 20px;
          border-bottom: 1px solid gainsboro;
        }
        .navigation > * {
          margin-right: 30px;
        }
        .navigation-link {
          color: #303030;
          text-decoration: none;
          transition: 0.3s;
        }
        .navigation-link:hover {
          color: #000;
        }
        .top-bar {
          display: flex;
          align-items: center;
          width: 100%;
          min-height: 40px;
          background: #2196f3;
          color: #fff;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};
