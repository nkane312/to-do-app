
const AddToDo = ({onAddTask}: {
    onAddTask: Function;
  }) => {

  return (
    <button type="submit" onClick={() => onAddTask()}>Add todo</button>
  );
}

export default AddToDo;