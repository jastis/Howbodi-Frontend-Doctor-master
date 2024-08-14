import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";

export const LinkTo = ({
  type,
  to,
  classname,
  iconComponent: I,
  title,
  toggle,
  id,
  activeIconId,
  setActiveIconId,
}) => {
  const [isMobileScreen] = useMediaQuery("(max-width: 600px)");

  useEffect(() => {}, []);

  return (
    <NavLink
      activeStyle={{
        fontWeight: "bold",
        color: "rgb(92, 43, 168)",
        background: "#EEE4FE",
        borderLeft: "5px solid rgb(42, 157, 143)",
        padding: "10px 25px",
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
      }}
      isActive={(match, location) => {
        if (match) {
          //set isActive state true
          setActiveIconId(id);
        }
        return match;
      }}
      activeClassName="active"
      className={`${classname} link`}
      onClick={() => {
        isMobileScreen && toggle();
      }}
      target={title === "Guest CheckIn" ? "_blank" : ""}
      to={to ? to : "/"}
      style={{ color: "#929292" }}
    >
      <I fontSize="1.5em" color={activeIconId === id ? "#09B5A9" : "#8C78AB"} />
      {title}
    </NavLink>
  );
};
