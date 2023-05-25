
import { Link } from "react-router-dom";
import UserCard from "../../components/userCard/UserCard";
import {fetchUsers} from '../../fetchApi/fetchApi';
import { useEffect, useState } from "react";
import css from '../UserList/UserList.module.css'


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setVisibleUsers(data.slice(0, 3));
      })
      .catch((error) => console.error("Error", error));
  }, []);

  const loadMore = () => {
    
    const startPages = ((currentPage + 1) - 1) * 3;
    const endPages = startPages + 3;
    const newVisibleUsers = users.slice(startPages, endPages);
    setVisibleUsers((prevVisibleUsers) => [
      ...prevVisibleUsers,
      ...newVisibleUsers,
    ]);
    setCurrentPage(currentPage + 1);
  };
  return (
    <div>
      <Link to={"/"} className={css.btnGoBack}>
      🢨 Go back
      </Link>
      <ul className ={css.usersTweets}>
        {visibleUsers.map(({ id, user, tweets, followers, avatar }) => (
          <UserCard
          tweets={tweets}
            followers={followers}
            avatar={avatar}
            key={id}
            id={id}
            user={user}
            
          />
        ))}
      </ul>
        <button className ={css.btnLoadMore} onClick={loadMore}>
          Load More
        </button>
      
    </div>
  );
};

export default UserList;