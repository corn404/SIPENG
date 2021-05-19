import axios from "axios";
import jwt from "jsonwebtoken";
import { BASE_URL, Message, GET_USERS, USER_LOGIN, USER_LOGOUT } from ".";

export const checkUser = (token) => (dispatch) => {
  const decode = jwt.verify(token, "umgo123");
  dispatch({ type: USER_LOGIN, data: decode });
};

export const getUsers = () => async (dispatch) => {
  try {
    const getData = await axios.get(`${BASE_URL}/auth`);
    dispatch({ type: GET_USERS, data: getData.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = (data) => async (dispatch) => {
  try {
    const add = await axios.post(`${BASE_URL}/auth/register`, data);
    if (add.data.status === "Registered") {
      Message.fire({
        icon: "success",
        title: "User berhasil di daftarkan!",
      });

      dispatch(getUsers());
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const LoginUser = (username, password) => async (dispatch) => {
  try {
    const login = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });

    if (login.data.status === "Success") {
      localStorage.setItem("token", login.data.data);
      dispatch(checkUser(login.data.data));
    } else {
      Message.fire({
        icon: "error",
        title: login.data.data,
      });
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const userLogOut = () => (dispatch) => {
  try {
    localStorage.removeItem("token");
    // dispatch({ type: USER_LOGOUT });
    document.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (uuid) => async (dispatch) => {
  try {
    const del = await axios.delete(`${BASE_URL}/auth/${uuid}`);
    if (del.data.status === "Deleted") {
      Message.fire({
        icon: "success",
        title: "User berhasil dihapus",
      });
      dispatch(getUsers());
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};

export const updateUser = (data) => async (dispatch) => {
  try {
    const add = await axios.put(`${BASE_URL}/auth/update`, data);
    if (add.data.status === "Updated") {
      Message.fire({
        icon: "success",
        title: "User berhasil diupdate!",
      });

      dispatch(getUsers());
    }
  } catch (error) {
    Message.fire({
      icon: "error",
      title: "Ada masalah pada server, silahkan hubungi admin",
    });
  }
};
