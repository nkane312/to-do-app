import { useRef, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header';
import ToDoListItem from './ToDoListItem';
import listItemReducer from './listItemReducer';

import Button from './Button';
import { MoviesProvider } from './context/MoviesProvider';

type ToDoItem = { id: string; toDoItem: string; itemStatus: boolean };

function App() {
  const [listItems, dispatch] = useReducer(listItemReducer, []);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleAddTask() {
    if (inputRef.current?.value) {
      dispatch({
        type: 'added',
        text: inputRef.current?.value,
        listItem: { id: '', toDoItem: '', itemStatus: false },
      });
      inputRef.current.value = '';
    }
  }

  function handleChangeTask(listItem: ToDoItem) {
    dispatch({
      type: 'changed',
      text: '',
      listItem: listItem,
    });
  }

  function handleClearTask(listItem: ToDoItem) {
    dispatch({
      type: 'clear',
      text: '',
      listItem: listItem,
    });
  }

  return (
    <MoviesProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Header />
          <label>
            Enter to-do item
            <input ref={inputRef} type="text"></input>
          </label>

          <ToDoListItem listItems={listItems} onChangeTask={handleChangeTask} />

          <Button task={{ taskFunction: handleAddTask, text: 'Add to-do', buttonType: 'submit' }} />

          <Button task={{ taskFunction: handleClearTask, text: 'Clear', buttonType: 'button' }} />
        </header>
      </div>
    </MoviesProvider>
  );
}

export default App;
