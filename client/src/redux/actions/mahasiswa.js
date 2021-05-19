import axios from "axios";
import { BASE_URL, GET_MAHASISWA, Message } from ".";

export const getMahasiswa = () => async (dispatch) => {
  try {
    const get = await axios.get(`${BASE_URL}/mahasiswa`);
    dispatch({ type: GET_MAHASISWA, data: get.data.data });
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const getMahasiswaFakultas = (id) => async (dispatch) => {
  try {
    const get = await axios.get(`${BASE_URL}/mahasiswa/fakultas/${id}`);
    dispatch({ type: GET_MAHASISWA, data: get.data.data });
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const addMahasiswa = (data) => async (dispatch) => {
  try {
    const add = await axios.post(`${BASE_URL}/mahasiswa`, data);
    if (add.data.status === "Created") {
      Message.fire({
        icon: "success",
        title: "Mahasiswa berhasil didaftarkan",
      });
      dispatch(getMahasiswa());
    } else {
      Message.fire({
        icon: "Error",
        title: `${add.data.data}`,
      });
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const addMahasiswaFakultas = (data, id) => async (dispatch) => {
  try {
    const add = await axios.post(`${BASE_URL}/mahasiswa`, data);
    if (add.data.status === "Created") {
      Message.fire({
        icon: "success",
        title: "Mahasiswa berhasil didaftarkan",
      });
      dispatch(getMahasiswaFakultas(id));
    } else {
      Message.fire({
        icon: "Error",
        title: `${add.data.data}`,
      });
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const resetPassword = (id, nim) => async (dispatch) => {
  try {
    const reset = await axios.put(`${BASE_URL}/mahasiswa/reset`, { id, nim });
    if (reset.data.status === "Updated") {
      Message.fire({
        icon: "success",
        title: "Reset Password berhasil",
      });
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};
