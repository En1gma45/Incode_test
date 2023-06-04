import {SafeAreaView} from 'react-native';
import React, {FunctionComponent} from 'react';
import {HStack, Text, IconButton, Box, FavouriteIcon} from 'native-base';
import {useAppDispatch, useAppSelector} from '../redux/hooks/redux';
import {characterSlice} from '../redux/slices/CharacterSlice';

type DetailedCharScreenProps = {
  route: {
    params: {
      characterName: string;
    };
  };
};

const DetailedCharScreen: FunctionComponent<DetailedCharScreenProps> = ({
  route,
}) => {
  const {characterName} = route.params;

  const dispatch = useAppDispatch();
  const selectedCharacter = useAppSelector(
    state => state.CharacterReducer,
  ).characters.find(item => item.name === characterName);

  const addToFavHandler = () => {
    dispatch(characterSlice.actions.setCharacterInFav(characterName));
  };
  const removeFromFavHandler = () => {
    dispatch(characterSlice.actions.removeCharacterFromFav(characterName));
  };
  const handlePress = () => {
    selectedCharacter!.inFavorite ? removeFromFavHandler() : addToFavHandler();
  };

  return (
    <SafeAreaView>
      {selectedCharacter && (
        <Box margin={'4'}>
          <HStack marginBottom={'8'} justifyContent={'space-between'}>
            <Text fontSize={'3xl'}>{selectedCharacter!.name}</Text>
            <IconButton
              marginRight={'8'}
              onPress={handlePress}
              icon={
                <FavouriteIcon
                  color={
                    selectedCharacter!.inFavorite ? 'error.600' : 'muted.300'
                  }
                />
              }
            />
          </HStack>
          <Text height={'16'} fontSize={'xl'}>
            Birth year: {selectedCharacter!.birth_year}
          </Text>
          <Text height={'16'} fontSize={'xl'}>
            Gender: {selectedCharacter!.gender}
          </Text>
          <Text height={'16'} fontSize={'xl'}>
            Homeworld: {selectedCharacter!.homeworld}
          </Text>
          <Text height={'16'} fontSize={'xl'}>
            Height: {selectedCharacter!.height}
          </Text>
          <Text height={'16'} fontSize={'xl'}>
            Mass: {selectedCharacter!.mass}
          </Text>
          <Text height={'16'} fontSize={'xl'}>
            Hair Color: {selectedCharacter!.hair_color}
          </Text>
          <Text height={'16'} fontSize={'xl'}>
            Created at: {selectedCharacter!.created}
          </Text>
          <Text height={'16'} fontSize={'xl'}>
            Edited at: {selectedCharacter!.edited}
          </Text>
        </Box>
      )}
    </SafeAreaView>
  );
};

export default DetailedCharScreen;
