import React, { createContext, useContext } from 'react';
import { useEffect, useState } from 'react';

interface CharacterType {
  birth_year: String;
  created: String;
  edited: String;
  eye_color: String;
  films: String[];
  gender: String;
  hair_color: String;
  height: String;
  homeworld: String;
  mass: String;
  name: String;
  skin_color: String;
  species: String[];
  starships: String[];
  url: String;
  vehicles: String[];
}

interface CharacterContext {
  characters: CharacterType[];
  isLoading: boolean;
  chIndex: number;
  increment: Function;
}

const CharactersContext = createContext<CharacterContext | undefined>(undefined);

export const CharactersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [chIndex, setChIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const increment = (direction: String) => {
    if (direction === 'next') {
      setChIndex(chIndex + 1);
    } else {
      setChIndex(chIndex - 1);
    }
  };

  useEffect(() => {
    const logCharacters = async () => {
      setIsLoading(true);
      const response = await fetch('https://swapi.dev/api/people/' + chIndex + '/');
      const list = await response.json();
      setCharacters((oldCharacter) => [...oldCharacter, list]);
      setIsLoading(false);
    };

    logCharacters().catch(console.error);
  }, [chIndex]);

  return (
    <CharactersContext.Provider value={{ characters, isLoading, chIndex, increment }}>
      {children}
    </CharactersContext.Provider>
  );
};

export function useAPI() {
  const context = useContext(CharactersContext);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
}
