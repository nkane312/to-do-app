import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';
import ItemSlice, { add, changed, clear } from './ItemSlice';
import { renderWithProviders } from './utils/test-utils';

// import configureStore from 'redux-mock-store' //ES6 modules
// const { configureStore } = require('redux-mock-store') //CommonJS

// const middlewares: Object[] = []
// const mockStore = configureStore(middlewares)

let fetchMock: any = undefined;

const assetsFetchMock = () =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: 'https://swapi.dev/api/planets/1/',
        films: [
          'https://swapi.dev/api/films/1/',
          'https://swapi.dev/api/films/2/',
          'https://swapi.dev/api/films/3/',
          'https://swapi.dev/api/films/6/',
        ],
        species: [],
        vehicles: ['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/'],
        starships: ['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/'],
        created: '2014-12-09T13:50:51.644000Z',
        edited: '2014-12-20T21:17:56.891000Z',
        url: 'https://swapi.dev/api/people/1/',
      }),
  } as Response);

beforeEach(() => {
  fetchMock = jest.spyOn(global, 'fetch').mockImplementation(assetsFetchMock);
});

test('Should return the initial state', () => {
  expect(ItemSlice(undefined, { type: '' })).toEqual([]);
});

test('Should handle an add action', () => {
  expect(ItemSlice(undefined, add('unit test'))).toEqual([
    { id: '1', toDoItem: 'unit test', itemStatus: false },
  ]);
});

test('Has an input for entering todo items', () => {
  renderWithProviders(<App />);
  const todoInput = screen.getByRole('textbox', { name: 'Enter todo item' });
  expect(todoInput).toBeVisible();
});

test('Has a display of existing items', async () => {
  renderWithProviders(<App />);
  const displayDiv = screen.getByRole('list', { name: 'To do items' });
  expect(displayDiv).toBeVisible();
});

test('Adds a todo item when the submit button is clicked', async () => {
  renderWithProviders(<App />);
  await addTodo('Buy bread');
  await addTodo('Buy eggs');
});

test('Sets status of list items to checked when clicked', async () => {
  renderWithProviders(<App />);
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
  renderWithProviders(<App />);
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
  renderWithProviders(<App />);
  const lukeText = await screen.findByText(/Luke Skywalker/);
  expect(lukeText).toBeVisible();
});

const addTodo = async (todo: string) => {
  const todoInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'Enter todo item' });
  fireEvent.change(todoInput, { target: { value: todo } });
  const submitButton = screen.getByRole('button', { name: 'Add todo' });
  fireEvent.click(submitButton);
  const todoItem = await screen.findByRole('list');
  console.log(todoItem);
  const listItemWithText = await within(todoItem).findByText(todo);
  expect(listItemWithText).toBeVisible();
  expect(todoInput.value).toBe('');
};
