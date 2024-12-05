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
    <div className="flex justify-start items-start flex-col bg-slate-900 text-white my-2 rounded-xl">
      <h2 className="text-2xl self-center font-bold w-full text-center text-slate-950 bg-gray-200 p-2 rounded-xl">
        To Do List
      </h2>

      <ul className="w-full" aria-label="To do items">
        {listItems
          ? listItems.map((listItem) => (
              <li key={listItem.id}>
                <div className="flex items-center m-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                  <input
                    type="checkbox"
                    id={listItem.id}
                    value=""
                    className="hidden peer"
                    checked={listItem.itemStatus}
                    onChange={() => toggleTask(listItem)}
                  />
                  <label
                    htmlFor={listItem.id}
                    className="inline-flex items-center justify-between w-full p-3 text-gray-100 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-100 dark:border-gray-800 peer-checked:bg-blue-900 hover:text-gray-600 dark:peer-checked:text-gray-100 peer-checked:text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold">{listItem.toDoItem} </div>
                    </div>
                  </label>
                  {/* <input
                    type="checkbox"
                    id={listItem.id}
                    className="w-4 h-4 text-red-950 bg-gray-100 border-gray-300 rounded focus:ring-red-950 dark:focus:ring-red-950 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={() => toggleTask(listItem)}
                    checked={listItem.itemStatus}
                  />
                  <label
                    htmlFor={listItem.id}
                    className="w-full ms-2 text-base font-semibold text-gray-900 rounded dark:text-gray-100"
                  >
                    {listItem.toDoItem}{' '}
                  </label> */}
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default ToDoListItem;
