import React, { useEffect, useState } from "react";
import { Box, Divider, Flex } from "@chakra-ui/react";
import { FirstRow } from "./components/FirstRow";
import { SecondRow } from "./components/SecondRow";
// import { UserProfileContext } from "../../context/UserContext";
import { BankAccount } from "./components/BankAccount";
import { updateDoctor } from "./service/updateDoctor";
import { useSelector } from "react-redux";
import { getDoctorInfo } from "./service";
import { ChangePasswordForm } from "./components/ChangePasswordForm";
import FullPageLoader from "../../components/fullPageLoader";

export const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [doctorInfo, setDoctorInfo] = useState({});
  const doctorId = useSelector((state) => state.auth.docId);
  const [updatePage, setUpdatePage] = useState(false);
  const [getEmail, setEmail] = useState("");
  const [getBio, setBio] = useState("");
  const [getPhoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState({});

  useEffect(() => {
    getDoctorInfo(doctorId, setDoctorInfo).then(() => setPageLoading(false));
  }, [doctorId]);

  useEffect(() => {
    setUpdatePage(true);
  }, [updatePage]);

  useEffect(() => {
    const { profilePicture } = doctorInfo || {};
    if (!profilePicture) return;

    setProfilePicture({ imgUrl: profilePicture });
  }, [doctorInfo]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("specialty", doctorInfo?.specialty);
    formData.append("phoneNumber", getPhoneNumber);
    formData.append("address", getEmail);
    formData.append("bio", getBio);
    formData.append("profilePicture", profilePicture?.file);

    updateDoctor(doctorId, formData, setLoading);
  };

  return pageLoading ? (
    <FullPageLoader />
  ) : (
    <Box
      bg="#F6F4F9"
      color="#575757"
      p={["20px", "20px", "50px"]}
      borderRadius={"10px"}
    >
      <Flex direction={"column"}>
        <Box width="100%">
          <FirstRow
            userProfile={doctorInfo}
            setProfilePicture={setProfilePicture}
            profilePicture={profilePicture}
          />
        </Box>
        <Box mt="20px">
          <SecondRow
            updateData={setUpdatePage}
            loading={loading}
            getBio={getBio}
            getEmail={getEmail}
            getPhoneNumber={getPhoneNumber}
            setEmail={setEmail}
            setPhoneNumber={setPhoneNumber}
            setBio={setBio}
            profilePicture={profilePicture}
            handleUpdate={handleUpdate}
          />
        </Box>
      </Flex>
      <Divider my="20px" />
      <Box>
        <BankAccount />
      </Box>
      <Divider my="20px" />

      <ChangePasswordForm />
    </Box>
  );
};
