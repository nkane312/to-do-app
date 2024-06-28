
const ClearToDo = ({onClearTask}: {
    onClearTask: Function;
  }) => {

  return (
    <button type="button" onClick={() => onClearTask()}>Clear</button>
  );
}

export default ClearToDo;