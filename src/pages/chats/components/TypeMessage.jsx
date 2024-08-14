import {
  Box,
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { IoClose, IoSend } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { errorNotifier } from "../../../components/NotificationHandler";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const TypeMessage = ({ patient, conversationId, ...props }) => {
  const [file, setFile] = useState();
  const uploadFile = useRef();
  const [message, setMessage] = useState("");
  const doctorId = useSelector((state) => state?.auth?.docId);

  const handleFileUpload = async (event) => {
    const fileObj = event?.target?.files?.[0];
    const fileString = await toBase64(event?.target?.files?.[0]).catch((e) => {
      errorNotifier("Unsupported file format, cannot process file");
      return;
    });
    setFile(fileString);
    setMessage(fileObj.name);
  };

  const clearInput = () => {
    setFile(null);
    setMessage("");
  };

  function sendMessage(e) {
    e.preventDefault();
    if (!message || !patient?.userId._id) {
      return;
    }
    let data = {
      doctorId: doctorId,
      userId: patient?.userId?._id,
      // message:message,
      createdAt: new Date(),
      sender: "Doctors",
    };
    if (!file) {
      data.message = message;
    } else {
      data.file = file;
    }

    props.sendMessage && props.sendMessage(data);

    e.target.reset();
    clearInput();
  }
  return (
    <Box p="10px 20px" bg="#fff" border={"1px solid #EBE1FC"}>
      <form onSubmit={sendMessage}>
        <Flex flexDirection={"flex-end"} width="100%">
          <FormControl>
            <InputGroup>
              <Input
                _placeholder={{ color: "grey" }}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Type message"
                disabled={!!file}
                variant="flushed"
                fontWeight={"bold"}
              />
              {!!file && (
                <InputRightElement>
                  <IconButton
                    onClick={clearInput}
                    variant={"ghost"}
                    icon={<IoClose />}
                  />
                </InputRightElement>
              )}
            </InputGroup>
          </FormControl>
          <Flex alignItems={"center"}>
            <Box mr="20px" cursor={"pointer"}>
              <GrAttachment size="22px" />
              <Box position={"absolute"} top="5" width="30px">
                <input
                  ref={uploadFile}
                  accept="image/jpeg, image/jpg, image/png"
                  onChange={handleFileUpload}
                  type="file"
                  style={{ opacity: "0", width: "30px", fontWeight: "bold" }}
                  cursor={"pointer"}
                />
              </Box>
            </Box>
            <IconButton
              type="submit"
              borderRadius="50%"
              icon={<IoSend color="white" />}
              bg={"#8C78AB"}
              _hover={{ bg: "#8C78AB" }}
            />
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};
