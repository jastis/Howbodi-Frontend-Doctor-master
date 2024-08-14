import { useEffect } from "react";
import { getBrandColor } from "./../pages/settings/service/index";
import { useSelector, useDispatch } from "react-redux";
import { updateBrandColor } from "../store/actions/authAction";

export const useGlobalStyle = () => {
  const dispatch = useDispatch();
  const adminId = useSelector((state) => state.auth?.adminId);
  const companyCode = useSelector((state) => state.auth?.companyCode);

  const color = useSelector((state) => state.auth?.brandColor);

  useEffect(() => {
    const payload = {
      companyCode,
      adminId,
    };
    getBrandColor(payload)
      .then((color) => {
        dispatch(updateBrandColor(color));
        localStorage.setItem("brandColor", JSON.stringify(color));
      })
      .catch(() => null);
  }, [companyCode, adminId, dispatch]);

  return {
    setBrandColor: (color) => {
      dispatch(updateBrandColor(color));
    },
    brandColor: color || "#0168DA",
    black: "#707070",
    lightBlack: "#CBCBCB",
    bgColor: "#F8FAFF",
    activeColor: "#77DD77",
    green: "#77DD77",
    orange: "#dc8819",
    blue: "#72B5FF",
    red: "#ff6868",
    lightBlue: "#f1f6ff",

    smBold: {
      fontSize: ".7em",
      fontWeight: "bold",
    },
    smHeader: {
      fontSize: "1.1em",
      fontWeight: "bold",
    },
    bigHeader: {
      fontSize: "1.7em",
      fontWeight: "bold",
    },
    iconSize: "1.2em",
  };
};
