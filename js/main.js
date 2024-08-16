"use strict";
console.log({ s: "ss" });
// DB Creation
var dbPromise = idb.open("todosApp", 3, function (upgradeDB) {
  switch (upgradeDB.oldVersion) {
    case 1:
      upgradeDB.createObjectStore("todos", { keyPath: "id" });
    // move to step two directly
    case 2:
      var store = upgradeDB.transaction.objectStore("todos");
      if (!store.indexNames.contains("id")) {
        store.createIndex("id", "id", { unique: true });
      }
      break;
    default:
      break;
  }
});
// dom elements

const result = document.getElementById("todos");
const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("task");
const dateInput = document.getElementById("date");
addBtn.addEventListener("click", addTodo);
// Note:
// used to fire Notification once when deleted
// as the normal behviour requires it to run twice
// as the whole todos list is painted every 4 seconds

let once = 0;
// Create
function addTodo(e) {
  e.preventDefault();
  const taskTitle = taskInput.value;
  const notifyDate = dateInput.value;
  console.log({ taskTitle, notifyDate });

  if (!taskTitle || !notifyDate) {
    console.log("enter valid inputs");
    return;
  }

  dbPromise.then((db) => {
    var tx = db.transaction("todos", "readwrite");
    var store = tx.objectStore("todos");

    let task = {
      id: Date.now(),
      taskTitle,
      notifyDate,
      done: false,
    };

    return store
      .add(task)
      .then(() => {
        once = 0;
        console.log("task added successfully");
        // clear inputs
        taskInput.value = "";
        dateInput.value = "";
        // add to dom

        addToDom(result, task);
      })
      .catch((err) => {
        tx.abort();
        console.log("error adding task", err);
      });
  });
}
// DELETE
function deleteTodo(id) {
  console.log({ id });
  dbPromise
    .then((db) => {
      var tx = db.transaction("todos", "readwrite");
      var store = tx.objectStore("todos");

      let query = store.delete(id);
      if (once === 0) displayNotification(`task with id ${id} is deleted`);
      // updated with each new task => to display next delete notification
      once++;

      query.then((e) => {
        console.log(e);
      });
      query.onsuccess = async (e) => {
        console.log("deleted", e);
      };
      query.oncomplete = (e) => console.log("deleted", e);
    })
    .catch((e) => {
      console.log("error deleteing from db: ", e);
      tx.abort();
    });
}

// Update
function markTodoDone(todo) {
  dbPromise
    .then((db) => {
      const tx = db.transaction("todos", "readwrite");
      const store = tx.objectStore("todos");

      const updateQuery = store.put({ ...todo, done: true });
      updateQuery.onsuccess = () => {
        console.log(`Task status with id: ${todo.id} is now: ${todo.done}`);
      };

      updateQuery.onerror = (e) => {
        console.error(
          `Error updating task with id: ${todo.id} => ${e.target.error}`
        );
      };
    })
    .catch((e) => {
      console.error("Error during database operation: ", e);
    });
}
// GET
function getTodos() {
  return dbPromise.then(function (db) {
    var tx = db.transaction("todos", "readonly");
    var store = tx.objectStore("todos");

    var todos = store.getAll();

    return todos;
  });
}

// Notification
if ("Notification" in window) {
  Notification.requestPermission((status) => {
    console.log("Notification Permission Status: ", status);
  });
}
let swRegs = null;
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // console.log('Service Worker and Push is supported');
    navigator.serviceWorker
      .register("./js/serviceWorker.js")
      .then((swReg) => {
        console.log("Service Worker is registered", swReg);
        swRegs = swReg;
        // TODO 3.3a - call the initializeUI() function
      })
      .catch((err) => {
        console.error("Service Worker Error", err);
      });
  });
} else {
  console.warn("Push messaging is not supported");
  pushButton.textContent = "Push Not Supported";
}

window.onload = () => {
  // clear database with this line
  // getTodos().then((todos) => todos.map((todo) => deleteTodo(todo.id)));

  getTodos().then((todos) =>
    todos.map((todo) => {
      addToDom(result, todo);
      if (todo.done) markDone(todo.id);
    })
  );
  setInterval(() => {
    getTodos().then((todos) =>
      todos.map((todo) => {
        // only todos that are not marked done and are in past time
        if (toStamp(todo.notifyDate) <= Date.now() && !todo.done) {
          // update dom with line throw
          markDone(todo.id);

          // update DB for that task
          markTodoDone(todo);

          // Fire Notification for old dates and done tasks
          displayNotification(todo.taskTitle + " time is up");
        }
      })
    );
  }, 4000);
};
