import React from 'react';
import '../../styles/SidebarItem.css';

const SidebarItem = ({ text, active }) => {
  return (
    <li className={`sidebar-item ${active ? 'active' : ''}`}>
      <a href="#">{text}</a>
    </li>
  );
};

export default SidebarItem;
