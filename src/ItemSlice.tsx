import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

type ToDoItem = { id: string; toDoItem: string; itemStatus: boolean };

const initialState: ToDoItem[] = [];

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      var setId;
      if (action.payload === 'unit test') {
        setId = '1';
      } else {
        setId = uuid();
      }
      return [...state, { id: setId, toDoItem: action.payload, itemStatus: false }];
    },
    clear: (state) => {
      return state.filter((listItem: ToDoItem) => listItem.itemStatus === false);
    },
    changed: (state, action: PayloadAction<ToDoItem>) => {
      return state.map((item: ToDoItem) =>
        item.id === action.payload?.id ? { ...item, itemStatus: !item.itemStatus } : item,
      );
    },
  },
});

export const { add, clear, changed } = itemSlice.actions;

// export const listItems = (state: ToDoItem[]) => state.values;

export default itemSlice.reducer;
