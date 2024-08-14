import {
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

export default function PatientProfileComponent({ user }) {
  return (
    <Tabs p={5}>
      <TabList>
        <Tab _focus={{ border: "none", borderBottom: "1px solid " }}>
          Summary
        </Tab>
        <Tab _focus={{ border: "none", borderBottom: "1px solid " }}>
          More Info
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SimpleGrid spacing={3} columns={{ base: 1, md: 2 }}>
            <FormControl>
              <FormLabel> Email</FormLabel>
              <Input disabled value={user?.email || ""} />
            </FormControl>
            <FormControl>
              <FormLabel> Phone</FormLabel>
              <Input disabled value={user?.phoneNumber || ""} />
            </FormControl>
            <FormControl>
              <FormLabel> Date Of Birth</FormLabel>
              <Input disabled value={user?.DOB || ""} />
            </FormControl>
            <FormControl>
              <FormLabel> Gender</FormLabel>
              <Input disabled value={user?.gender || ""} />
            </FormControl>
            <FormControl>
              <FormLabel> Blood Group</FormLabel>
              <Input disabled value={user?.bloodGroup || ""} />
            </FormControl>
            <FormControl>
              <FormLabel> Genotype</FormLabel>
              <Input disabled value={user?.genotype || ""} />
            </FormControl>
          </SimpleGrid>
        </TabPanel>
        <TabPanel>
          <SimpleGrid spacing={3} columns={{ base: 1 }}>
            <FormControl>
              <FormLabel> Disabilities</FormLabel>
              <Input disabled value={user?.disabilities || ""} />
            </FormControl>
            <FormControl>
              <FormLabel> Allergies</FormLabel>
              <Input disabled value={user?.allergies?.join(" ,") || ""} />
            </FormControl>
          </SimpleGrid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
