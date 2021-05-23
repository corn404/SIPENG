import React from "react";
import {
  IoAccessibilityOutline,
  IoBookOutline,
  IoList,
  IoNewspaperOutline,
  IoPeopleOutline,
  IoSchool,
} from "react-icons/io5";
import { useSelector } from "react-redux";

const Pengaduan = () => {
  const data = useSelector((x) => x.pengaduan.data);
  var count = [];
  data.map((x) => {
    if (x.status === 0) {
      count.push(x.id);
    }
  });
  return count.length;
};

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Pengaduan",
    to: "/pengaduan",
    icon: <IoNewspaperOutline className="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: <Pengaduan />,
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["MASTER"],
  },

  {
    _tag: "CSidebarNavItem",
    name: "Fakultas",
    to: "/admin/fakultas",
    icon: <IoBookOutline className="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavItem",
    name: "Prodi",
    to: "/admin/prodi",
    icon: <IoSchool className="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavItem",
    name: "Mahasiswa",
    to: "/admin/mahasiswa",
    icon: <IoAccessibilityOutline className="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavItem",
    name: "Kategori",
    to: "/admin/kategori",
    icon: <IoList className="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["SETTINGS"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Akun",
    to: "/setting/akun",
    icon: <IoPeopleOutline className="c-sidebar-nav-icon" />,
  },
];

export default _nav;
