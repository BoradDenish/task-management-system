import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userToken = ref("");

  function setUserToken(token) {
    userToken.value = token;
    localStorage.setItem("userToken", token);
  }

  function getUserToken() {
    const token = localStorage.getItem("userToken");
    userToken.value = token || null;
    return userToken.value;
  }

  function clearUserToken() {
    userToken.value = "";
    localStorage.removeItem("userToken");
  }

  return { userToken, setUserToken, getUserToken, clearUserToken };
});