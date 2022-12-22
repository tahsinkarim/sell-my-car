import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo2.png";
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
        <Link className='rounded' to='/'>
          Home
        </Link>
      </li>
      <li>
        <Link className='rounded' to='/blog'>
          Blog
        </Link>
      </li>
      {user?.email ? (
        <>
          <li>
            <Link className='rounded mr-1' to='/dashboard'>
              Dashboard
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className='btn btn-primary text-white rounded mb-1'
            >
              Logout
            </button>
          </li>
        </>
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
    <nav className='bg-base-100 shadow'>
      <div className='navbar justify-between max-w-7xl mx-auto'>
        <div className='navbar-start'>
          <Link
            to='/'
            className='btn btn-ghost normal-case text-xl flex items-center justify-center'
          >
            <p className='text-3xl font-bold text-orange-600'>SellMyCar</p>
            <div>
              <img className='w-10 pt-2 ml-1' src={logo} alt='' />
            </div>
          </Link>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal p-0 font-semibold'>
            {menuItems}
          </ul>
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
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 -left-40 font-semibold'
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
