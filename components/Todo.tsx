export function Todo({ item, onChange }) {
  return (
    <li>
      <div
        style={{ textDecorationLine: item.completed ? "line-through" : "none" }}
      >
        <input
          type="checkbox"
          checked={item.completed}
          className="mx-2"
          onChange={(e) => {
            onChange(e.target.checked);
          }}
        ></input>
        {item.todo} {item.urgency ? "(urgent)" : ""}
      </div>
    </li>
  );
}
