import axios from "axios";

const API_URL = "http://localhost:8000/";

class AuthService {
  login(username) {
    console.log("AuthService check1")
    return axios
      .post(API_URL + "login", {
        username
      })
      .then(response => {
        console.log("check2");
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log("AuthService check3");
          console.log(localStorage.getItem('user'));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    console.log("got current user");
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();