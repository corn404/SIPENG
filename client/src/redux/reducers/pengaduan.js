import { GET_PENGADUAN } from "../actions";

const intialState = {
  data: [],
};

const Pengaduan = (state = intialState, action) => {
  switch (action.type) {
    case GET_PENGADUAN: {
      return {
        ...state,
        data: action.data,
      };
    }

    default:
      return state;
  }
};

export default Pengaduan;
