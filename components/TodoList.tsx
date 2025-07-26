import React, { useState } from "react";
import { AddTodo } from "./AddTodo";
import { Todo as TodoComponent } from "./Todo";
import { Todo } from "./types";

const initialTodoList: Omit<Todo, "id">[] = [
  { todo: "Finish portfolio site", urgency: true, completed: false },
  { todo: "Call Mom", urgency: false, completed: false },
  { todo: "Check emails", urgency: false, completed: true },
  { todo: "Write blog post", urgency: false, completed: false },
  { todo: "Workout", urgency: false, completed: false },
  { todo: "Take a nap", urgency: false, completed: true }
];

export function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>(
    initialTodoList.map((todo, index) => ({ ...todo, id: index }))
  );
  const [todoInput, setTodoInput] = useState("");
  const [urgentChecked, setUrgentChecked] = useState(false);
  const [showUrgentChecked, setShowUrgentChecked] = useState(false);
  const [sortUrgencyDescending, setSortUrgencyDescending] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  function setTodoListWithIncrementingIds(todos: Todo[]) {
    setTodoList(todos.map((todo, index) => ({ ...todo, id: index })));
  }

  function getTodosToDisplay(): Todo[] {
    const filtered = todoList
      .filter((todo) =>
        showUrgentChecked ? todo.urgency : true
      )
      .filter((todo) =>
        todo.todo.toLowerCase().includes(searchInput.toLowerCase())
      );

    return sortUrgencyDescending
      ? [...filtered].sort((a, b) => Number(b.urgency) - Number(a.urgency))
      : filtered;
  }

  const todosToDisplay = getTodosToDisplay();

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 p-6 font-mono">
      <h1 className="text-4xl font-serif text-center text-indigo-400 mb-6">
        📝 Todo List App
      </h1>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <input
          type="text"
          className="flex-1 w-full p-3 border border-slate-700 bg-slate-800 text-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="🔍 Search tasks..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={showUrgentChecked}
              onChange={() => setShowUrgentChecked(!showUrgentChecked)}
              className="accent-indigo-600"
            />
            <span className="text-sm">Urgent only</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={sortUrgencyDescending}
              onChange={() => setSortUrgencyDescending(!sortUrgencyDescending)}
              className="accent-indigo-600"
            />
            <span className="text-sm">Urgent first</span>
          </label>
        </div>
      </div>

      {/* Add Todo */}
      <div className="bg-slate-800 mt-6 rounded-lg p-5 space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold text-indigo-300">➕ Add New Task</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            className="flex-1 w-full p-3 border border-slate-700 bg-slate-700 text-white rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
            value={todoInput}
            type="text"
            placeholder="e.g. Turn caffeine into clean code"
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={urgentChecked}
              onChange={() => setUrgentChecked(!urgentChecked)}
              className="accent-red-500"
            />
            Urgent?
          </label>
          <AddTodo
            todoList={todoList}
            todoInput={todoInput}
            urgentChecked={urgentChecked}
            onClick={(newTodoList) => {
              setTodoListWithIncrementingIds(newTodoList);
              setUrgentChecked(false);
              setTodoInput("");
            }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
          onClick={() => {
            setTodoListWithIncrementingIds(
              todoList.filter(
                (todo) =>
                  !todosToDisplay.some((display) => display.id === todo.id)
              )
            );
          }}
        >
          ❌ Clear All
        </button>
        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all"
          onClick={() => {
            if (todosToDisplay.length === 0) return;
            setTodoListWithIncrementingIds(
              todoList.filter((todo) => todo.id !== todosToDisplay[0].id)
            );
          }}
        >
          🗑️ Remove First
        </button>
      </div>

      {/* Todo List */}
      <div className="mt-6 space-y-2">
        {todosToDisplay.length === 0 ? (
          <p className="text-center text-gray-500">No tasks to show.</p>
        ) : (
          <ul className="space-y-2">
            {todosToDisplay.map((todo) => (
              <TodoComponent
                key={todo.id}
                item={todo}
                onChange={(newCheckedStatus) => {
                  const updatedList = [...todoList];
                  updatedList.splice(todo.id!, 1, {
                    ...todo,
                    completed: newCheckedStatus
                  });
                  setTodoListWithIncrementingIds(updatedList);
                }}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
