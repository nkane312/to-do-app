import React, { createContext, useContext } from 'react';
import { useEffect, useState } from 'react';

interface DataContextType {
  data: {
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
  };
  isLoading: boolean;
}

const MoviesContext = createContext<DataContextType>({
  data: {
    birth_year: '',
    created: '',
    edited: '',
    eye_color: '',
    films: [],
    gender: '',
    hair_color: '',
    height: '',
    homeworld: '',
    mass: '',
    name: '',
    skin_color: '',
    species: [],
    starships: [],
    url: '',
    vehicles: [],
  },
  isLoading: true,
});

export const MoviesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState({
    birth_year: '',
    created: '',
    edited: '',
    eye_color: '',
    films: [],
    gender: '',
    hair_color: '',
    height: '',
    homeworld: '',
    mass: '',
    name: '',
    skin_color: '',
    species: [],
    starships: [],
    url: '',
    vehicles: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const logMovies = async () => {
      setIsLoading(true);
      const response = await fetch('https://swapi.dev/api/people/1/');
      const movies = await response.json();
      setData(movies);
      setIsLoading(false);
    };

    logMovies().catch(console.error);
  }, []);

  return <MoviesContext.Provider value={{ data, isLoading }}>{children}</MoviesContext.Provider>;
};

export function useAPI() {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
}
