import React from "react"
import { Box, Flex, Image } from "@chakra-ui/react"
import { LoginForm } from "./components/LoginForm"
import background from "./images/background.png"

export const Login = () => {
  return (
    <Box p="50px" height={["100%", "100%"]}>
      <Flex direction={["column", "column", "column", "row"]}>
      <Box width={["100%", "100%", "100%", "50%"]}>
          <Image 
            src={background}
          />
        </Box>
        <Box width={["100%", "100%", "100%", "50%"]}>
          <LoginForm />
        </Box>
       
      </Flex>
      
    </Box>
  )
}
