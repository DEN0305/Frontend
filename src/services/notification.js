import React from "react";

const viewNotification = (type, message, notificationAlertRef) => {
    let options = {
      place: "br",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
            Information
          </span>
          <span data-notify="message">
            { message }
          </span>
        </div>
      ),
      type: type,
      icon: "ni ni-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
};

const Notification = {
  viewNotification,
};

export default Notification;