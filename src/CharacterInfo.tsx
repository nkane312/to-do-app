import { useAPI } from './context/CharacterAPI';

const CharacterInfo = () => {
  const { characters, isLoading, characterIndex } = useAPI();
  const character = characters[characterIndex - 1]?.result.properties ?? '¯\\_(ツ)_/¯';

  return (
    <div className="flex justify-start items-start flex-col bg-slate-900 text-white my-2 rounded-xl">
      <h2 className="text-2xl self-center font-bold w-full text-center text-slate-950 bg-gray-200 p-2 rounded-xl">
        Character Info
      </h2>
      {!isLoading ? (
        <div className="flex min-w-0 gap-x-4 flex-col items-start p-4 w-full">
          <p>Birth Year: {character.birth_year}</p>
          <p>Mass: {character.mass}</p>
          <p>Height: {character.height}</p>
          <p>Skin Color: {character.skin_color}</p>
          <p>Eye Color: {character.eye_color}</p>
          <p>Hair Color: {character.hair_color}</p>
        </div>
      ) : (
        <div className="flex min-w-0 gap-x-4 flex-col items-start">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default CharacterInfo;
