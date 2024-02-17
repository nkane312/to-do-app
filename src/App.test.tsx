import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

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
  await addTodo('Buy bread');
  await addTodo('Buy eggs');
});

test('Sets status of list items to checked when clicked', async () => {
  render(<App />);
  await addTodo('Buy bread');
  const todoItem = await screen.findByRole('list');
  const listItemWithText = await within(todoItem).findByText('Buy bread');
  const itemStatusCheckbox = await screen.findByRole<HTMLInputElement>('checkbox', {name: 'Buy bread'})
  expect(itemStatusCheckbox.checked).toBeFalsy();
  fireEvent.click(listItemWithText);
  expect(itemStatusCheckbox.checked).toBeTruthy();
})

test('Clears checked items when clear button is clicked', async () => {
  render(<App />);
  await addTodo('Buy bread')
  await addTodo('Buy eggs')

  const eggsCheckbox = await screen.findByRole('checkbox', {name: 'Buy eggs'})
  fireEvent.click(eggsCheckbox)
  const clearButton = screen.getByRole('button', {name: 'Clear'})
  fireEvent.click(clearButton)
  const todoItem = await screen.findByRole('list');
  const listItemWithText = within(todoItem).queryByText('Buy eggs');
  expect(listItemWithText).not.toBeInTheDocument();
});

const addTodo = async (todo: string) => {
  const todoInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'Enter todo item' })
  fireEvent.change(todoInput, { target: {value: todo} })
  const submitButton = screen.getByRole('button', {name: 'Add todo'})
  fireEvent.click(submitButton)
  const todoItem = await screen.findByRole('list')
  const listItemWithText = await within(todoItem).findByText(todo)
  expect(listItemWithText).toBeVisible();
  expect(todoInput.value).toBe('');
}
