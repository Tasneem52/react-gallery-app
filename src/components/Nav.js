import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink exact to='/sunsets' onClick={() =>
            props.onClick('sunsets')}>Sunsets
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/waterfalls' onClick={() =>
            props.onClick('waterfalls')}>Waterfalls
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/rainbows' onClick={() =>
            props.onClick('rainbows')}>Rainbows
          </NavLink>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
