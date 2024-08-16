function toStamp(date) {
  const dateObject = new Date(date);
  return dateObject.getTime();
}

// dom mainpulation
function addToDom(node, { id, taskTitle, notifyDate }) {
  const li = document.createElement("li");
  li.className = "w-5/6 flex justify-between mx-auto p-2 my-1 bg-gray-50/50";
  li.dataset.id = id;
  li.innerHTML = `
      <span class="">${taskTitle}   ${notifyDate}</span>
      <button class="text-lg text-red-500" onClick="deleteTodo(${id})">X</button>
    `;
  li.querySelector("button").addEventListener("click", () => {
    const todoId = li.dataset.id;
    deleteTodo(todoId); // Call deleteTodo with the id
    li.remove(); // Remove the li element from the DOM
  });
  node.appendChild(li);
}

function markDone(id) {
  const task = document
    .querySelector(`[data-id="${id}"]`)
    .querySelector("span");
  console.log({ task });
  task.classList.remove("line-through");
  task.classList.add("line-through");
  task.classList.add("text-red-500");
  console.log(task.classList);
}

// add install btn to home screen
// Not used
function InstallAppButton(btn) {
  let installPropmt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    console.log("ebfore", e);
    e.preventDefault();
    installPropmt = e;
    btn.removeAttribute("hidden");
    btn.addEventListener("click", async (e) => {
      if (!installPropmt) return;
      const { outcome } = await installPropmt.prompt();

      console.log(`Install propmt was: ${outcome}`);
      if (outcome === "accepted") {
        console.log(`user accepted to install the app`);
        // disable the button only when user install the app
        installPropmt = null;
        btn.setAttribute("hidden", "");
      } else if (outcome === "dismissed") {
        console.log(`user didn't accept to install the app`);
      }
    });
  });
}

// diaplay Notification
function displayNotification(msg) {
  if (swRegs && Notification.permission == "granted") {
    const options = {
      body: msg,
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
      actions: [{ action: "close", title: "Close" }],
    };

    swRegs.showNotification("Todo App", options);
  } else {
    console.error("service worker registration not found");
  }
}
