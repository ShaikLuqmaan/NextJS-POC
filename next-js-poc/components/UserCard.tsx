import React from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/user/${user.id}`);
  };

  return (
    <div
      className="cursor-pointer shadow-lg rounded-lg p-4 m-4 bg-white hover:bg-gray-100"
      onClick={handleClick}
    >
      <h3 className="text-lg font-semibold">
        {user.firstName} {user.lastName}
      </h3>
      <p>ID: {user.id}</p>
    </div>
  );
};

export default UserCard;
