import React, { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInfoAll, getInfoByProdi } from "src/redux/actions/info.js";

const WidgetsDropdown = lazy(() => import("./WidgetsDropdown.js"));

const Dashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((x) => x.users.currentUser);

  useEffect(() => {
    if (users.role === "admin") {
      dispatch(getInfoAll());
    } else {
      dispatch(getInfoByProdi(users.id_prodi));
    }
  }, []);
  return (
    <>
      <WidgetsDropdown />
    </>
  );
};

export default Dashboard;
