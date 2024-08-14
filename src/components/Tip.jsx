import { Tooltip } from "@chakra-ui/react"
import { Box } from "@chakra-ui/layout"

export const Tip = ({ l, children }) => {
  return (
    <Tooltip label={l}>
      <Box>{children}</Box>
    </Tooltip>
  )
}
