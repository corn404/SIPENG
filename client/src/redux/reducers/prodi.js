import { GET_PRODI } from "../actions";

const intialState = {
  data: [],
};

const Prodi = (state = intialState, action) => {
  switch (action.type) {
    case GET_PRODI: {
      return {
        ...state,
        data: action.data,
      };
    }

    default:
      return state;
  }
};

export default Prodi;
