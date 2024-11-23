import { useRef } from 'react';
import logo from './89_starwars.svg';
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
    <div className="App h-screen">
      <header className="flex bg-gray-200 justify-center items-center text-2xl text-white flex-col h-1/5 pt-10">
        <img src={logo} className="App-logo w-48" alt="logo" />
        <Header />
      </header>
      <main className="flex bg-gray-800 justify-center text-2xl text-white flex-col p-3 h-4/5">
        <div className="flex gap-2 pb-5 flex-col justify-center w-4/5 m-auto">
          <ToDoListItem listItems={currentCharacterTodoList} onChangeTask={useToggleStatusTask} />

          <div className="self-end">
            <Button task={{ taskFunction: clearTaskClick, text: 'Clear', buttonType: 'button' }} />
          </div>

          <div className="flex gap-4 justify-end items-center">
            <label>
              Enter item:
              <input
                ref={inputRef}
                type="text"
                className="text-black ml-3 px-2 inline-block"
              ></input>
            </label>

            <Button task={{ taskFunction: addTaskClick, text: 'Add', buttonType: 'submit' }} />
          </div>
        </div>

        <div className="flex gap-2 pb-5 flex-col justify-center w-4/5 m-auto">
          <CharacterInfo />
          <div className="flex gap-4 justify-center">
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
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
