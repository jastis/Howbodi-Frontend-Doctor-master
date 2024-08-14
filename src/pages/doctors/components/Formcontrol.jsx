import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

export const Formcontrol = ({ type, name, placeholder }) => {
  return (
    <Box>
      <FormControl>
        <FormLabel htmlFor={name}>{name}</FormLabel>
        <Input id={name} type={type || "text"} placeholder={placeholder} name={name} />
      </FormControl>
    </Box>
  );
}
