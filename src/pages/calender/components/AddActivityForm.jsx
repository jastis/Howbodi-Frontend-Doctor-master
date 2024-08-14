import { useState, useRef } from "react";
import { Input, Flex, Box, Textarea, Button, Text } from "@chakra-ui/react";
import { IoMdTime } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
// import { createActivity } from "../services"
// import {
//   errorNotifier,
//   successNotifier,
// } from "../../../components/NotificationHandler"
import { useSelector } from "react-redux";

const AddActivityForm = ({ onClose, refresh, staffId, companyCode }) => {
  const getBrandColor = useSelector((state) => state.auth?.brandColor);
  const [formValues, setFormValues] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  // const { title, date, description } = formValues

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // const handleSubmit = e => {
  //   e.preventDefault()

  //   if (!formRef.current.reportValidity()) return

  //   setLoading(true)
  //   createActivity({ staffId, companyCode, title, date, description })
  //     .then(response => {
  //       successNotifier(response.data.result.message)
  //       refresh()
  //       onClose()
  //     })
  //     .catch(error => errorNotifier())
  //     .finally(() => setLoading(false))
  // }

  return (
    <form
      ref={formRef}
      // onSubmit={handleSubmit}
    >
      <Flex direction="column">
        <Input
          name="title"
          mb={8}
          type="text"
          variant="flushed"
          placeholder="Add Title"
          value={formValues.title}
          _placeholder={{ fontSize: "2rem", color: "gray", fontWeight: "200" }}
          onChange={handleChange}
          required
        />
        <Flex mb={8} alignItems="center">
          <Box color="secondary" mr={4}>
            <IoMdTime size="1.5rem" color="inherit" />
          </Box>
          <Input
            name="date"
            value={formValues.date}
            type="datetime-local"
            onChange={handleChange}
            required
          />
        </Flex>
        <Flex direction="column" mb={8}>
          <Flex flexGrow="1">
            <Box color="secondary" mr={4} opacity="0">
              <HiMenuAlt2 size="1.5rem" color="inherit" />
            </Box>
            <Text fontSize=".7rem" color="#959595" fontWeight="bold">
              Description
            </Text>
          </Flex>
          <Flex flexGrow="1">
            <Box color="secondary" mr={4}>
              <HiMenuAlt2 size="1.5rem" color="inherit" />
            </Box>
            <Textarea
              name="description"
              value={formValues.description}
              flexGrow="1"
              variant="filled"
              resize="false"
              onChange={handleChange}
              required
            />
          </Flex>
        </Flex>
        <Button
          type="submit"
          isLoading={loading}
          color="white"
          bg={getBrandColor}
          _hover={{ bg: getBrandColor }}
          alignSelf="flex-end"
        >
          Save
        </Button>
      </Flex>
    </form>
  );
};

export default AddActivityForm;