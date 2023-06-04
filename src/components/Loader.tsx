import React from 'react';
import {HStack, Heading, Spinner} from 'native-base';

const Loader = () => {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner />
      <Heading color="primary.500" fontSize="md">
        Loading
      </Heading>
    </HStack>
  );
};

export default Loader;
