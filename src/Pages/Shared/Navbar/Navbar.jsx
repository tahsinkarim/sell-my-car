import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  //Menu Links
  const menuItems = (
    <React.Fragment>
      <li>
        <Link to='/home'>Home</Link>
      </li>
      <li>
        <Link to='/appointment'>Appointment</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <hr />
      {user?.email ? (
        <li>
          <button
            onClick={handleLogout}
            className='btn btn-primary text-white rounded'
          >
            Logout
          </button>
        </li>
      ) : (
        <li>
          <Link className='btn btn-primary text-white rounded' to='/login'>
            Login
          </Link>
        </li>
      )}
    </React.Fragment>
  );

  return (
    <nav className='bg-base-100'>
      <div className='navbar justify-between max-w-7xl mx-auto'>
        <div className='navbar-start'>
          <Link to='/' className='btn btn-ghost normal-case text-xl'>
            Logo
          </Link>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal p-0'>{menuItems}</ul>
        </div>
        <div className='navbar-end lg:hidden'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 -left-40'
            >
              {menuItems}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
