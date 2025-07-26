import React from "react";
import { Todo as TodoType } from "./types";

interface TodoProps {
  item: TodoType;
  onChange: (checked: boolean) => void;
}

export function Todo({ item, onChange }: TodoProps) {
  return (
    <li className="bg-slate-800 p-3 rounded-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={item.completed}
          className="accent-indigo-600"
          onChange={(e) => onChange(e.target.checked)}
        />
        <span
          className={`text-lg ${item.completed ? "line-through text-gray-400" : ""}`}
        >
          {item.todo} {item.urgency ? <span className="text-red-400">(urgent)</span> : ""}
        </span>
      </div>
    </li>
  );
}
