
type listItems = Array<ToDoItem>;
type ToDoItem = {id: string, toDoItem: string, itemStatus: boolean};

const ToDoListItem = ({listItems, onChangeTask}: {
  listItems: listItems;
  onChangeTask: Function;
}) => {

  console.log(listItems);
    // const [listState, setListState] = useState<Array<ToDoItem>>([]);

    // const checkboxOnClick = (listItem: ToDoItem) => {
    //     setListState(listState.map((item) => 
    //       item.id === listItem.id ? {...item, itemStatus: !item.itemStatus} : item
    //     ))
    //   }

    // listItems.map(listItem => 
    //     <li key={listItem.id}><label>{listItem.toDoItem} <input type='checkbox' onChange={() => onChangeTask(listItem)} checked={listItem.itemStatus} /></label></li>
    //   )}

  return (
    <ul>
      {listItems.map(listItem => 
        <li key={listItem.id}><label>{listItem.toDoItem} <input type='checkbox' onChange={() => onChangeTask(listItem)} checked={listItem.itemStatus} /></label></li>
      )}
    </ul>
    
    // `${listItems.map(listItem => 
    //     <li key={listItem.id}><label>{listItem.toDoItem} <input type='checkbox' onChange={() => onChangeTask(listItem)} checked={listItem.itemStatus} /></label></li>
    //   )}`
  );
}

export default ToDoListItem;