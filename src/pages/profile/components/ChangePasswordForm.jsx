import {
  Stack,
  Input,
  Box,
  Text,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
// import { UpdateProfileHook } from "./UpdateProfileHook";
import { useEffect, useState } from "react";
import { updatePassword } from "../service";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const ChangePasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const formTitleStyle = {
    fontSize: ".9em",
  };
  const formInputStyle = { height: "50px", bg: "#fff" };

  const updateInfo = () => {
    setLoading(true);
    const payload = {
      oldPassword,
      newPassword,
    };
    updatePassword(payload, setLoading);
  };

  //check validation
  useEffect(() => {
    const isNotValid =
      newPassword !== confirmNewPassword || !newPassword || !confirmNewPassword;
    if (isNotValid) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [newPassword, confirmNewPassword]);

  return (
    <Stack direction="row" justifyContent={"space-between"}>
      <Box mt="20px" flex="1" />
      <Stack flex="4" spacing="30px">
        <Stack>
          <Text fontSize="2em" fontWeight="bold">
            Change Password
          </Text>
        </Stack>

        <Stack direction="column">
          <Text {...formTitleStyle}>Old Password</Text>

          <InputGroup size="md">
            <Input
              pr="4.5rem"
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
              type={showOldPassword ? "text" : "password"}
              {...formInputStyle}
            />

            <InputRightElement width="4.5rem">
              <Button
                bg="transparent"
                _hover={{ background: "transparent" }}
                _focus={{ background: "transparent" }}
                h="1.75rem"
                size="sm"
                onClick={() => setShowOldPassword((prev) => !prev)}
              >
                {showOldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Box>
            <Text {...formTitleStyle}>New Password</Text>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type={showNewPassword ? "text" : "password"}
                {...formInputStyle}
              />

              <InputRightElement width="4.5rem">
                <Button
                  bg="transparent"
                  _hover={{ background: "transparent" }}
                  _focus={{ background: "transparent" }}
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Stack>

        <Stack>
          <Text {...formTitleStyle}>Confirm New Password</Text>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              value={confirmNewPassword}
              type={showConfirmNewPassword ? "text" : "password"}
              {...formInputStyle}
            />

            <InputRightElement width="4.5rem">
              <Button
                bg="transparent"
                _hover={{ background: "transparent" }}
                _focus={{ background: "transparent" }}
                h="1.75rem"
                size="sm"
                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
              >
                {showConfirmNewPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Stack>
        <Stack>
          <Button
            isLoading={loading}
            alignSelf={"flex-end"}
            _hover={{ bg: "#5C2BA8" }}
            bg="#5C2BA8"
            color="#fff"
            onClick={updateInfo}
            disabled={disabled}
          >
            Save Changes
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
