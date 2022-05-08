import React, { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import MovieCards from "./MovieCards";
import { 
  FormControl,
  Input,
  Icon,
  Flex,
  Button
} from "@chakra-ui/react";


const SearchMovieCards = ({ token, addedMovieIds, addMovieButtonClick }) => {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);

  const onSearchButtonClick = () => {
    if (keyword) {
      fetch('/keyword-search', {
        method: 'POST',
        body: JSON.stringify({ keyword: keyword }),
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(data => {
        setMovies(data)
      });
    }
  }

  const onInputChange = (evt) => {
    evt.preventDefault();
    const keyword = evt.target.value;
    setKeyword(keyword);
  }

  return (
    <>
      <FormControl htmlFor="keyword">Search</FormControl>
      <Flex>
        <Input value={keyword} onChange={onInputChange} id="keyword" type="text" placeholder="Keyword" size="sm" />
        <Button onClick={onSearchButtonClick} colorScheme='blue' size="sm"><Icon as={SearchIcon} /></Button>
      </Flex>
      <FormControl />
      <MovieCards movies={movies} addedMovieIds={addedMovieIds} addMovieButtonClick={addMovieButtonClick} />
    </>

  )
};


export default SearchMovieCards;