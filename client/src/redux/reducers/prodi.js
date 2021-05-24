import { GET_PRODI } from "../actions";

const intialState = {
  prodi: [],
};

const Prodi = (state = intialState, action) => {
  switch (action.type) {
    case GET_PRODI: {
      return {
        ...state,
        prodi: action.data,
      };
    }

    default:
      return state;
  }
};

export default Prodi;
