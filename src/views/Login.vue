<script setup>
import TodoServices from '../services/TodoServices.js'
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const username = ref("")
const password = ref("")
const pageMessage = ref("Enter fields and click Login")

function login() {
  TodoServices.login(username.value, password.value)
    .then((response) => {
      const token = response.data.token
      localStorage.setItem("token", token)
      router.push({ name: "list" })
    })
    .catch((error) => {
      pageMessage.value = "Login failed. Please check your credentials."
      console.log(error)
    })
}
</script>

<template>
  <div id="body">
    <h2>Login</h2>
    <div class="block-center">
      <p>{{ pageMessage }}</p>
      <p class="error-head">* required field.</p>
      <div>
        Username: <input type="text" v-model="username"> <span class="error-head">*</span>
      </div>
      <div>
        Password: <input type="password" v-model="password"> <span class="error-head">*</span>
      </div>
      <br>
      <button @click="login">Login</button>
      <br><br>
      <router-link to="/useradd">Click to add new user</router-link>
    </div>
  </div>
</template>