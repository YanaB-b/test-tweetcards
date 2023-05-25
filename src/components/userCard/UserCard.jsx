import GoITImg from '../../assets/GoITImg.png'

import straight from '../../assets/straight.png'
import bgrimages from '../../assets/bgrimages.png';
import css from '../../components/userCard/userCard.module.css';
import DefaultImage from '../../assets/DefaultImage.png'
import Ellipse from '../../assets/Ellipse.png'

import { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";


const UserCard = ({ tweets, followers, id, avatar }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(parseInt(followers));

  const handleClickChangeFollow = () => {
    if (isFollowing) {
      setFollowersCount((prevFollowersCount) => prevFollowersCount - 1);
    } else {
      setFollowersCount((prevFollowersCount) => prevFollowersCount + 1);
    }
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
  };
  useEffect(() => {

    if (localStorage.getItem(`isFollowing_${id}`)) {
      setIsFollowing(localStorage.getItem(`isFollowing_${id}`) === "true");
    }
    if (localStorage.getItem(`followers_${id}`)) {
      setFollowersCount(parseInt(localStorage.getItem(`followers_${id}`)));
    }
  }, [id]);
  useEffect(() => {
    localStorage.setItem(`isFollowing_${id}`, String(isFollowing));
    localStorage.setItem(`followers_${id}`, String(followersCount));
  }, [isFollowing, id, followersCount]);
  return (
    <>
      <li className={css.userCard}>
        <img className={css.straightImg} src={straight} alt="straight" />
        <img className={css.bgrimages} src={GoITImg} alt="GoITImg image" />
        <img className={css.bgrimages} src={bgrimages} alt="bgrimages image" />
        <img className={css.imgAvatar} src={avatar} alt="User Avatar" />
        <img className={css.ellipseImg} src={Ellipse} alt="Ellipse" />
        <img className={css.users}  src={tweets.avatar ? tweets.avatar : DefaultImage}
        alt="users image" />

        <h3 className={css.textTweets}>{tweets} tweets</h3>
        <h3 className={css.textFollowers}>{followersCount} followers</h3>
        <button className={isFollowing ? css.followingBtn : css.btn} onClick={handleClickChangeFollow}>
          {isFollowing ? "Following" : "Follow"}
        </button>
        <Outlet />
      </li>
    </>
  );
};



export default UserCard;