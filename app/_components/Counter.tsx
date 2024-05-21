"use client";
import { useState } from "react";
export default function Counter({ users }: { users: any[] }) {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h1>Total users: {users.length}</h1>
      <h1>Counter</h1>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </div>
  );
}
