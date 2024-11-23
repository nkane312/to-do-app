import { render, screen, fireEvent, within } from '@testing-library/react';
import { CharactersProvider } from './../context/CharacterAPI';
import { ListItemsProvider } from './../context/ListItemContext';
import App from '../App';

const mock = {
  '1': [
    {
      id: '083506e7-a5d7-4485-8235-da3f3961ae48',
      toDoItem: 'Buy bread',
      itemStatus: false,
    },
    {
      id: 'e57fd175-ecdc-41cb-be70-ac884347bc60',
      toDoItem: 'Buy eggs',
      itemStatus: false,
    },
    {
      id: 'd55b9579-d7f5-4a8d-8818-b0c90c071685',
      toDoItem: 'Get gas',
      itemStatus: false,
    },
  ],
};

test('should set initial state from local storage', async () => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn((key) => {
        return key === 'todos' ? JSON.stringify(mock) : null;
      }),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });

  render(
    <CharactersProvider>
      <ListItemsProvider>
        <App />
      </ListItemsProvider>
    </CharactersProvider>,
  );

  const todoItem = await screen.findByRole('list');
  const listItemWithText = await within(todoItem).findByText('Buy bread');
  expect(listItemWithText).toBeVisible();
});

test('should set initial state to default', async () => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn((key) => {
        return null;
      }),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });

  render(
    <CharactersProvider>
      <ListItemsProvider>
        <App />
      </ListItemsProvider>
    </CharactersProvider>,
  );

  const todoItem = await screen.findByRole('list');
  expect(todoItem).toBeEmptyDOMElement();
});
