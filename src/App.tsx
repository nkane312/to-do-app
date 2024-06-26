import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { v4 as uuid } from 'uuid';
import Header from './Header';

type ToDoItem = {id: string, toDoItem: string, itemStatus: boolean}

function App() {

  const [listState, setListState] = useState<Array<ToDoItem>>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  
  const onSubmit = () => {
    if (inputRef.current?.value) {
      setListState([...listState, {id: uuid(), toDoItem:inputRef.current?.value, itemStatus: false}]);

      inputRef.current.value = '';
    }
  }

  const clear = () => {
    setListState(listState.filter((listItem) => 
      listItem.itemStatus === false
    ))
  }

  const checkboxOnClick = (listItem: ToDoItem) => {
    setListState(listState.map((item) => 
      item.id === listItem.id ? {...item, itemStatus: !item.itemStatus} : item
    ))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Header />
        <label>Enter todo item
          <input ref={inputRef} type="text"></input>
        </label>
        <ul aria-label="To do items">
          {listState.map(listItem => 
            <li key={listItem.id}><label>{listItem.toDoItem} <input type='checkbox' onChange={() => checkboxOnClick(listItem)} checked={listItem.itemStatus} /></label></li>
          )}
        </ul>

        <button type="submit" onClick={onSubmit}>Add todo</button>

        <button type="button" onClick={clear}>Clear</button>
      </header>
    </div>
  );
}

export default App;
