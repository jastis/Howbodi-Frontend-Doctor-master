import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "./getUserProfile";
// import { AuthContext } from "./authContext";

export const UserProfileContext = createContext({});

export const UserProfileContextProvider = ({ children }) => {
  const docId = useSelector((state) => state?.auth?.docId);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getUserProfile(docId, setUserProfile, setIsLoading);
  }, [docId]);

  return (
    <UserProfileContext.Provider value={{ userProfile, isLoading }}>
      {children}
    </UserProfileContext.Provider>
  );
};
