self.addEventListener("notificationclick", (event) => {
  console.log("Notification click received", event);
  const notify = event.notification;
  const action = event.action;

  if (action === "close") {
    notify.close();
  } else {
    event.waitUntil(
      clients.matchAll({ type: "window" }).then((clientList) => {
        // If there is a client open, focus it; otherwise, open a new one
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === "/" && "focus" in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow("/");
      })
    );
  }
});
