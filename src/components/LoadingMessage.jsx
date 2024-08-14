import { createStandaloneToast, Box, Text } from "@chakra-ui/react"

export const LoadingMessage = () => {
  const toast = createStandaloneToast()
  return toast({
    position: "bottom",
    duration: 500,
    render: () => (
      <Box borderRadius="2px" color="#fff" bg="#bfbf36" p={2} w="100px">
        <Text textAlign="center" fontWeight="bold">
          Loading
        </Text>
      </Box>
    ),
  })
}
