import axois from "axios";

const instance = axois.create({
  baseURL: "https://fakestoreapi.com/",
});

export default instance;