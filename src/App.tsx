import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { v4 as uuid } from 'uuid';

type ToDoItem = {id: string, toDoItem: string, itemStatus: boolean}

function App() {

  const [listState, setListState] = useState<Array<ToDoItem>>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  
  const onSubmit = () => {
    console.log('********************', inputRef.current?.value)
    if (inputRef.current?.value) {
      setListState([{id: uuid(), toDoItem:inputRef.current?.value, itemStatus: false}]);
    }
  }

  const checkboxOnClick = (listItem: ToDoItem) => {
    setListState([{...listItem, itemStatus: !listItem.itemStatus}])
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <label>Enter todo item
          <input ref={inputRef} type="text"></input>
        </label>
        <ul aria-label="To do items">
          {listState.map(listItem => 
            <li key={listItem.id}><label>{listItem.toDoItem} <input type='checkbox' onClick={() => checkboxOnClick(listItem)} checked={listItem.itemStatus} /></label></li>
          )}
        </ul>

        <button type="submit" onClick={onSubmit}>Add todo</button>
      </header>
    </div>
  );
}


export default App;
