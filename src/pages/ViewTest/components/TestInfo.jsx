import { Chip, Menu, MenuItem } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Timelapse } from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import React, { useContext, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import { TestContext } from "../../../context/TestContext";
import { TestFormDialog } from "../../Tests/dialogs/TestFormDialog";
import { DeleteTestDialog } from "../dialogs/DeleteTestDialog";

const DEFAULT_VISIBLE_STATE = { delete: false, edit: false };

export const TestInfo = ({ test }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [visible, setVisible] = useState(DEFAULT_VISIBLE_STATE);
  const { user, isAdmin } = useContext(AuthContext);
  const { editTest, editTestLoading } = useContext(TestContext);

  const handleEdit = (values) => {
    editTest(test.id, values, () => setVisible(false));
  };

  return (
    <>
      <Card className="info-card">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className="avatar">
              {test.name[0]}
            </Avatar>
          }
          action={
            <>
              <Chip
                label={test.duration ? <>{test.duration} min</> : "unlimited"}
                variant="outlined"
                className="test-status"
                avatar={<Timelapse />}
              />
              {isAdmin || user.id === test.user.id ? (
                <>
                  <IconButton
                    aria-label="settings"
                    onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem
                      onClick={() => {
                        setVisible({ delete: false, edit: true });
                        setAnchorEl(null);
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setVisible({ delete: true, edit: false });
                        setAnchorEl(null);
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <i style={{ width: "48px", height: "48px" }}></i>
              )}
            </>
          }
          title={
            <>
              <b>Author</b>: {test.user.username}
            </>
          }
          subheader={moment(test.createdAt).format(
            "MMM. D, YYYY [at] h:mm A z",
          )}
        />
        <CardContent className="info-card-content">
          <Typography
            variant="body2"
            className="test-description"
            color="textSecondary"
            component="div"
          >
            {test.description}
          </Typography>
        </CardContent>
      </Card>

      <TestFormDialog
        visible={visible.edit}
        values={test}
        handleClose={() => setVisible(DEFAULT_VISIBLE_STATE)}
        handleSubmit={handleEdit}
        loading={editTestLoading}
        editMode
      />

      <DeleteTestDialog
        test={test}
        visible={visible.delete}
        handleClose={() => setVisible(DEFAULT_VISIBLE_STATE)}
      />

      <style jsx>{`
        :global(.info-card) {
          height: 100%;
        }
        :global(.info-card .avatar) {
          background-color: #3f51b5;
        }
        :global(.info-card-content) {
          padding-top: 0px;
          min-height: 80px;
        }
        :global(.info-card .test-status) {
          margin-left: 30px;
        }
        :global(.info-card .MuiCardHeader-action) {
          min-height: 48px;
          align-items: center;
          display: flex;
        }
        :global(.info-card .test-description) {
          white-space: pre-wrap;
        }
      `}</style>
    </>
  );
};
