import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/"
});

const apis = {
  loadUsers: () => api.get("users"),
  removeUser: id => api.delete("users/" + id),
  createUser: name => api.post("users", name, email)
};

export default apis;