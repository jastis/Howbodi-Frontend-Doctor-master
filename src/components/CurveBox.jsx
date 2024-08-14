import { Box } from "@chakra-ui/layout"

export const CurveBox = ({ h, children, ...props }) => {
  return (
    <Box
      {...props}
      h={h ? h : "100%"}
      w="100%"
      borderRadius="10px"
      p="20px"
      bg="#fff"
    >
      {children}
    </Box>
  )
}
