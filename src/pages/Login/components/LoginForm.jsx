import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../service/loginUser";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const LoginForm = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginRef = useRef(null);

  const handleClick = () => {
    setShow(!show);
  };
  //  const navigate = useHistory()

  //  const handleClick = () => setShow(!show);

  const handleLogin = async () => {
    setLoading(true);
    await loginUser(
      JSON.stringify({
        email: email,
        password: password,
      }),
      setLoading
    );
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      e.key === "Enter" && loginRef?.current?.click();
    });
    return () => window?.removeEventListener("keypress", () => null);
  }, []);

  return (
    <Box>
      <Box width={"100%"} p={["10px", "50px", "100px"]}>
        <Heading fontFamily="Gilroy-Bold" mb="20px" color="#2A2047">
          Welcome
        </Heading>
        <FormControl onSubmit={handleLogin}>
          <FormLabel htmlFor="email" color="#929292">
            Email
          </FormLabel>
          <Input
            height="50px"
            borderRadius={"10px"}
            placeholder="Enter Your Email"
            type={"email"}
            onChange={(e) => setEmail(e.target.value?.trim())}
          />
        </FormControl>
        <FormControl my="20px">
          <FormLabel htmlFor="password" color="#929292">
            Password
          </FormLabel>
          <InputGroup alignItems={"center"}>
            <Input
              height="50px"
              borderRadius={"10px"}
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value?.trim())}
            />
            <InputRightElement
              top={"auto"}
              children={
                <span
                  style={{ cursor: "pointer", padding: "5px" }}
                  onClick={handleClick}>
                  {show ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </InputGroup>
          <Button
            ref={loginRef}
            mt="20px"
            bg="#2A2047"
            color="#fff"
            borderRadius={"10px"}
            width="100%"
            height="50px"
            isLoading={loading}
            onClick={handleLogin}
            type="submit"
            _hover={{ bg: "#5C2BA8" }}>
            Login
          </Button>
        </FormControl>
        <Link
          to="/forgot-password"
          style={{ color: "#ED819C", marginTop: "5px" }}>
          Forgot password? Click here
        </Link>
      </Box>
      {/* </Flex> */}
    </Box>
  );
};
