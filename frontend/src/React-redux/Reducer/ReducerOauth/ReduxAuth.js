import {
  BACK_DEFAULT_CHANGE,
  ON_CHANGE_LOGIN,
  ON_CHANGE_REGISTER,
  STATUS_API,
} from "../../ActionType/Type";
import axios from "axios";
import { API } from "../../../API/API";
import toast,{Toaster} from "react-hot-toast";
import { fetchData, postRegis } from "../../../utils/FetchData";

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
export const setChangeDefault = (nama, confirmPassword, email, password) => {
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

// ======= START ON CHANGE LOGIN =======
export const setChangeLogin = (name,value) => {
  return {type:ON_CHANGE_LOGIN,name,value}
}
// ======= END ON CHANGE LOGIN =======

// ======= START POST LOGIN =======
export const setPostLogin =  (url,data) => {
  return (dispatch) => {
   axios.post(`${API}${url}`,data)
    .then((res) => {
      console.log(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }
}
// ======= END POST LOGIN =======
