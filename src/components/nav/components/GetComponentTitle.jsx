export const getComponentTitle = (pathname) => {
  switch (pathname) {
    case "/dashboard":
      return "Dashboard";

    case "/payments":
      return "Earnings";
    case "/notifications":
      return "Notifications";
    case "/patients":
      return "Patients";
    case "/chats":
      return "Chats";
    case "/calendar":
      return "Calendar";
    case "/reviews":
      return "Reviews";
      case "/profile":
        return "Profile";
    default:
      return "Welcome";
  }
};
