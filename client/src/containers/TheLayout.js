import React, { useEffect } from "react";
import io from "socket.io-client";
import useSound from "use-sound";
import { SOCKETS_URL } from "src/redux/actions";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import notif from "../assets/sound/notify.ogg";
import { useDispatch } from "react-redux";
import { getPengaduan } from "src/redux/actions/pengaduan";

const socket = io(SOCKETS_URL);

const TheLayout = () => {
  const [play] = useSound(notif);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("add-pengaduan", () => {
      play();
      dispatch(getPengaduan());
    });
  });
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
