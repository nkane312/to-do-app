import { ToDoItem } from '../App';
import { createContext, Dispatch, SetStateAction, useContext, useReducer, useState } from 'react';
// import listItemReducer from '../listItemReducer';
import React from 'react';
import { useAPI } from './CharacterAPI';
import { v4 as uuid } from 'uuid';

type CharacterToDoList = {
  [key: string]: ToDoItem[];
};

export interface CharacterToDoListContext {
  allCharacterTodoLists: CharacterToDoList;
  setCharacterTodoLists: Dispatch<SetStateAction<CharacterToDoList>>;
}

const initialList = {
  1: [],
};
const noop = () => {};

const initialSetList = noop as unknown as Dispatch<SetStateAction<{ [key: string]: ToDoItem[] }>>;

const ListItemsContext = createContext<CharacterToDoListContext>({
  allCharacterTodoLists: initialList,
  setCharacterTodoLists: initialSetList,
});

export function useAddTask() {
  const { allCharacterTodoLists, setCharacterTodoLists } = useContext(ListItemsContext);
  const { characterIndex } = useAPI();
  const currentCharacterTodoList = useCurrentCharacterTodoList();

  return (task: string) => {
    const newTodo: ToDoItem = { id: uuid(), toDoItem: task, itemStatus: false };
    const newTodos = [...currentCharacterTodoList, newTodo];
    setCharacterTodoLists({ ...allCharacterTodoLists, [characterIndex]: newTodos });
  };
}

export function useToggleStatusTask() {
  const { allCharacterTodoLists, setCharacterTodoLists } = useContext(ListItemsContext);
  const { characterIndex } = useAPI();

  return (listItem: ToDoItem) => {
    const newList = allCharacterTodoLists[characterIndex].map((item: ToDoItem) =>
      item.id === listItem?.id ? { ...item, itemStatus: !item.itemStatus } : item,
    );

    setCharacterTodoLists({ ...allCharacterTodoLists, [characterIndex]: newList });
  };
}

export function useClearTask() {
  const { allCharacterTodoLists, setCharacterTodoLists } = useContext(ListItemsContext);
  const { characterIndex } = useAPI();
  const currentCharacterTodoList = allCharacterTodoLists[characterIndex];

  return () => {
    const newList = currentCharacterTodoList.filter(
      (listItem: ToDoItem) => listItem.itemStatus === false,
    );

    setCharacterTodoLists({ ...allCharacterTodoLists, [characterIndex]: newList });
  };
}

export function useCurrentCharacterTodoList() {
  const { allCharacterTodoLists } = useContext(ListItemsContext);
  const { characterIndex } = useAPI();

  const currentCharacterTodoList = allCharacterTodoLists[characterIndex];

  if (currentCharacterTodoList === undefined) {
    const newCharacterTodoList = [] as ToDoItem[];
    return newCharacterTodoList;
  } else {
    return currentCharacterTodoList;
  }
}

export const ListItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allCharacterTodoLists, setCharacterTodoLists] = useState<CharacterToDoList>({
    1: [] as ToDoItem[],
  });

  return (
    <ListItemsContext.Provider value={{ allCharacterTodoLists, setCharacterTodoLists }}>
      {children}
    </ListItemsContext.Provider>
  );
};
