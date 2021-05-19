import React from "react";

const Pengaduan = React.lazy(() => import("./pages/pengaduan_user/index"));
const Mahasiswa = React.lazy(() => import("./pages/mahasiswa_user/index"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/pengaduan", name: "Pengaduan", component: Pengaduan },
  { path: "/admin/mahasiswa", name: "Mahasiswa", component: Mahasiswa },
];

export default routes;
