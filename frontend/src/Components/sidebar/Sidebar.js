import React from 'react';
import { SidebarData } from './SidebarData';
import { Link } from 'react-scroll';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li key={key} id={window.location.pathname === val.link ? 'active' : ''}>
              {' '}
              <Link
                to={val.link}
                containerId="main"
                className="row"
                smooth={true}
                spy={true}
                duration={500}>
                <div id="icon">{val.icon}</div> <div id="title">{val.title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
