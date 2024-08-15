import { useDispatch, useSelector } from 'react-redux';
import { changed } from './ItemSlice';
import { RootState } from './app/store';
// import { useAppDispatch } from './app/hooks';

// type listItems = Array<ToDoItem>;
// type ToDoItem = { id: string; toDoItem: string; itemStatus: boolean };

export function Item() {
  const items = useSelector((state: RootState) => state.items);
  const dispatch = useDispatch();
  console.log(items);

  return (
    <ul aria-label="To do items">
      {items.map((listItem) => (
        <li key={listItem.id}>
          <label>
            {listItem.toDoItem}{' '}
            <input
              type="checkbox"
              onChange={() => {
                dispatch(changed(listItem));
              }}
              checked={listItem.itemStatus}
            />
          </label>
        </li>
      ))}
    </ul>
  );
}

// export default Item;
