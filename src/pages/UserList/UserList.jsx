
import { Link } from "react-router-dom";
import UserCard from "../../components/userCard/UserCard";
import {fetchUsers} from '../../fetchApi/fetchApi';
import { useEffect, useState } from "react";



const UserList = () => {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  const totalPages = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setVisibleUsers(data.slice(0, usersPerPage));
      })
      .catch((error) => console.error("Error", error));
  }, []);

  const loadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const newVisibleUsers = users.slice(startIndex, endIndex);
    setVisibleUsers((prevVisibleUsers) => [
      ...prevVisibleUsers,
      ...newVisibleUsers,
    ]);
    setCurrentPage(nextPage);
  };
  return (
    <div>
      <Link to={"/"}>
        Go Home
      </Link>
      <ul>
        {visibleUsers.map(({ id, user, tweets, followers, avatar }) => (
          <UserCard
            key={id}
            id={id}
            user={user}
            tweets={tweets}
            followers={followers}
            avatar={avatar}
          />
        ))}
      </ul>
      {currentPage < totalPages && (
        <button onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default UserList;