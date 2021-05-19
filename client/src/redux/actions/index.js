import Swal from "sweetalert2";

export const BASE_URL = "http://localhost:5000/api/v1";
export const SOCKETS_URL = "http://localhost:5000";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const SET_SIDEBAR = "SET_SIDEBAR";

// fakultas
export const GET_FAKULTAS = "GET_FAKULTAS";

// users
export const GET_USERS = "GET_USERS";

// kategori
export const GET_KATEGORI = "GET_KATEGORI";

// mahasiswa
export const GET_MAHASISWA = "GET_MAHASISWA";

// pengaduan
export const GET_PENGADUAN = "GET_PENGADUAN";

export const Message = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
});
