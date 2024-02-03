import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);

  expect(linkElement).toBeInTheDocument();
});

test('Has an input for entering todo items', () => {
  render(<App />);
  const todoInput = screen.getByRole('textbox', { name: 'Enter todo item' })
  expect(todoInput).toBeVisible();
})

test('Has a display of existing items', async () => {
  render(<App />);
  const displayDiv = screen.getByRole('list', { name: 'To do items' });
  expect(displayDiv).toBeVisible();
})

test('Adds a todo item when the submit button is clicked', async () => {
  render(<App />);
  const todoInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'Enter todo item' })
  fireEvent.change(todoInput, { target: {value: 'Buy bread'} })
  const submitButton = screen.getByRole('button', {name: 'Add todo'})
  fireEvent.click(submitButton)
  const todoItem = await screen.findByRole('listitem')
  const listItemWithText = await within(todoItem).findByText('Buy bread');
  expect(listItemWithText).toBeVisible();
  // expect(todoInput.value).toBe('');
  // todo assert that we can add multiple todos

});

test('Sets status of list items to checked when clicked', async () => {
  render(<App />);
  const todoInput = screen.getByRole('textbox', { name: 'Enter todo item' })
  fireEvent.change(todoInput, { target: {value: 'Buy bread'} })
  const submitButton = screen.getByRole('button', {name: 'Add todo'})
  fireEvent.click(submitButton)
  const todoItem = await screen.findByRole('listitem')
  const listItemWithText = await within(todoItem).findByText('Buy bread')
  expect(listItemWithText).toBeVisible();
  const itemStatusCheckbox = await screen.findByRole<HTMLInputElement>('checkbox', {name: 'Buy bread'})
  expect(itemStatusCheckbox.checked).toBeFalsy();
  fireEvent.click(listItemWithText)
  expect(itemStatusCheckbox.checked).toBeTruthy();
})
