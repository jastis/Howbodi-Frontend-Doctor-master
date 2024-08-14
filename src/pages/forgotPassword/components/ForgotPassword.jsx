import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
// import { useHistory } from "react-router-dom"
// import { Link } from 'react-router-dom';
import { initiateForgotPassword } from "../service/forgotPassword";
// import { loginUser } from '../service/loginUser';

export const ForgotPasswordForm = ({
  setAuthenticateCode,
  setEmail,
  email,
}) => {
  const [loading, setLoading] = useState(false);

  //  const navigate = useHistory()

  //  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    setLoading(true);
    await initiateForgotPassword({ email }, setLoading, setAuthenticateCode);
    setLoading(false);
  };

  return (
    <Box>
      <Box width={"100%"} p="100px">
        <Heading fontFamily="Gilroy-Bold" mb="20px" color="#2A2047">
          Forgot Password
        </Heading>
        <Text fontSize="18px" color="#929292" maxWidth="400px">
          Enter Your email address to get your get authentication code
        </Text>
        <FormControl my="40px">
          <FormLabel htmlFor="email" color="#929292">
            Email
          </FormLabel>
          <Input
            height="50px"
            borderRadius={"10px"}
            placeholder="Enter Your Email"
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Button
          mt="20px"
          bg="#2A2047"
          color="#fff"
          borderRadius={"10px"}
          width="100%"
          height="50px"
          isLoading={loading}
          onClick={handleSubmit}
          _hover={{ bg: "#5C2BA8" }}
        >
          Submit
        </Button>
        {/* <Link to="/forgot-password" style={{ color: "#ED819C", marginTop: "5px" }}>Forgot password? Click here</Link> */}
      </Box>
      {/* </Flex> */}
    </Box>
  );
};
