export function AddTodo({ todoList, todoInput, urgentChecked, onClick }) {
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded-md cursor-pointer m-2 hover:bg-blue-800"
      onClick={() => {
        const newTodoList = [...todoList];
        newTodoList.push({
          todo: todoInput,
          urgency: urgentChecked,
          completed: false,
        });
        onClick(newTodoList);
      }}
    >
      Add New Todo
    </button>
  );
}
