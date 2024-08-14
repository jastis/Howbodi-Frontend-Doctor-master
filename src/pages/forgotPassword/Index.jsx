import React, { useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react"
import { ForgotPasswordForm } from "./components/ForgotPassword";
import background from "../Login/images/background.png"
import { AuthenticateCode } from "./components/AuthenticateCode";

export const ForgotPassword = () => {

  const [authenticateCode, setAuthenticateCode] = useState(false);
  const [email, setEmail] = useState("");

  return(
    <Box p="50px">
      <Flex direction={["column", "column", "row"]}>
      <Box width="50%">
          <Image 
            src={background}
          />
        </Box>
        <Box width="50%">
          {
            !authenticateCode ? 
            <ForgotPasswordForm setAuthenticateCode={setAuthenticateCode} email={email} setEmail={setEmail} />
          : 
          <AuthenticateCode email={email} />
          }
        </Box>
       
      </Flex>
    </Box>
  )
}