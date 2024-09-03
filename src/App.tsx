import { useRef, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header';
import ToDoListItem from './ToDoListItem';
import listItemReducer from './listItemReducer';

import Button from './Button';
import { useAPI } from './context/CharacterAPI';

type ToDoItem = { id: string; toDoItem: string; itemStatus: boolean };

function App() {
  const [listItems, dispatch] = useReducer(listItemReducer, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const { chIndex, increment } = useAPI();

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

        {chIndex > 1 ? (
          <Button
            task={{
              taskFunction: () => increment('prev'),
              text: 'Previous Character',
              buttonType: 'button',
            }}
          />
        ) : null}

        <Button
          task={{
            taskFunction: () => increment('next'),
            text: 'Next Character',
            buttonType: 'button',
          }}
        />
      </header>
    </div>
  );
}

export default App;
