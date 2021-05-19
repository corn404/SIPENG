import { GET_KATEGORI } from "../actions";

const intialState = {
  data: [],
};

const Kategori = (state = intialState, action) => {
  switch (action.type) {
    case GET_KATEGORI: {
      return {
        ...state,
        data: action.data,
      };
    }

    default:
      return state;
  }
};

export default Kategori;
