import { useAPI } from './context/CharacterAPI';

const Header = () => {
  const { characters, isLoading, characterIndex } = useAPI();

  return (
    <h1 data-testid="h1">
      {!isLoading ? characters[characterIndex - 1].name : 'Loading...'}'s To Do List
    </h1>
  );
};

export default Header;
