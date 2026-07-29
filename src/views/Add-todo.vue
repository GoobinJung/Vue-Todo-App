<script setup>
import TodoServices from '../services/TodoServices.js'
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const listName = ref("");
const pageMessage = ref("Enter list name and click Save");
const pageErrorMessage = ref("* required field.");

function submitForm() {
  const listData = { name: listName.value };

  TodoServices.addList(listData)
    .then((response) => {
      
      router.push({ name: "list" });
    })
    .catch((error) => {
      
      if (error.response && error.response.status === 400) {
        pageMessage.value = "Fix errors and click Save";
        pageErrorMessage.value = error.response.data.message;
      } else {
        pageMessage.value = "Error: " + (error.response ? error.response.status : "Server Error");
      }
      console.log('There was an error:', error.response);
    });
}

function cancel() {
  router.push({ name: "list" });
}
</script>

<template>
  <div id="body">
    <h2>ToDo List Add</h2>
    <div class="block-center">
      <p><span id="page-message">{{ pageMessage }}</span></p>
      <p><span id="page-error-message" class="error-head">{{ pageErrorMessage }}</span></p>
      
      <form @submit.prevent="submitForm">
        List Name: <input v-model="listName" type="text" id="listName" />
        <span id="listNameErr" class="error">* </span>
        <br /><br />
        <input type="submit" value="Save" />
      </form>
      <button @click="cancel">Cancel</button>
    </div>
  </div>
</template>