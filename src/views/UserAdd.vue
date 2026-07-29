<script setup>
import TodoServices from '../services/TodoServices.js'
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const firstName = ref("")
const lastName = ref("")
const username = ref("")
const password = ref("")
const pageMessage = ref("Enter fields and click Save")
const pageErrorMessage = ref("* required field.")

function addUser() {
  if (!firstName.value || !lastName.value || !username.value || !password.value) {
    pageMessage.value = "Fix errors and click Save"
    pageErrorMessage.value = "All fields are required."
    return
  }

  const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    password: password.value
  }

  TodoServices.addUser(userData)
    .then(() => {
      router.push({ name: "login" })
    })
    .catch((error) => {
      pageMessage.value = "Error adding user"
      console.log(error)
    })
}

function cancel() {
  router.push({ name: "login" })
}
</script>

<template>
  <div id="body">
    <h2>User Add</h2>
    <div class="block-center">
      <p>{{ pageMessage }}</p>
      <p class="error-head">{{ pageErrorMessage }}</p>
      <div>
        First Name: <input type="text" v-model="firstName"> <span class="error-head">*</span>
      </div>
      <div>
        Last Name: <input type="text" v-model="lastName"> <span class="error-head">*</span>
      </div>
      <div>
        Username: <input type="text" v-model="username"> <span class="error-head">*</span>
      </div>
      <div>
        Password: <input type="password" v-model="password"> <span class="error-head">*</span>
      </div>
      <br>
      <button @click="addUser">Save</button>
      <button @click="cancel">Cancel</button>
    </div>
  </div>
</template>