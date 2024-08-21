type listItems = Array<ToDoItem>;
type ToDoItem = { id: string; toDoItem: string; itemStatus: boolean };

const ToDoListItem = ({
  listItems,
  onChangeTask,
}: {
  listItems: listItems;
  onChangeTask: Function;
}) => {
  return (
    <ul aria-label="To do items">
      {listItems.map((listItem) => (
        <li key={listItem.id}>
          <label>
            {listItem.toDoItem}{' '}
            <input
              type="checkbox"
              onChange={() => onChangeTask(listItem)}
              checked={listItem.itemStatus}
            />
          </label>
        </li>
      ))}
    </ul>
  );
};

export default ToDoListItem;
