import {
  BACK_DEFAULT_CHANGE,
  ON_CHANGE_LOGIN,
  ON_CHANGE_REGISTER,
  STATUS_API,
} from "../ActionType/Type";

const initState = {
  user: {
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  formLogin: {
    email: '',
    password: '',
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
    case BACK_DEFAULT_CHANGE:
      return {
        ...state,
        user: action.payload,
      };
      case ON_CHANGE_LOGIN:
        return {
          ...state,
          formLogin: {
            ...state.formLogin,
            [action.name]: action.value,
          },
        };

    default:
      return state;
  }
};

export default Oauth;
