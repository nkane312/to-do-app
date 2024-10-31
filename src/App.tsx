import { useRef } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header';
import ToDoListItem from './ToDoListItem';

import Button from './Button';
import { useAPI } from './context/CharacterAPI';
import {
  useAddTask,
  useClearTask,
  useCurrentCharacterTodoList,
  useToggleStatusTask,
} from './context/ListItemContext';
import CharacterInfo from './CharacterInfo';

export type ToDoItem = { id: string; toDoItem: string; itemStatus: boolean };

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { characterIndex, increment } = useAPI();
  const currentCharacterTodoList = useCurrentCharacterTodoList();

  const addTask = useAddTask();
  const addTaskClick = () => {
    if (inputRef?.current?.value) {
      addTask(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  const clearTask = useClearTask();
  const clearTaskClick = () => {
    clearTask();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Header />
        <label>
          Enter to-do item
          <input ref={inputRef} type="text"></input>
        </label>

        <CharacterInfo />

        <ToDoListItem listItems={currentCharacterTodoList} onChangeTask={useToggleStatusTask} />

        <Button task={{ taskFunction: addTaskClick, text: 'Add to-do', buttonType: 'submit' }} />

        <Button task={{ taskFunction: clearTaskClick, text: 'Clear', buttonType: 'button' }} />

        {characterIndex > 1 ? (
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
