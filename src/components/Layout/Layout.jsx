import { Outlet, NavLink } from "react-router-dom";
import { Suspense } from 'react';
import css from "./Layout.module.css";
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
  color: black;
  text-decoration: none;

  &.active {
    color: #00bfff;
  }
`;
const Layout = () => {
  return (
    <>
      <header className={css.headerContainer}>
        <div className={css.header}>
        <ul className={css.navList}>
          <li >
          <StyledNavLink to="/">Home</StyledNavLink>
          </li>
          <li >
          <StyledNavLink to="/tweets">Tweets</StyledNavLink>
          
          </li>
        </ul>
        </div>
        
      </header>
      <main>
      <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
export default Layout;