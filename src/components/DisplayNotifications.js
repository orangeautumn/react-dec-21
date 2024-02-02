import React, { useEffect, useState } from "react";

const DisplayNotifications = () => {
  const [notifications, setNotifications] = useState(["Notification"]);

  useEffect(() => {
    // opening a connection to the server to begin receiving events from it
    const eventSource = new EventSource("http://localhost:3400/notifications");

    // attaching a handler to receive message events
    eventSource.onmessage = (event) => {
      //   const serverData = JSON.parse(event.data);
      console.log("eventSource data-->");
      const temp = JSON.parse(event.data);
      notifications.push(temp?.resp);
      setNotifications([...notifications]);
    };

    // terminating the connection on component unmount
    return () => eventSource.close();
  }, [notifications]);

  return (
    <div>
      {notifications?.map((notification, index) => (
        <ul key={`notication ${index}`}>{notification}</ul>
      ))}
    </div>
  );
};

export default DisplayNotifications;
