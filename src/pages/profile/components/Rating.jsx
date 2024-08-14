import { Box, HStack } from '@chakra-ui/react';
import { FaStar, FaRegStar } from 'react-icons/fa';
const Rating = ({ rating, cursor }) => {
  return (
    <HStack>
      {[...Array(5)].map((_, index) => (
        <Box key={index} cursor='pointer'>
          {rating > index ? <FaStar color='#FBD1A2' /> : <FaRegStar />}
        </Box>
      ))}
    </HStack>
  );
};

export default Rating;
