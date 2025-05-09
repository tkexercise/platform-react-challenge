import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAVIGATION } from '../../constants';
import logo from '../../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <header>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <NavLink to="/" className="flex items-center mb-4 md:mb-0">
            <span className="text-3xl font-bold flex gap-4 items-center">
              <img src={logo} alt="Cat Lovers logo" />
              CatLover
            </span>
          </NavLink>

          <nav className="flex">
            {NAVIGATION.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-colors text-2xl ${
                    isActive && 'bg-white text-action'
                  }`
                }
                end={item.end}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
