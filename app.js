let userId = null;

// Signup
function signup() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then((res) => {
      alert("Signed up!");
    }).catch(alert);
}

// Login
function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((res) => {
      userId = res.user.uid;
      document.getElementById("todo-section").style.display = "block";
      loadTodos();
    }).catch(alert);
}

// Logout
function logout() {
  firebase.auth().signOut().then(() => {
    document.getElementById("todo-section").style.display = "none";
    document.getElementById("todo-list").innerHTML = "";
  });
}

// Add Todo
function addTodo() {
  const title = document.getElementById("todo-title").value;
  db.collection("todos").add({
    title,
    userId,
    completed: false,
    created: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    document.getElementById("todo-title").value = "";
    loadTodos();
  });
}

// Load Todos
function loadTodos() {
  db.collection("todos").where("userId", "==", userId)
    .orderBy("created", "desc")
    .get().then(snapshot => {
      const list = document.getElementById("todo-list");
      list.innerHTML = "";
      snapshot.forEach(doc => {
        const todo = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `
          <input type="checkbox" ${todo.completed ? "checked" : ""} onchange="toggleTodo('${doc.id}', ${!todo.completed})">
          ${todo.title}
          <button onclick="deleteTodo('${doc.id}')">❌</button>
        `;
        list.appendChild(li);
      });
    });
}

// Toggle Todo
function toggleTodo(id, completed) {
  db.collection("todos").doc(id).update({ completed });
  loadTodos();
}

// Delete Todo
function deleteTodo(id) {
  db.collection("todos").doc(id).delete();
  loadTodos();
}

