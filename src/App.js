import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import AuthenticatedApp from "./app/authenticatedApp";
import UnAuthenticatedApp from "./app/unAuthenticatedApp";
import FullPageLoader from "./components/fullPageLoader";
import { authSetUser } from "./store/actions/authAction";

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);

  // check if user is authenticated and get his details and store to global state
  useEffect(() => {
    // Handle user state changes
    const getAuthData = async (obj) => {
      dispatch(authSetUser({ ...obj }));
      setIsLoggedIn(true);
      if (checkingStatus) setCheckingStatus(false);
    };

    const deleteTokenAndKickUserOut = async () => {
      sessionStorage.removeItem("HB#221#");
      if (checkingStatus) setCheckingStatus(false);
    };

    //deleteTokenAndKickUserOut();

    const token = sessionStorage.getItem("HB#221#");

    console.log("Token ", token);

    if (token) {
      const decoded = jwtDecode(token);
      const expiryDate = new Date(decoded.exp * 1000);
      return new Date() > expiryDate
        ? deleteTokenAndKickUserOut()
        : getAuthData(decoded);
    }
    return deleteTokenAndKickUserOut();
  }, [checkingStatus, dispatch]);
  // End check !!

  if (checkingStatus) {
    return <FullPageLoader />;
  }

  if (isLoggedIn) {
    return <AuthenticatedApp />;
  }

  return <UnAuthenticatedApp />;
}

export default App;
