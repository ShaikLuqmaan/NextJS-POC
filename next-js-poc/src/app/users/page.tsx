import React from "react";
import ProductCard from "../../../components/ProductCard";

interface User {
  id: number;
  name: string;
}
const Users = async () => {
  const res = await fetch("http://localhost:3000/users");
  const data: User[] = await res.json();
  return (
    <div>
      <ul>
        {data.map((u) => (
          <li>
            {u.id} -- {u.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
