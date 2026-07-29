<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import TodoServices from './services/TodoServices.js'

const router = useRouter();
const route = useRoute();
const title = "Todo App";

const isLoggedIn = ref(!!localStorage.getItem("token"));

watch(() => route.path, () => {
  isLoggedIn.value = !!localStorage.getItem("token");
});

function logout() {
  TodoServices.logout()
    .then(() => {
      localStorage.removeItem("token");
      isLoggedIn.value = false;
      router.push({ name: "login" });
    })
    .catch((error) => {
      console.log("Logout failed:", error);
    });
}
</script>

<template>
  <div id="app">
    <nav class="navbar shadow">
      <div class="title-section">
        <span class="nav-title">{{ title }}</span>
      </div>

      <ul class="nav-links" v-if="isLoggedIn">
        <li>
          <router-link :to="{ name: 'list' }">LIST</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'addTodo' }">ADD LIST</router-link>
        </li>
        <li>
          <a href="#" @click.prevent="logout">LOGOUT</a>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style>
</style>