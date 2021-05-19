import axios from "axios";

import { BASE_URL, Message, GET_FAKULTAS } from ".";

export const tambahFakultas = (nama) => async (dispatch) => {
  try {
    const add = await axios.post(`${BASE_URL}/fakultas`, {
      nama_fakultas: nama,
    });

    if (add.data.status === "Created") {
      Message.fire({
        icon: "success",
        title: `${nama} berhasil disimpan`,
      });

      dispatch(getFakultas());
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFakultas = () => async (dispatch) => {
  try {
    const fakultas = await axios.get(`${BASE_URL}/fakultas`);
    dispatch({ type: GET_FAKULTAS, data: fakultas.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFakultas = (id) => async (dispatch) => {
  try {
    const del = await axios.delete(`${BASE_URL}/fakultas/${id}`);
    if (del.data.status === "Deleted") {
      Message.fire({
        icon: "success",
        title: `Fakultas berhasil dihapus`,
      });
      dispatch(getFakultas());
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const updateFakultas = (id, nama_fakultas) => async (dispatch) => {
  try {
    const update = await axios.put(`${BASE_URL}/fakultas`, {
      id,
      nama_fakultas,
    });
    if (update.data.status === "Updated") {
      Message.fire({
        icon: "success",
        title: `Fakultas berhasil diupdate`,
      });
      dispatch(getFakultas());
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};
