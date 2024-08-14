import { Text, Stack, Box, Link } from "@chakra-ui/react"
import dayjs from "dayjs"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { GoPrimitiveDot } from "react-icons/go"
import { FiExternalLink } from "react-icons/fi"
import { AiOutlineCalendar, AiOutlineLink } from "react-icons/ai"

const SM = { fontSize: ".9em" }

const STACK_STYLE = {
  direction: "row",
  alignItems: "center",
  spacing: "20px",
}

const EventDetails = ({ event }) => {
  const {
    description,
    location,
    startDate,
    endDate,
    htmlLink,
    type,
    channel,
    meetingLink,
  } = event

  return (
    <Stack spacing="20px" color="#595959">
      <Stack {...STACK_STYLE}>
        <GoPrimitiveDot color={"#303030"} fontSize="1.5em" />
        <Box>
          <Text {...SM} fontWeight="bold" fontSize="1.2em">
            {description}
          </Text>
          <Text fontSize=".9em">
            {dayjs(startDate).format("dddd MM, YYYY")} &bull; &ensp;
            {dayjs(startDate).format("hh:mm A")}&ensp;&ndash;&ensp;
            {dayjs(endDate).format("hh:mm A")}
          </Text>
        </Box>
      </Stack>
      {type === "VIRTUAL" && (
        <Stack {...STACK_STYLE}>
          <HiOutlineLocationMarker color={"#303030"} fontSize="1.5em" />
          <Text {...SM}>{channel}</Text>
        </Stack>
      )}
      {meetingLink && (
        <Stack {...STACK_STYLE}>
          <AiOutlineLink color={"#303030"} fontSize="1.5em" />
          <Link href={meetingLink} isExternal>
            Go to link <FiExternalLink style={{ display: "inline" }} />
          </Link>
        </Stack>
      )}

      {type === "BOTH" && (
        <Stack {...STACK_STYLE} alignItems="center">
          <HiOutlineLocationMarker color={"#303030"} fontSize="1.5em" />
          <Stack>
            <Text {...SM}>{channel}</Text>
            <Text {...SM}>{location}</Text>
          </Stack>
        </Stack>
      )}

      {type === "PHYSICAL" && (
        <Stack {...STACK_STYLE}>
          <HiOutlineLocationMarker color={"#303030"} fontSize="1.5em" />
          <Text {...SM}>{location}</Text>
        </Stack>
      )}

      {htmlLink && (
        <Stack {...STACK_STYLE}>
          <AiOutlineCalendar color={"#303030"} fontSize="1.5em" />
          <Link href={htmlLink} isExternal>
            More Information <FiExternalLink style={{ display: "inline" }} />
          </Link>
        </Stack>
      )}
    </Stack>
  )
}

export default EventDetails
