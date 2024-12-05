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
    <div className="h-screen bg-gray-800">
      <header className="flex bg-gray-200 justify-center items-center text-2xl text-white h-1/6 py-2">
        <div className="flex-none self-start">
          <img src={logo} className="w-36" alt="logo" />
        </div>
        <Header />
      </header>
      <main className="flex justify-center text-2xl text-white flex-col p-3 h-4/5">
        <div className="flex gap-2 pb-5 flex-col justify-center w-4/5 m-auto">
          <ToDoListItem listItems={currentCharacterTodoList} onChangeTask={useToggleStatusTask} />

          <div className="self-start">
            <Button task={{ taskFunction: clearTaskClick, text: 'Clear', buttonType: 'button' }} />
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex-none">
              <label>
                Enter item:
                <input
                  ref={inputRef}
                  type="text"
                  className="text-black ml-3 px-2 inline-block"
                ></input>
              </label>
            </div>

            <div className="flex-1">
              <Button task={{ taskFunction: addTaskClick, text: 'Add', buttonType: 'submit' }} />
            </div>
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
