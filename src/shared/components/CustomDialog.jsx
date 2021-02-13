import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Zoom,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

export const CustomDialog = ({
  visible,
  title,
  children,
  maxWidth = "sm",
  fullWidth = true,
  fullScreen,
  TransitionComponent = Zoom,
  scroll = "paper",
  showCloseIcon,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(visible);
  }, [visible]);

  return (
    <>
      <Dialog
        open={isOpen}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        TransitionComponent={TransitionComponent}
        fullScreen={fullScreen}
        scroll={scroll}
      >
        <DialogTitle id="dialog-title">
          <div>{title}</div>
          {showCloseIcon && (
            <div>
              <IconButton className="close-icon" onClick={onClose} size="small">
                <Close />
              </IconButton>
            </div>
          )}
        </DialogTitle>
        <DialogContent id="dialog-content">{children}</DialogContent>
        <style jsx>{`
          :global(#dialog-title) {
            padding-bottom: 0px;
          }
          :global(#dialog-title h2) {
            font-size: 18px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
          }
          :global(#dialog-content .actions) {
            text-align: right;
            margin-top: 14px;
            margin-bottom: 14px;
          }
          :global(#dialog-content .actions > button:first-child) {
            margin-right: 16px;
          }
        `}</style>
      </Dialog>
    </>
  );
};
