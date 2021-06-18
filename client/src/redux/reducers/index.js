import { combineReducers } from "redux";
import App from "./App";
import changeState from "./sidebar";
import Fakultas from "./fakultas";
import Users from "./users";
import Kategori from "./kategori";
import Mahasiswa from "./mahasiswa";
import Pengaduan from "./pengaduan";
import Prodi from "./prodi";
import Info from "./Info";

export default combineReducers({
  app: App,
  changeState,
  fakultas: Fakultas,
  users: Users,
  kategori: Kategori,
  mahasiswa: Mahasiswa,
  pengaduan: Pengaduan,
  prodi: Prodi,
  info: Info,
});
