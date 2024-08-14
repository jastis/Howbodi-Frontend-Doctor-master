import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast();
export const errorNotifier = (errorMessage) => {
  return toast({
    // title: "Error",
    description:
      typeof errorMessage === "string"
        ? errorMessage
        : "an error occured, please try again",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top-right",
  });
};

export const successNotifier = (info) => {
  return toast({
    // title: "Success",
    description: info,
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "top",
  });
};

export const customSuccessNotifier = ({ title, message, func }) => {
  return toast({
    // title,
    // description: message,
    render: func,
    status: "success",
    duration: null,
    isClosable: true,
    position: "top-right",
  });
};
