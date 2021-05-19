import { GET_FAKULTAS } from "../actions";

const intialState = {
  fakultas: [],
};

const Fakultas = (state = intialState, action) => {
  switch (action.type) {
    case GET_FAKULTAS: {
      return {
        ...state,
        fakultas: action.data,
      };
    }

    default:
      return state;
  }
};

export default Fakultas;
