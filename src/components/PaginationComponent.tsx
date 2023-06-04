import {HStack, Text} from 'native-base';
import React, {FunctionComponent} from 'react';
import {TouchableOpacity} from 'react-native';

interface PaginationComponentType {
  startIndex: number;
  endIndex: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
}

const PaginationComponent: FunctionComponent<PaginationComponentType> = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  handlePageChange,
}) => {
  const handleBackPress = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPress = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
  return (
    <>
      <HStack space={3} justifyContent="space-evenly" marginTop={'4'}>
        <Text>
          {startIndex}-{endIndex} of {totalItems}
        </Text>
        <TouchableOpacity
          onPress={handleBackPress}
          disabled={currentPage === 1}>
          <Text>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextPress}
          disabled={currentPage === totalPages}>
          <Text>{'>'}</Text>
        </TouchableOpacity>
      </HStack>
    </>
  );
};

export default PaginationComponent;
