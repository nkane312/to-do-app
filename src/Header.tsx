import { useAPI } from './context/CharacterAPI';

const Header = () => {
  const { characters, isLoading, chIndex } = useAPI();

  return <h1>{!isLoading ? characters[chIndex - 1].name : 'Loading...'}'s To Do List</h1>;
};

export default Header;
