import {
  BACK_DEFAULT_CHANGE,
  ON_CHANGE_REGISTER,
  STATUS_API,
} from "../../ActionType/Type";
import axios from "axios";
import { API } from "../../../API/API";
import toast from "react-hot-toast";
import { postRegis } from "../../../utils/FetchData";

// ======= START ON CHANGE REGISTER =======
export const setChangeRegister = (name, value) => {
  return { type: ON_CHANGE_REGISTER, name, value };
};
// ======= END ON CHANGE REGISTER =======

// ======= START POST REGISTER =======

export const setPostRegis = (data) => {
  return (dispatch) => {
    postRegis(data)
      .then((res) => {
        let status = res.data.message;
        console.log(res.data);
        dispatch({
          type: STATUS_API,
          status,
        });
        toast.success("login successful, check email for verification");
      })
      .catch((errors) => {
        errors.response.data.errors.map((item) => {
          toast.error(item.msg);
        });
      });
  };
};
// ======= END POST REGISTER =======

// ======= START DEFAULT VALUE REGISTER =======
export const setChangeDefault = (nama,confirmPassword, email, password) => {
  return {
    type: BACK_DEFAULT_CHANGE,
    payload: {
      nama: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  };
};
// ======= END DEFAULT VALUE REGISTER =======
