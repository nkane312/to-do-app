import React, { useRef, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
// import { v4 as uuid } from 'uuid';
import Header from './Header';
import ToDoListItem from './ToDoListItem';
import listItemReducer from './listItemReducer';
import AddToDo from './AddToDo';
import ClearToDo from './ClearToDo';

type ToDoItem = {id: string, toDoItem: string, itemStatus: boolean}

function App() {

  // const [listState, setListState] = useState<Array<ToDoItem>>([]);

  const [listItems, dispatch] = useReducer(listItemReducer, []);

  const inputRef = useRef<HTMLInputElement>(null);
  
  function handleAddTask() {
    if (inputRef.current?.value) {
        dispatch({
          type: 'added',
          text: inputRef.current?.value,
          listItem: {id: '', toDoItem: '', itemStatus: false},
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


  // const onSubmit = () => {
  //   if (inputRef.current?.value) {
  //     setListState([...listState, {id: uuid(), toDoItem:inputRef.current?.value, itemStatus: false}]);

  //     inputRef.current.value = '';
  //   }
  // }

  // const clear = () => {
  //   setListState(listState.filter((listItem) => 
  //     listItem.itemStatus === false
  //   ))
  // }

  // const checkboxOnClick = (listItem: ToDoItem) => {
  //   setListState(listState.map((item) => 
  //     item.id === listItem.id ? {...item, itemStatus: !item.itemStatus} : item
  //   ))
  // }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Header />
        <label>Enter todo item
          <input ref={inputRef} type="text"></input>
        </label>
        
        {/* <ul aria-label="To do items">
          {listItems.map(listItem => 
            <li key={listItem.id}><label>{listItem.toDoItem} <input type='checkbox' onChange={() => onChangeTask(listItem)} checked={listItem.itemStatus} /></label></li>
          )}
        </ul> */}

        <ToDoListItem listItems={listItems} onChangeTask={handleChangeTask} />

        <AddToDo onAddTask={handleAddTask} />

        <ClearToDo onClearTask={handleClearTask} />
        
        {/* <button type="submit" onClick={onSubmit}>Add todo</button>

        <button type="button" onClick={clear}>Clear</button> */}
      </header>
    </div>
  );
}

export default App;
