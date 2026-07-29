import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";
import TodoList from "./views/todo-List.vue";
import AddList from "./views/Add-todo.vue";
import EditList from "./views/Edit-todo.vue";
import UserAdd from "./views/UserAdd.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/useradd",
      name: "userAdd",
      component: UserAdd,
    },
    {
      path: "/list",
      name: "list",
      component: TodoList,
    },
    {
      path: "/add",
      name: "addTodo",
      component: AddList,
    },
    {
      path: "/edit/:id",
      name: "editTodo",
      component: EditList,
      props: true,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/useradd"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("token");

  if (authRequired && !loggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;