import { ON_CHANGE_REGISTER } from "../ActionType/Type";

const initState = {
  user: {
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
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

    default:
      return state;
  }
};

export default Oauth;
