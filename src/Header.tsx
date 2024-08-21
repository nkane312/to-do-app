import { useAPI } from './context/MoviesProvider';

const Header = () => {
  const { data, isLoading } = useAPI();

  return <h1>{!isLoading ? data.name : 'Loading...'}'s To Do List</h1>;
};

export default Header;
