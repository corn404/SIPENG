import React from "react";

const Pengaduan = React.lazy(() => import("./pages/pengaduan/index"));
const Kategori = React.lazy(() => import("./pages/kategori/index"));
const Fakultas = React.lazy(() => import("./pages/fakultas/index"));
const Prodi = React.lazy(() => import("./pages/prodi/index"));
const Mahasiswa = React.lazy(() => import("./pages/mahasiswa/index"));
const Akun = React.lazy(() => import("./pages/akun/index"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/pengaduan", name: "Pengaduan", component: Pengaduan },
  { path: "/admin/kategori", name: "Kategori", component: Kategori },
  { path: "/admin/fakultas", name: "Fakultas", component: Fakultas },
  { path: "/admin/prodi", name: "Fakultas", component: Prodi },
  { path: "/admin/mahasiswa", name: "Mahasiswa", component: Mahasiswa },
  { path: "/setting/akun", name: "Akun", component: Akun },
];

export default routes;
