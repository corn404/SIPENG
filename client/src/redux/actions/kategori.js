import axios from "axios";
import { BASE_URL, GET_KATEGORI, Message } from ".";

export const getKategori = () => async (dispatch) => {
  try {
    const kategori = await axios.get(`${BASE_URL}/kategori`);
    dispatch({ type: GET_KATEGORI, data: kategori.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const addKategori = (kategori) => async (dispatch) => {
  try {
    const add = await axios.post(`${BASE_URL}/kategori`, { kategori });
    if (add.data.status === "Created") {
      Message.fire({
        icon: "success",
        title: `Kategori ${kategori} berhasil di tambahkan`,
      });
      dispatch(getKategori());
    } else {
      Message.fire({
        icon: "error",
        title: "Ada masalah pada server, silahkan hubungi admin",
      });
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const deleteKategori = (id) => async (dispatch) => {
  try {
    const del = await axios.delete(`${BASE_URL}/kategori/${id}`);
    if (del.data.status === "Success") {
      Message.fire({
        icon: "success",
        title: `Kategori berhasil dihapus`,
      });

      dispatch(getKategori());
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const updateKategori = (id, kategori) => async (dispatch) => {
  try {
    const update = await axios.put(`${BASE_URL}/kategori`, { id, kategori });
    if (update.data.status === "Updated") {
      Message.fire({
        icon: "success",
        title: `Kategori berhasil diupdate`,
      });
      dispatch(getKategori());
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};
