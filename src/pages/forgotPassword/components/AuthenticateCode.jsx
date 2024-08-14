import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useHistory } from "react-router-dom";
// import { useHistory } from "react-router-dom"
import { authenticateCode } from "../service/forgotPassword";
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import { loginUser } from '../service/loginUser';

export const AuthenticateCode = ({ email }) => {
  const [show, setShow] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  const handleShowNewPassword = () => {
    setShow((show) => !show);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  useEffect(() => {
    if (!password || !confirmPassword || password !== confirmPassword) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [password, confirmPassword]);

  const handleLogin = async () => {
    const payload = {
      password,
      otp: code,
      email,
    };

    setLoading(true);
    await authenticateCode(payload, setLoading, history);
  };

  return (
    <Box>
      <Box width={"100%"} p="100px">
        <Heading fontFamily="Gilroy-Bold" mb="20px" color="#2A2047">
          Authentication code
        </Heading>
        <Text fontSize="18px" color="#929292" maxWidth="400px">
          Input the code sent to your email address
        </Text>
        <FormControl my="40px">
          <FormLabel htmlFor="email" color="#929292">
            Input Code
          </FormLabel>
          <Input
            height="50px"
            borderRadius={"10px"}
            placeholder="Enter the code sent to you"
            type={"text"}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </FormControl>
        <FormControl my="40px">
          <FormLabel htmlFor="password" color="#929292">
            New password
          </FormLabel>

          <InputGroup alignItems={"center"}>
            <Input
              height="50px"
              borderRadius={"10px"}
              placeholder="Enter new password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement
              top={"auto"}
              children={
                <span
                  style={{ cursor: "pointer", padding: "5px" }}
                  onClick={handleShowNewPassword}
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </InputGroup>
        </FormControl>
        <FormControl my="40px">
          <FormLabel htmlFor="password" color="#929292">
            Confirm new password
          </FormLabel>
          <InputGroup alignItems={"center"}>
            <Input
              height="50px"
              borderRadius={"10px"}
              placeholder="confirm new password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputRightElement
              top={"auto"}
              children={
                <span
                  style={{ cursor: "pointer", padding: "5px" }}
                  onClick={handleShowConfirmPassword}
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </InputGroup>
        </FormControl>
        <Button
          disabled={disabled}
          mt="20px"
          _hover={{ bg: "#2A2047" }}
          bg="#2A2047"
          color="#fff"
          borderRadius={"10px"}
          width="100%"
          height="50px"
          isLoading={loading}
          onClick={handleLogin}
        >
          Submit
        </Button>
        {/* <Link to="/forgot-password" style={{ color: "#ED819C", marginTop: "5px" }}>Resend Code</Link> */}
      </Box>
      {/* </Flex> */}
    </Box>
  );
};
