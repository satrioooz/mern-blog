import { ON_CHANGE_REGISTER } from "../../ActionType/Type";
import axios from "axios";
import { API } from "../../../API/API";

// ======= START ON CHANGE REGISTER =======
export const setChangeRegister = (name, value) => {
  return { type: ON_CHANGE_REGISTER, name, value };
};
// ======= END ON CHANGE REGISTER =======

// ======= START POST REGISTER =======

export const setPostRegis = (data) => {
  return (dispatch) => {
    axios
      .post(`${API}register`, data)
      .then((res) => {
        console.log(res.data);
        alert("success");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
// ======= END POST REGISTER =======
