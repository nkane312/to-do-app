import { useToggleStatusTask } from './context/ListItemContext';

type listItems = Array<ToDoItem>;
type ToDoItem = { id: string; toDoItem: string; itemStatus: boolean };

const ToDoListItem = ({
  listItems,
  onChangeTask,
}: {
  listItems: listItems;
  onChangeTask: typeof useToggleStatusTask;
}) => {
  const toggleTask = onChangeTask();

  return (
    <ul aria-label="To do items">
      {listItems
        ? listItems.map((listItem) => (
            <li key={listItem.id}>
              <label>
                {listItem.toDoItem}{' '}
                <input
                  type="checkbox"
                  onChange={() => toggleTask(listItem)}
                  checked={listItem.itemStatus}
                />
              </label>
            </li>
          ))
        : null}
    </ul>
  );
};

export default ToDoListItem;
