import { GET_INFO } from "../actions";

const intialState = {
  data: null,
};

const Info = (state = intialState, action) => {
  switch (action.type) {
    case GET_INFO: {
      return {
        ...state,
        data: action.data,
      };
    }

    default:
      return state;
  }
};

export default Info;
