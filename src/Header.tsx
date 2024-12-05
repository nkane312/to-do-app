import { useAPI } from './context/CharacterAPI';

const Header = () => {
  const { characters, isLoading, characterIndex } = useAPI();
  const characterName = characters[characterIndex - 1]?.name ?? '¯\\_(ツ)_/¯';

  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold text-slate-950 py-2 ml-5">
        {!isLoading ? characterName : 'Loading...'}
      </h1>
    </div>
  );
};

export default Header;
