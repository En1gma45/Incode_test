import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks/redux';
import {fetchAllCharacters} from '../redux/actions/characterActions';
import {
  Box,
  HStack,
  Text,
  Button,
  Center,
  Input,
  VStack,
  SearchIcon,
  IconButton,
} from 'native-base';
import {characterSlice} from '../redux/slices/CharacterSlice';
import AllCharacterTable from '../components/AllCharacterTable';
import Loader from '../components/Loader';
import PaginationComponent from '../components/PaginationComponent';
import {CharacterType} from '../types/ApiResponseTypes';

const MainScreen = () => {
  const dispatch = useAppDispatch();
  const {
    characters,
    totalPages,
    currentPage,
    totalCharacters,
    isLoading,
    error,
  } = useAppSelector(state => state.CharacterReducer);
  const [query, setQuery] = useState('');
  const [displayedCharacters, setDisplayedCharacters] = useState<
    Array<CharacterType>
  >([]);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  useEffect(() => {
    dispatch(fetchAllCharacters());
  }, [dispatch]);

  useEffect(() => {
    if (query && query.trim().length > 0) {
      const lowerCaseQuery = query.trim().toLowerCase();
      const filteredCharacters = characters.filter(({name}) =>
        name.toLowerCase().includes(lowerCaseQuery),
      );
      setDisplayedCharacters(filteredCharacters);
    } else {
      setDisplayedCharacters(characters.slice(startIndex, endIndex));
    }
  }, [query, characters, startIndex, endIndex]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      dispatch(characterSlice.actions.currentPageChanging(page));
    }
  };
  return (
    <SafeAreaView>
      {isLoading && (
        <Center marginTop={'50%'}>
          <Loader />
        </Center>
      )}
      {!isLoading && !error && (
        <Box alignSelf="center" minWidth={'80%'} overflow={'scroll'}>
          <HStack marginTop={'1'} space={3} justifyContent="space-between">
            <Text fontSize={'2xl'}>Fans</Text>
            <Button
              onPress={() =>
                dispatch(characterSlice.actions.removeAllCharFromFav())
              }
              size={'md'}
              variant={'outline'}
              colorScheme={'secondary'}>
              Clear Fans
            </Button>
          </HStack>
          <HStack marginTop={'2'} space={3} justifyContent="space-between">
            <Box
              width={'30%'}
              paddingLeft={'4'}
              alignSelf={'flex-start'}
              borderWidth={'1'}
              borderColor={'white'}
              borderRadius={'8'}
              shadow={'7'}
              backgroundColor={'white'}>
              <Text fontSize={'2xl'}>
                {
                  characters.filter(
                    item => item.gender === 'male' && item.inFavorite,
                  ).length
                }
              </Text>
              Male Fans
            </Box>
            <Box
              width={'30%'}
              paddingLeft={'4'}
              alignSelf={'flex-start'}
              borderWidth={'1'}
              borderColor={'white'}
              borderRadius={'8'}
              shadow={'7'}
              backgroundColor={'white'}>
              <Text fontSize={'2xl'}>
                {
                  characters.filter(
                    item => item.gender === 'female' && item.inFavorite,
                  ).length
                }
              </Text>
              Female Fans
            </Box>
            <Box
              width={'30%'}
              paddingLeft={'4'}
              alignSelf={'flex-start'}
              borderWidth={'1'}
              borderColor={'white'}
              borderRadius={'8'}
              shadow={'7'}
              backgroundColor={'white'}>
              <Text fontSize={'2xl'}>
                {
                  characters.filter(
                    item =>
                      item.gender !== 'male' &&
                      item.gender !== 'female' &&
                      item.inFavorite,
                  ).length
                }
              </Text>
              Others
            </Box>
          </HStack>
          <Box marginTop={2}>
            <VStack w="100%" space={5} alignSelf="center">
              <Input
                onChangeText={text => setQuery(text)}
                value={query}
                placeholder="Search"
                width="100%"
                borderRadius="4"
                py="3"
                px="1"
                fontSize="14"
                InputLeftElement={
                  <IconButton
                    onPress={() => {}}
                    m="2"
                    ml="3"
                    size="6"
                    color="black"
                    icon={<SearchIcon color={'black'} />}
                  />
                }
              />
            </VStack>
          </Box>
          <Box height={'65%'}>
            <AllCharacterTable data={displayedCharacters} />
          </Box>
          <Center>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalCharacters}
              startIndex={startIndex + 1}
              endIndex={endIndex}
              handlePageChange={handlePageChange}
            />
          </Center>
        </Box>
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
