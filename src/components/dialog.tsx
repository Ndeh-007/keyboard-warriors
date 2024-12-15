import React, { useEffect, useRef } from "react";
import { AppColors, DialogProps } from "../core/interfaces/components";

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  onConfirm,
  children,
  showHeader = true,
  showFooter = true,
  title,
  buttons = {
    cancel: "Cancel",
    confirm: "Confirm",
  },
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  return (
    <dialog className="dialog" ref={dialogRef}>
      {showHeader ? (
        <div className="dialog-header dialog-title">{title}</div>
      ) : (
        ""
      )}
      <div className="dialog-body">{children}</div>
      {showFooter ? (
        <div className="dialog-footer">
          <div className="dialog-footer-buttons">
            <div
              className="footer-cancel dialog-footer-button"
              onClick={() => onClose()}
            >
              {buttons.cancel}
            </div>
            <div
              className="footer-confirm dialog-footer-button"
              onClick={() => onConfirm()}
            >
              {buttons.confirm}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </dialog>
  );
};

export const ConfirmDialog: React.FC<DialogProps> = ({
  title,
  open,
  message,
  onClose,
  onConfirm,
  buttons = { confirm: "Confirm", cancel: "Cancel" },
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  return (
    <dialog className="dialog confirm-dialog" ref={dialogRef}>
      <div className="confirm-dialog-body">
        <div className="dialog-title">{title}</div>
        <div className="dialog-message">{message}</div>
      </div>
      <div className="dialog-footer">
        <div className="dialog-footer-buttons">
          <div
            className="footer-cancel  dialog-footer-button"
            onClick={() => onClose()}
          >
            {buttons?.cancel}
          </div>
          <div
            className="footer-confirm dialog-footer-button"
            onClick={() => onConfirm()}
          >
            {buttons?.confirm}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export const AlertDialog: React.FC<DialogProps> = (props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [props.open]);

  const titles: { [key: string]: any } = {
    primary: "Alert",
    danger: "Error",
    warning: "Warning",
    success: "Success",
  };

  return (
    <dialog className="dialog alert-dialog" ref={dialogRef}>
      <div className={`dialog-header dialog-title dialog-header-${props.color} ${props.showFooter ? "" : "hidden"}`}>
        {titles[props?.color ? props.color : "primary"]}
      </div>
      <div className="confirm-dialog-body">
        <div className="dialog-title">{props.title}</div>
        <div className="dialog-message">{props.message}</div>
      </div>
      <div className="dialog-footer">
        <div className="dialog-footer-buttons">
          <div
            className={`footer-cancel dialog-footer-button`}
            onClick={() => props.onClose()}
          >
            {props.buttons ? props.buttons?.cancel : "Cancel"}
          </div>
          {/* <div
            className="footer-confirm dialog-footer-button"
            onClick={() => props.onConfirm()}
          >
            {props.buttons ? props.buttons.confirm : "Ok"}
          </div> */}
        </div>
      </div>
    </dialog>
  );
};

export const InlineAlert: React.FC<{
  color: AppColors;
  timeout?: number;
  icon?: string;
  text?: string;
  onClose: Function;
  open: boolean;
}> = ({
  color = "primary",
  timeout = 2500,
  icon = "info",
  text = "",
  onClose = () => {},
  open,
}) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [open, timeout, onClose]);

  return (
    <div className={`alert alert-${color}`}>
      <div className="alert-icon">
        <span className="material-icons">{icon}</span>
      </div>
      <div className="alert-text">{text}</div>
      <div className="alert-close" onClick={() => onClose()}>
        <span className="material-icons">close</span>
      </div>
    </div>
  );
};
