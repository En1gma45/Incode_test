import React, {FunctionComponent} from 'react';
import {HStack, IconButton, FavouriteIcon, Text} from 'native-base';
import {useAppDispatch} from '../redux/hooks/redux';
import {characterSlice} from '../redux/slices/CharacterSlice';
import {CharacterType} from '../types/ApiResponseTypes';

interface TableItemPropsType {
  data: CharacterType;
}

const TableItem: FunctionComponent<TableItemPropsType> = ({data}) => {
  const dispatch = useAppDispatch();

  const addToFavHandler = () => {
    dispatch(characterSlice.actions.setCharacterInFav(data.name));
  };
  const removeFromFavHandler = () => {
    dispatch(characterSlice.actions.removeCharacterFromFav(data.name));
  };
  const handlePress = () => {
    data.inFavorite ? removeFromFavHandler() : addToFavHandler();
  };
  return (
    <HStack justifyContent={'space-between'} alignItems={'center'}>
      <IconButton
        width={'10%'}
        onPress={handlePress}
        icon={
          <FavouriteIcon color={data.inFavorite ? 'error.600' : 'muted.300'} />
        }
      />
      <Text width={'35%'}>{data.name}</Text>
      <Text textAlign={'center'} width={'20%'}>
        {data.birth_year}
      </Text>
      <Text textAlign={'center'} width={'25%'}>
        {data.gender}
      </Text>
    </HStack>
  );
};

export default TableItem;
