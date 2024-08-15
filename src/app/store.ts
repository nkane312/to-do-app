import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import itemSliceReducer from '../ItemSlice';

// export const store = configureStore({
//   reducer: {
//     items: itemSliceReducer,
//   },
// });

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  items: itemSliceReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

// export type IRootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export type RootState = ReturnType<typeof rootReducer>;
