import { Text, Stack } from "@chakra-ui/react"
import dayjs from "dayjs"
import { MdUpdate } from "react-icons/md"
import { GoPrimitiveDot } from "react-icons/go"
import { AiOutlineAlignLeft } from "react-icons/ai"

export const ActivityInformation = ({ activity }) => {
  const { title, description, date } = activity
  const STACK_STYLE = {
    direction: "row",
    alignItems: "center",
    spacing: "20px",
  }
  const ICON_STYLE = {
    fontSize: "1.5em",
    color: "#303030",
  }
  return (
    <Stack spacing="20px" color="#595959">
      <Stack {...STACK_STYLE}>
        <GoPrimitiveDot {...ICON_STYLE} />
        <Text fontWeight="medium">{title}</Text>
      </Stack>
      <Stack {...STACK_STYLE}>
        <AiOutlineAlignLeft {...ICON_STYLE} />
        <Text>{description}</Text>
      </Stack>
      <Stack {...STACK_STYLE}>
        <MdUpdate {...ICON_STYLE} />
        <Text>{dayjs(date).format("DD MMMM, YYYY")}</Text>
      </Stack>
    </Stack>
  )
}
