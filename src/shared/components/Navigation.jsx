import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import logo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";
import { STATIC_ROUTES } from "../../routes";
import { JoinTestDialog } from "../main/JoinTestDialog";

const NAVIGATION_ITEMS = [
  {
    label: "My results",
    path: STATIC_ROUTES.myResults,
  },
  {
    label: "Tests",
    path: STATIC_ROUTES.tests,
  },
  {
    label: "Users",
    path: STATIC_ROUTES.users,
  },
];

export const Navigation = () => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("xs"));
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const { user, isAdmin, logout } = useContext(AuthContext);

  const redirectTo = (path) => {
    history.push(path);
    setProfileAnchorEl(null);
    setMenuAnchorEl(null);
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
            <div>
              <Link to={STATIC_ROUTES.myResults} className="navigation-link">
                <img className="logo" src={logo} alt="QuizWorld" />
              </Link>
            </div>
            {isMobileView ? (
              <div>
                <IconButton
                  onClick={(e) => setMenuAnchorEl(e.currentTarget)}
                  style={{ color: "#2196f3" }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={menuAnchorEl}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  getContentAnchorEl={null}
                  keepMounted
                  open={Boolean(menuAnchorEl)}
                  onClose={() => setMenuAnchorEl(null)}
                >
                  {NAVIGATION_ITEMS.map((item, index) => (
                    <MenuItem key={index} onClick={() => redirectTo(item.path)}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ) : (
              <div className="navigation">
                {NAVIGATION_ITEMS.map((item, index) => (
                  <Link key={index} to={item.path} className="navigation-link">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="right-side">
            <IconButton
              color="primary"
              onClick={() => setVisible(true)}
              style={{ marginRight: "15px" }}
            >
              <SearchIcon />
            </IconButton>
            <div className="username">{user.username}</div>
            <IconButton
              onClick={(e) => setProfileAnchorEl(e.currentTarget)}
              style={{ color: "#2196f3" }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={profileAnchorEl}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              getContentAnchorEl={null}
              keepMounted
              open={Boolean(profileAnchorEl)}
              onClose={() => setProfileAnchorEl(null)}
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
        .left-side,
        .right-side {
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
          background: #2196f3;
          color: #fff;
          font-size: 14px;
          padding-top: 10px;
          padding-bottom: 10px;
        }
        @media screen and (max-width: 600px) {
          .toolbar {
            padding-top: 5px;
            flex-direction: column;
          }
          .left-side,
          .right-side {
            justify-content: space-between;
            width: 100%;
          }
          .right-side .username {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
