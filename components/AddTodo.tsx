import React from "react";
import { Todo } from "./types";

interface AddTodoProps {
  todoList: Todo[];
  todoInput: string;
  urgentChecked: boolean;
  onClick: (newTodoList: Todo[]) => void;
}

export function AddTodo({ todoList, todoInput, urgentChecked, onClick }: AddTodoProps) {
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded-md cursor-pointer m-2 hover:bg-blue-800"
      onClick={() => {
        if (!todoInput.trim()) return; // prevent empty todos
        const newTodoList = [...todoList];
        newTodoList.push({
          todo: todoInput.trim(),
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
