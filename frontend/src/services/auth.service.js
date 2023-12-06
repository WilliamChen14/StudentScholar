import axios from "axios";

const API_URL = "http://localhost:8000/";

class AuthService {
  login(username) {
    return axios
      .post(API_URL + "login", {
        username
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  setClassPage(classID) {
    localStorage.setItem('class', JSON.stringify(classID));
  }

  getClassPage(){
    return JSON.parse(localStorage.getItem('class'));
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