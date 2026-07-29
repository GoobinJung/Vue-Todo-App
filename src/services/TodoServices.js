import axios from "axios";

var baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "http://localhost/todoapi/";
} else {
  baseurl = "/todoapi/";
}

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.url.includes("login")) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

export default {
  getLists() {
    return apiClient.get("lists");
  },
  getList(id) {
    return apiClient.get("lists/" + id);
  },
  addList(list) {
    return apiClient.post("lists", list);
  },
  updateList(listId, list) {
    return apiClient.put("lists/" + listId, list);
  },
  deleteList(listId) {
    return apiClient.delete("lists/" + listId);
  },
  getListItems(listId) {
    return apiClient.get("lists/" + listId + "/items");
  },
  addListItem(listId, item) {
    return apiClient.post("lists/" + listId + "/items", item);
  },
  updateListItem(listId, itemId, item) {
    return apiClient.put("lists/" + listId + "/items/" + itemId, item);
  },
  deleteListItem(listId, itemId) {
    return apiClient.delete("lists/" + listId + "/items/" + itemId);
  },
  getUser() {
    return apiClient.get("users");
  },
  addUser(user) {
    return apiClient.post("users", user);
  },
  login(username, password) {
    return apiClient.post("users/login", {}, {
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    });
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return apiClient.post("users/logout");
  },
};