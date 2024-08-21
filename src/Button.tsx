const Button = ({
  task,
}: {
  task: { taskFunction: Function; text: String; buttonType: 'submit' | 'button' };
}) => {
  return (
    <button type={task.buttonType} onClick={() => task.taskFunction()}>
      {task.text}
    </button>
  );
};

export default Button;
