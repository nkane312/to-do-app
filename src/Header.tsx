import React, { useEffect, useState } from 'react';

const Header = () => {
    const [nameState, setNameState] = useState<String>('');

    async function logMovies() {
        const response = await fetch("https://swapi.dev/api/people/1/");
        const movies = await response.json();
        setNameState(movies.name);
      }
    
      useEffect(() => {
        logMovies()
      }, [])

      return (
        <h1>{nameState}'s To Do List</h1>
      )
}

export default Header;