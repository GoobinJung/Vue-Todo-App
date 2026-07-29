<script setup>
import TodoServices from '../services/TodoServices.js'
import TodoDisplay from "../components/TodoDisplay.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const todos = ref([]);
const userInfoText = ref("");

onMounted(() => {
  getCurrentUser();
  createTable();
});

function getCurrentUser() {
  TodoServices.getUser()
    .then((response) => {
      const userData = response.data.user || response.data || {};
      const fName = userData.firstName || userData.firstname || "";
      const lName = userData.lastName || userData.lastname || "";
      const dispName = fName ? (fName + " " + lName) : (userData.username || "User");
      userInfoText.value = "Hi, " + dispName;
    })
    .catch((error) => {
      console.log("Error getting user info", error);
    });
}

function createTable() {
  TodoServices.getLists()
    .then((response) => {
      const rawData = response.data.lists || response.data || [];
      todos.value = rawData.map(todo => ({
        ...todo,
        id: todo.id || todo.ID || todo.idList 
      }));
    })
    .catch((error) => {
      console.log('There was an error:', error.response);
    });
}

function addTodoList() {
  router.push({ name: "addTodo" });
}
</script>

<template>
  <div id="body">
    <h2>Todo List</h2>
    <div class="block-center">
      <p id="userInfo">{{ userInfoText }}</p>
      <br />
      <button @click="addTodoList">Add</button>
      <div id="todo-table">
        <table class="center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <TodoDisplay
              v-for="todo in todos"
              :key="todo.id"
              :todo="todo"
              @deletedTodo="createTable"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>