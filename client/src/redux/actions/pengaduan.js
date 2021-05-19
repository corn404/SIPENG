import axios from "axios";
import { Message, GET_PENGADUAN, BASE_URL } from ".";

export const getPengaduanByFakultas = (id) => async (dispatch) => {
  try {
    const pengaduan = await axios.get(`${BASE_URL}/pengaduan/${id}`);
    dispatch({ type: GET_PENGADUAN, data: pengaduan.data.data });
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const getPengaduan = () => async (dispatch) => {
  try {
    const pengaduan = await axios.get(`${BASE_URL}/pengaduan`);
    dispatch({ type: GET_PENGADUAN, data: pengaduan.data.data });
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const hapusPengaduan = (id) => async (dispatch) => {
  try {
    const del = await axios.delete(`${BASE_URL}/pengaduan/${id}`);
    if (del.data.status === "Deleted") {
      Message.fire({
        icon: "success",
        title: "Pengaduan berhasil dihapus",
      });
      dispatch(getPengaduan());
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const hapusPengaduanFakultas = (id) => async (dispatch) => {
  try {
    const del = await axios.delete(`${BASE_URL}/pengaduan/${id}`);
    if (del.data.status === "Deleted") {
      Message.fire({
        icon: "success",
        title: "Pengaduan berhasil dihapus",
      });
      dispatch(getPengaduanByFakultas());
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const balasPengaduan = (id, balasan) => async (dispatch) => {
  try {
    const balas = await axios.put(`${BASE_URL}/pengaduan/balas`, {
      id,
      balasan,
    });
    if (balas.data.status === "Updated") {
      Message.fire({
        icon: "success",
        title: "Berhasil",
      });
      dispatch(getPengaduan());
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};
