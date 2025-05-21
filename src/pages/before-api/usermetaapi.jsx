import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import axios from "axios";
import { setMeta } from "../redux/meta-slice";

export default function UserMetaAPI() {
  const dispatch = useDispatch();

  useEffect(() => {
    const SubmitDeviceInfo = async () => {
      const userAgent = navigator.userAgent;

      const os = /Windows/.test(userAgent)
        ? "Windows"
        : /Mac/.test(userAgent)
        ? "MacOS"
        : /Linux/.test(userAgent)
        ? "Linux"
        : /Android/.test(userAgent)
        ? "Android"
        : /iPhone|iPad|iPod/.test(userAgent)
        ? "iOS"
        : "Unknown OS";

      const isBrave =
        navigator.brave &&
        typeof navigator.brave.isBrave === "function" &&
        (await navigator.brave.isBrave());

      const browser = isBrave
        ? "Brave"
        : /Firefox/.test(userAgent)
        ? "Firefox"
        : /Edg\//.test(userAgent)
        ? "Edge"
        : /OPR/.test(userAgent)
        ? "Opera"
        : /Chrome/.test(userAgent)
        ? "Chrome"
        : /Safari/.test(userAgent)
        ? "Safari"
        : /MSIE|Trident/.test(userAgent)
        ? "Internet Explorer"
        : "Unknown Browser";

      const device = /Mobi|Android|iPhone|iPad/.test(userAgent)
        ? "Mobile"
        : "Desktop";
      const url = "https://api64.ipify.org?format=json";
      axios(url)
        .then((resp) =>
          dispatch(
            setMeta({
              device: device,
              browser: browser,
              os: os,
              ip: resp.data.ip,
            })
          )
        )
        .catch((err) => console.log(err));
    };
    SubmitDeviceInfo();
  }, []);

  return <Outlet />;
}
