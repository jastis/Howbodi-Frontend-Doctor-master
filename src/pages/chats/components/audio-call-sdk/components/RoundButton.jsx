import { Box } from "@chakra-ui/react";

function RoundButton({ bg, onClick, children, ...props }) {
  return (
    <Box
      background={bg}
      padding="10px"
      borderRadius="50%"
      color="#fff"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      zIndex={999}
      onClick={() => onClick()}
      {...props}
    >
      {children}
    </Box>
  );
}

export default RoundButton;
