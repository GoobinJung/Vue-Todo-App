<script setup>
import TodoServices from '../services/TodoServices.js'
import { ref } from "vue";

const props = defineProps(["todo"]);
const emit = defineEmits(["deletedTodo"]);

function deleteList(id) {
  if (confirm("Are you sure you want to delete this list?")) {
    TodoServices.deleteList(id)
      .then(() => {
    
        emit("deletedTodo");
      })
      .catch((error) => {
        console.log('There was an error:', error.response);
      });
  }
}
</script>

<template>
  <tr>
    <td>{{ props.todo.id }}</td>
    <td>
      <router-link :to="{ 
        name: 'editTodo', 
        params: { id: props.todo.id },
        query: { listName: props.todo.name } 
      }">
        {{ props.todo.name }}
      </router-link>
    </td>
    <td>
      <router-link :to="{ name: 'editTodo', params: { id: props.todo.id } }">
        <button>Edit</button>
      </router-link>
    </td>
    <td>
      <button @click="deleteList(props.todo.id)">Delete</button>
    </td>
  </tr>
</template>

<style scoped>
td {
  border: 1px solid black;
  padding: 10px;
  text-align: left;
}
</style>