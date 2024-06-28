import { v4 as uuid } from 'uuid';

type ToDoItem = {id: string, toDoItem: string, itemStatus: boolean}

export default function listItemReducer(listItems: Array<ToDoItem>, action: { type: string; text: string; listItem: ToDoItem }) {
    switch (action.type) {
        case 'added': {
          return [...listItems, {id: uuid(), toDoItem:action.text, itemStatus: false}];
        }
        case 'changed': {
          return listItems.map((item: ToDoItem) => 
            item.id === action.listItem?.id ? {...item, itemStatus: !item.itemStatus} : item
          );
        }
        case 'clear': {
          return listItems.filter((listItem: ToDoItem) => 
            listItem.itemStatus === false
          );
        }
        default: {
          throw Error('Unknown action: ' + action.type);
        }
      }
    }
  