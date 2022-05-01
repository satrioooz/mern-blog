import { LOADING_DATA, LOADING_FALSE } from "../ActionType/Type";

const initState = {
  loading: false,
};

const status = (state = initState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        // CHANGE STATE LOADING TO TRUE
        loading: true,
      };
      case LOADING_FALSE:
          return {
              ...state,
              loading:false
          }
    default:
      return state;
  }
};

export default status;
