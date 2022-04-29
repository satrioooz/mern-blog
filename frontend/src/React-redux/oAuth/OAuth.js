import { ON_CHANGE_REGISTER, STATUS_API } from "../ActionType/Type";

const initState = {
  user: {
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  status: "",
};

const Oauth = (state = initState, action) => {
  switch (action.type) {
    case ON_CHANGE_REGISTER:
      return {
        ...state,
        user: {
          ...state.user,
          [action.name]: action.value,
        },
      };
    case STATUS_API: {
      return {
        ...state,
        status: action.status,
      };
    }

    default:
      return state;
  }
};

export default Oauth;
