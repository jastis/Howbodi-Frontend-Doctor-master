import { Button, Flex, Stack, Text, Box, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { errorNotifier } from "../../../components/NotificationHandler";

import { addPatientNote } from "../services/addPatientNote";
import RecentNotes from "./RecentNotes";

export default function PatientNoteComponent(props) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const { docId } = useSelector((state) => state.auth);

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      doctorId: props.doctorId,
      userId: props.patientId,
      note,
    };
    if (!note) {
      errorNotifier("Please add a note");
      return;
    }
    addPatientNote(setLoading, payload).then(() => {
      setNote(" ");
      props.close();
    });
  };
  return (
    <Box>
      <form onSubmit={submit}>
        <Stack p={2} spacing={5}>
          <Text> Please write a note for the patient </Text>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            name="note"
          />

          <Flex justifyContent={"end"} gap="5px">
            <Button
              size="sm"
              w="80px"
              onClick={props.close}
              variant="ghost"
              // textColor=''
            >
              {" "}
              Cancel{" "}
            </Button>
            <Button
              size="sm"
              w="80px"
              isLoading={loading}
              type="submit"
              _hover={{ background: "#5C2BA8" }}
              bg={"#5C2BA8"}
              textColor="white"
            >
              {" "}
              Save{" "}
            </Button>
          </Flex>
        </Stack>
      </form>
      <RecentNotes
        // displayChat={props.displayChatt}
        patientId={props.patientId}
        close={props.close}
      />
    </Box>
  );
}
