import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';
import { CharactersProvider } from './context/CharacterAPI';
import { ListItemsProvider } from './context/ListItemContext';
import C3PO from '../mocks/c3po.json';
import Luke from '../mocks/luke.json';

let fetchMock: any = undefined;

const assetsFetchMock = (url: RequestInfo | URL) => {
  const mock = url.toString().endsWith('1/') ? Luke : C3PO;

  return Promise.resolve({
    json: () => Promise.resolve(mock),
  } as Response);
};

beforeEach(() => {
  fetchMock = jest.spyOn(global, 'fetch').mockImplementation(assetsFetchMock);
});

test('Has an input for entering to-do items', () => {
  render(
    <CharactersProvider>
      <ListItemsProvider>
        <App />
      </ListItemsProvider>
    </CharactersProvider>,
  );
  const todoInput = screen.getByRole('textbox', { name: 'Enter to-do item' });
  expect(todoInput).toBeVisible();
});

test('Has a display of existing items', async () => {
  render(
    <CharactersProvider>
      <ListItemsProvider>
        <App />
      </ListItemsProvider>
    </CharactersProvider>,
  );
  const displayDiv = screen.getByRole('list', { name: 'To do items' });
  expect(displayDiv).toBeVisible();
});

test('Adds a todo item when the submit button is clicked', async () => {
  render(
    <CharactersProvider>
      <ListItemsProvider>
        <App />
      </ListItemsProvider>
    </CharactersProvider>,
  );
  await addTodo('Buy bread');
  await addTodo('Buy eggs');
});

test('Sets status of list items to checked when clicked', async () => {
  render(
    <CharactersProvider>
      <ListItemsProvider>
        <App />
      </ListItemsProvider>
    </CharactersProvider>,
  );
  await addTodo('Buy bread');
  const todoItem = await screen.findByRole('list');
  const listItemWithText = await within(todoItem).findByText('Buy bread');
  const itemStatusCheckbox = await screen.findByRole<HTMLInputElement>('checkbox', {
    name: 'Buy bread',
  });
  expect(itemStatusCheckbox.checked).toBeFalsy();
  fireEvent.click(listItemWithText);
  expect(itemStatusCheckbox.checked).toBeTruthy();
});

test('Clears checked items when clear button is clicked', async () => {
  render(
    <CharactersProvider>
      <ListItemsProvider>
        <App />
      </ListItemsProvider>
    </CharactersProvider>,
  );
  await addTodo('Buy bread');
  await addTodo('Buy eggs');

  const eggsCheckbox = await screen.findByRole('checkbox', { name: 'Buy eggs' });
  fireEvent.click(eggsCheckbox);
  const clearButton = screen.getByRole('button', { name: 'Clear' });
  fireEvent.click(clearButton);
  const todoItem = await screen.findByRole('list');
  const listItemWithText = within(todoItem).queryByText('Buy eggs');
  expect(listItemWithText).not.toBeInTheDocument();
});

test('Luke exists', async () => {
  render(
    <CharactersProvider>
      <ListItemsProvider>
        <App />
      </ListItemsProvider>
    </CharactersProvider>,
  );
  const lukeText = await screen.findByText(/Luke Skywalker/);
  expect(lukeText).toBeVisible();
});

test('Cycles to the next character in the list', async () => {
  render(
    <CharactersProvider>
      <ListItemsProvider>
        <App />
      </ListItemsProvider>
    </CharactersProvider>,
  );
  const lukeTitle = await screen.findByText(/Luke Skywalker/);
  expect(lukeTitle).toBeVisible();
  await addTodo('Buy bread');
  await addTodo('Buy eggs');

  const nextButton = screen.getByRole('button', { name: 'Next Character' });
  fireEvent.click(nextButton);

  const c3poTitle = await screen.findByText(/C-3PO/);
  expect(c3poTitle).toBeVisible();
});

const addTodo = async (todo: string) => {
  const todoInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'Enter to-do item' });
  fireEvent.change(todoInput, { target: { value: todo } });
  const submitButton = screen.getByRole('button', { name: 'Add to-do' });
  fireEvent.click(submitButton);
  const todoItem = await screen.findByRole('list');
  const listItemWithText = await within(todoItem).findByText(todo);
  expect(listItemWithText).toBeVisible();
  expect(todoInput.value).toBe('');
};
