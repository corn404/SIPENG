import axios from "axios";

import { BASE_URL, GET_INFO } from ".";

export const getInfoAll = () => async (dispatch) => {
  try {
    const result = await axios.get(`${BASE_URL}/info`);
    dispatch({ type: GET_INFO, data: result.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const getInfoByProdi = (id_prodi) => async (dispatch) => {
  try {
    const result = await axios.get(`${BASE_URL}/info/${id_prodi}`);
    dispatch({ type: GET_INFO, data: result.data.data });
  } catch (error) {
    console.log(error);
  }
};
