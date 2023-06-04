import React, {FunctionComponent} from 'react';
import {CharacterType} from '../types/ApiResponseTypes';
import {Box, FlatList, HStack, Text} from 'native-base';
import TableItem from './TableItem';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/NavigationTypes';

interface AllCharacterTablePropsType {
  data: CharacterType[];
}

const ListHeader = () => {
  return (
    <HStack justifyContent={'space-between'} alignItems={'center'}>
      <Box width={'10%'}> </Box>
      <Text paddingLeft={'4'} width={'35%'}>
        Name
      </Text>
      <Text textAlign={'center'} width={'20%'}>
        Birth Year
      </Text>
      <Text textAlign={'center'} width={'25%'}>
        Gender
      </Text>
    </HStack>
  );
};

const AllCharacterTable: FunctionComponent<AllCharacterTablePropsType> = ({
  data,
}) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCharacterPress = (item: CharacterType) => {
    navigate('DetailedCharInfoScreen', {characterName: item.name});
  };

  return (
    <Box width={'95%'} height={'100%'} paddingTop={'1'}>
      <FlatList
        data={data}
        ListHeaderComponent={<ListHeader />}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => handleCharacterPress(item)}>
              <Box
                key={item.created}
                marginTop={'4'}
                borderTopWidth={'1'}
                borderTopColor={'gray.300'}
                alignContent={'center'}>
                <TableItem data={item} />
              </Box>
            </TouchableOpacity>
          );
        }}
      />
    </Box>
  );
};

export default AllCharacterTable;
