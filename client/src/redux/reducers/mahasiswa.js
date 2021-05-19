import { GET_MAHASISWA } from "../actions";

const intialState = {
  data: [],
};

const Mahasiswa = (state = intialState, action) => {
  switch (action.type) {
    case GET_MAHASISWA: {
      return {
        ...state,
        data: action.data,
      };
    }

    default:
      return state;
  }
};

export default Mahasiswa;
