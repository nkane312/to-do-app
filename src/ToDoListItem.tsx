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
    <div className="flex justify-start items-start flex-col bg-slate-900 text-white p-4 m-2 rounded-xl">
      <h2 className="text-2xl self-center font-bold underline">To Do List</h2>
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
    </div>
  );
};

export default ToDoListItem;
