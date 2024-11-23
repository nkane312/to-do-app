const Button = ({
  task,
}: {
  task: { taskFunction: Function; text: String; buttonType: 'submit' | 'button' };
}) => {
  return (
    <button
      type={task.buttonType}
      onClick={() => task.taskFunction()}
      className="rounded-md bg-teal-100 px-3.5 py-2.5 text-base w-full font-bold text-black shadow-sm hover:text-white hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800 ease-in-out duration-500 active:scale-95 transition-transform transform"
    >
      {task.text}
    </button>
  );
};

export default Button;
