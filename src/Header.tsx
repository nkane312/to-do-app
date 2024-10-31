import { useAPI } from './context/CharacterAPI';

const Header = () => {
  const { characters, isLoading, characterIndex } = useAPI();
  const characterName = characters[characterIndex - 1]?.name ?? '¯\\_(ツ)_/¯';

  return (
    <h1 className="text-3xl font-bold underline py-2">
      {!isLoading ? characterName : 'Loading...'}'s To Do List
    </h1>
  );
};

export default Header;
