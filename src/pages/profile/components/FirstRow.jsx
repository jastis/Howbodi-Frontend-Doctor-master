import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { disconnect } from "../../../services/socket";
import Rating from "./Rating";

export const FirstRow = ({
  userProfile,
  setProfilePicture,
  profilePicture,
}) => {
  const { name, specialty, ratings } = userProfile || {};

  const handleBannerImageUpload = async (event) => {
    const file = event?.target?.files?.[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setProfilePicture({
        imgUrl: reader.result,
        file: event.target.files?.[0],
      });
    };
  };

  const handleLogout = () => {
    disconnect();
    sessionStorage.removeItem("HB#221#");
    sessionStorage.removeItem("timerDetailsObject");
    window.location.href = "/";
  };

  return (
    <Box color="#575757">
      <Stack
        spacing="30px"
        // justifyContent={["center", "center"]}
        alignItems={["center"]}
        direction={["column", "column", "row"]}
      >
        <Box textAlign={["center", "center", "left"]}>
          <label htmlFor="profile">
            <Avatar
              src={profilePicture?.imgUrl}
              size="2xl"
              name={name}
              alt={`Picture of ${name}`}
            >
              <AvatarBadge
                cursor={"pointer"}
                boxSize={"0.7em"}
                bgColor="#5C2BA8"
                border={"none"}
                p={2}
                // onClick={() => uploadBackgroundImage.current.click()}
              >
                <FaPlus color="white" />
              </AvatarBadge>

              <Input
                onChange={handleBannerImageUpload}
                type="file"
                id="profile"
                display="none"
              />
            </Avatar>
          </label>
        </Box>
        <Stack mt="25px" spacing="20px">
          <Heading
            fontFamily={"Gilroy-Bold"}
            fontWeight="bold"
            fontSize="2.2em"
            textAlign={["center", "center", "left"]}
          >
            {name}
          </Heading>
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={["center", "center", "flex-start"]}
          >
            <Text textAlign={["center", "center", "left"]}>{specialty}</Text>
            <Stack direction="row" alignItems="center">
              <Box ml="20px">
                <Rating rating={ratings} />
              </Box>
              <Button
                size="sm"
                my="20px"
                px="40px"
                bg="#5C2BA8"
                color="#fff"
                _hover={{ bg: "#5C2BA8" }}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </Stack>
          </Stack>
          <Divider />
        </Stack>
      </Stack>
    </Box>
  );
};
