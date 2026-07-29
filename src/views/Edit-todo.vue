<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import TodoServices from "../services/TodoServices.js";

const route = useRoute();
const router = useRouter();

const list = ref({ name: "" });
const items = ref([]);
const newItem = ref({ name: "", description: "", state: "" });

onMounted(() => {
  loadData();
});

function loadData() {
  TodoServices.getList(route.params.id)
    .then((response) => {
      list.value = response.data.list || response.data || { name: "" };
    });

  TodoServices.getListItems(route.params.id)
    .then((response) => {
      const rawItems = response.data.items || response.data || [];
      items.value = rawItems.map(item => ({
        ...item,
        id: item.id || item.idItem || item.ID,
        state: item.state || item.status || ""
      }));
    });
}

function addItem() {
  if (!newItem.value.name) return;
  const data = {
    name: newItem.value.name,
    description: newItem.value.description,
    state: newItem.value.state
  };
  TodoServices.addListItem(route.params.id, data)
    .then(() => {
      newItem.value = { name: "", description: "", state: "" };
      loadData();
    });
}

function updateItem(item) {
  const data = {
    name: item.name,
    description: item.description,
    state: item.state
  };
  
  const itemId = item.id || item.idItem || item.ID;
  
  TodoServices.updateListItem(route.params.id, itemId, data)
    .then(() => {
      loadData();
    })
    .catch((error) => {
      console.log("Error:", error.response?.data);
      loadData();
    });
}

function deleteItem(itemId) {
  if (confirm("Delete?")) {
    TodoServices.deleteListItem(route.params.id, itemId)
      .then(() => loadData());
  }
}

function updateList() {
  TodoServices.updateList(route.params.id, { name: list.value.name })
    .then(() => alert("Updated"));
}

function deleteList() {
  if (confirm("Delete list?")) {
    TodoServices.deleteList(route.params.id)
      .then(() => router.push({ name: "list" }));
  }
}
</script>

<template>
  <div id="body">
    <h2>Todo List Update</h2>
    <div class="block-center">
      <div style="margin-bottom: 20px;">
        <label>List Name: </label>
        <input v-model="list.name" type="text" />
        <button @click="updateList">Update</button>
        <button @click="deleteList">Delete</button>
        <button @click="router.push({ name: 'list' })">Lists</button>
      </div>

      <table class="center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td><input v-model="item.name" type="text" /></td>
            <td><input v-model="item.description" type="text" /></td>
            <td><input v-model="item.state" type="text" /></td>
            <td>
              <button @click="updateItem(item)">Save</button>
              <button @click="deleteItem(item.id)">Delete</button>
            </td>
          </tr>
          <tr>
            <td><input v-model="newItem.name" placeholder="New Name" /></td>
            <td><input v-model="newItem.description" placeholder="description" /></td>
            <td><input v-model="newItem.state" placeholder="complete / in-progress"/></td>
            <td><button @click="addItem">Add</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
table { width: 100%; border-collapse: collapse; margin-top: 10px; }
th, td { border: 1px solid #ccc; padding: 10px; text-align: center; }
input[type="text"] { width: 90%; padding: 5px; }
button { margin: 0 2px; cursor: pointer; }
</style>