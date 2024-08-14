import { Flex, Text } from "@chakra-ui/react"
import CustomModal from "../../../components/CustomModal"
// import AddActivityForm from "../components/AddActivityForm"
import { getDate, isSameDay, parseISO } from "date-fns"
import EventDetails from "./EventDetails"

function CustomRender(date, schedules, getBrandColor) {
  return (
    <Flex
      direction="column"
      maxHeight="100%"
      w="100%"
      p={2}
      align="start"
      color="#757575"
      h="inherit"
    >
      <Text fontSize="1.4em" p="15px" textAlign="center">
        {getDate(date)}
      </Text>
      {/* <CustomModal
        btnTitle={getDate(date)}
        title="Add Activity"
        buttonProps={{
          pl: 4,
          fontSize: "1.3rem",
          mb: 2,
          color: getBrandColor,
          bg: "transparent",
          fontWeight: "normal",
          pointerschedules: "all",
          _hover: {
            bg: "transparent",
          },
        }}
      >
        <AddActivityForm />
      </CustomModal> */}
      {schedules?.length > 0 &&
        schedules?.map((calEvent, i) => {
          return isSameDay(parseISO(calEvent?.end?.dateTime), date) ? (
            <CustomModal
              key={calEvent?._id}
              title="Event"
              btnTitle={
                <>
                  <Text
                    color={getBrandColor}
                    maxW="6rem"
                    fontWeight="bold"
                    isTruncated={true}
                  >
                    {calEvent?.startDate}
                  </Text>
                </>
              }
              buttonProps={{
                maxWidth: "100%",
                size: "xs",
                borderRadius: "full",
                // bg: `${getBrandColor}07`,
                bg: "red",
                py: 1,
                px: 2,
                mb: 1,
                fontWeight: "normal",
                pointerschedules: "all",
                _hover: {
                  bg: "transparent",
                },
              }}
            >
              <EventDetails event={calEvent} />
            </CustomModal>
          ) : null
        })}
    </Flex>
  )
}

export default CustomRender
