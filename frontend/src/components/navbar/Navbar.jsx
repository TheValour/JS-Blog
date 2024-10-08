import React, { useContext, useEffect } from 'react';
import './Navbar.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { APIContext } from '../../context/api';

function Navbar() {
  const {verifyUser} = useContext(APIContext);
  const {user, setUser} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await verifyUser();

        const { status, user } = data;
        if (status) {
          if (!isMounted) {
            return;
          }
          console.log()
          setUser(user);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    let isMounted = true;
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const Logout = () => {
    localStorage.removeItem('token');
    setUser(null)
    navigate("/");
  };

  return (
    <> 
      <div  className="navbar-container px-16 py-4 bg-slate-100 ">
        <div className='flex flex-col text-center'>
          <Link to='/'>
            <img src="mkdir2.png" alt="" className='w-14'/>
          </Link>
          {/* <span className='text-xs font-normal text-blue-700'>a rich text editor</span> */}
        </div>
        <div> 
          <span className='text-blue-700' id='its-free'>
          <Link to={`/${user?'profile':'login'}`} className='bg-slate-100 p-2 rounded-md'>
            {user ? user.username : ("Sign In" )}
          </Link>
           {user && <button onClick={Logout}
              className='ml-4 border border-white bg-gray-700 text-white text-xs p-2 rounded-md'>
              Logout
            </button>}
          </span>
        </div>
      </div>
      <Outlet/>
    </>
  )
}

export default Navbar;