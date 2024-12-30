import React, { createContext, useContext } from 'react';
import { useEffect, useState } from 'react';

interface CharacterType {
  result: {
    properties: {
      birth_year: String;
      created: String;
      edited: String;
      eye_color: String;
      gender: String;
      hair_color: String;
      height: String;
      homeworld: String;
      mass: String;
      name: String;
      skin_color: String;
      url: String;
    };
  };
}

interface CharacterContext {
  characters: CharacterType[];
  isLoading: boolean;
  characterIndex: number;
  increment: Function;
}

const CharactersContext = createContext<CharacterContext | undefined>(undefined);

export const CharactersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [characterIndex, setCharacterIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const increment = (direction: String) => {
    if (direction === 'next') {
      setCharacterIndex(characterIndex + 1);
    } else {
      setCharacterIndex(characterIndex - 1);
    }
  };

  useEffect(() => {
    const logCharacters = async () => {
      setIsLoading(true);
      if (!characters[characterIndex]) {
        const response = await fetch('https://swapi.tech/api/people/' + characterIndex + '/');
        const list = await response.json();
        setCharacters((oldCharacter) => [...oldCharacter, list]);
      }
      setIsLoading(false);
    };

    logCharacters().catch(console.error);
  }, [characterIndex, characters]);

  return (
    <CharactersContext.Provider value={{ characters, isLoading, characterIndex, increment }}>
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
