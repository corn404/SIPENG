import axios from "axios";
import { Message, GET_PRODI, BASE_URL } from ".";

export const getProdi = () => async (dispatch) => {
  try {
    const prodi = await axios.get(`${BASE_URL}/prodi`);
    dispatch({ type: GET_PRODI, data: prodi.data.data });
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const getProdyByFakultas = (id) => async (dispatch) => {
  try {
    const prodi = await axios.get(`${BASE_URL}/prodi/${id}`);
    dispatch({ type: GET_PRODI, data: prodi.data.data });
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const createdProdi = (nama_prodi, id_fakultas) => async (dispatch) => {
  try {
    const add = await axios.post(`${BASE_URL}/prodi`, {
      nama_prodi,
      id_fakultas,
    });
    if (add.data.status === "Created") {
      Message.fire({
        icon: "success",
        title: "Prodi berhasil ditambahkan",
      });
      dispatch(getProdi());
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const updateProdi =
  (id, nama_prodi, id_fakultas) => async (dispatch) => {
    try {
      const update = await axios.put(`${BASE_URL}/prodi`, {
        id,
        nama_prodi,
        id_fakultas,
      });
      if (update.data.status === "Updated") {
        Message.fire({
          icon: "success",
          title: "Prodi berhasil update",
        });
        dispatch(getProdi());
      }
    } catch (error) {
      Message.fire({
        icon: "error",
        title: "Ada masalah pada server, silahkan hubungi admin",
      });
    }
  };

export const hapusProdi = (id) => async (dispatch) => {
  try {
    const del = await axios.delete(`${BASE_URL}/prodi/${id}`);
    if (del.data.status === "Deleted") {
      Message.fire({
        icon: "success",
        title: "Prodi berhasil hapus",
      });
      dispatch(getProdi());
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};
