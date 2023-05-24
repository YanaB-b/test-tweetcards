import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import css from "./UserCard.module.css";
import boyImg from "../../images/boy.png";
import logoImg from "../../images/logo.png";
import topImg from "../../images/topPicture.png";
const UserCard = ({ tweets, followers, avatar, id }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(parseInt(followers));

  const handleFollowClick = () => {
    if (isFollowing) {
      setFollowersCount((prevFollowersCount) => prevFollowersCount - 1);
    } else {
      setFollowersCount((prevFollowersCount) => prevFollowersCount + 1);
    }
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
  };
  useEffect(() => {
    const savedIsFollowing = localStorage.getItem(`isFollowing_${id}`);
    const savedFollowersCount = localStorage.getItem(`followers_${id}`);
    if (savedIsFollowing) {
      setIsFollowing(savedIsFollowing === "true");
    }
    if (savedFollowersCount) {
      setFollowersCount(parseInt(savedFollowersCount));
    }
  }, [id]);
  useEffect(() => {
    localStorage.setItem(`isFollowing_${id}`, String(isFollowing));
    localStorage.setItem(`followers_${id}`, String(followersCount));
  }, [isFollowing, id, followersCount]);

  const btnClass = isFollowing ? css.clickedButton : css.defaultButton;
  return (
    <>
      <li className={css.userCard}>
        <img className={css.logoImg} src={logoImg} alt="logo image" />
        <img className={css.topImg} src={topImg} alt="top image" />
        <img className={css.userAvatar} src={avatar} alt="User Avatar" />
        <img className={css.boyImg} src={boyImg} alt="boy image" />
        <div className={css.avatarLine}></div>
        <p className={css.userTextTweets}>{tweets} Tweets</p>
        <p className={css.userTextFollowers}>{followersCount} Followers</p>
        <button className={btnClass} onClick={handleFollowClick}>
          {isFollowing ? "Following" : "Follow"}
        </button>
        <Outlet />
      </li>
    </>
  );
};



export default UserCard;