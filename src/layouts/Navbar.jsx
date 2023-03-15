import {useState, useContext} from 'react'
import { Link } from 'react-router-dom'

import { toast } from 'react-hot-toast'


import AuthContext from '../context/AuthContext'

function Navbar() {

    const [open, setOpen] = useState(false)
    const closeMenu = () => setOpen(false)

  const {user, logout} = useContext(AuthContext)

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  }

  return (
    <div className=''>
    <nav className="bg-gray-100 py-2">
        <div className="md:px-14 px-4 flex items-center justify-between text-sm ">
            
            {/*  Menu  */}
            <div className='z-50 lg:w-auto w-full flex items-center justify-between '>
                {/* DarkMode  */}
                <Link to='/' onClick={closeMenu}>
                    <div className='flex items-center'>
                        <h2 className='tracking-wider text-md uppercase font-bold'>Story - Telling</h2>
                    </div>
                </Link>
                <div className='flex items-center space-x-2 lg:hidden'>
                    <div className='text-3xl px-1 rounded-md flex' onClick={() => setOpen(!open)}>
                        <ion-icon name={`${open ? 'close-outline' : 'grid-outline'}`}></ion-icon>
                    </div>
                </div>
            </div>

            {/* Large screen  */}
            <ul className='lg:flex py-2 text-lg hidden items-center gap-8'>
                <Link to='about' className='inline-block uppercase'>
                    About Us
                </Link>
                <Link to='story' className='inline-block uppercase'>
                    Stories
                </Link>
            </ul>

            {!user ? (
                <ul className='lg:flex hidden uppercase items-center space-x-4'>
                    {/* auth  */}
                    <Link to='/login' className='py-2 flex items-center rounded-md px-4 bg-gray-200 hover:bg-gray-400 shadow-inner'>
                        <h1 className='tracking-wider font-semibold'>LOGIN</h1>
                    </Link>
                    <Link to='/register' className='py-2 flex items-center px-4 rounded-md text-white bg-gray-400 hover:text-black hover:bg-gray-200 shadow-inner'>
                        <h1 className='tracking-wider font-semibold'>REGISTER</h1>
                    </Link>
                </ul>
            ) : (
                <ul className='lg:flex hidden uppercase items-center space-x-4'>
                    {/* auth  */}
                    <div className='py-2 flex items-center '>
                        <h1 className='tracking-wider font-semibold'>{user.username}</h1>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className='py-2 px-3 flex items-center rounded-md text-white bg-red-300 hover:text-black hover:bg-gray-200 shadow-inner'>
                        <ion-icon name="log-out-outline"></ion-icon>
                    </button>
                </ul>
            )}
            {/* Large screen ends */}

            {/* Mobile Menu  */}
            <ul className={`
               dark:text-white text-dark lg:hidden dark:bg-dark bg-white absolute bottom-0 w-full h-screen py-24 px-12
                delay-100 duration-500 z-10 ${open ? 'left-0' : 'left-[-100%]'}
            `}>
                <div className='flex flex-col'>
                    <Link to='about' className='py-3 text-center px-3 text-2xl' onClick={closeMenu}>
                        About Us
                    </Link>
                    <Link to='story' className='py-3 text-center px-3 text-2xl' onClick={closeMenu}>
                        Stories
                    </Link>
                </div>
            
                <li className='flex space-x-3 justify-center py-3' onClick={closeMenu}>
                    {!user ? (
                        <div className='space-y-4'>
                            <Link to='/login' className='py-2 flex items-center px-6 rounded-md bg-gray-200 hover:bg-gray-400 shadow-inner'>
                                Log In
                            </Link>
                        
                            <Link to='/register' className='py-2 flex items-center px-6 border-2 rounded-md bg-gray-400 hover:bg-gray-400 shadow-inner'>
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <h1 className='font-semibold uppercase tracking-widest'>{user.username}</h1>
                            <button 
                                onClick={handleLogout}
                                className='py-2 px-6 w-full flex items-center rounded-md text-white bg-red-300 hover:text-black hover:bg-gray-200 shadow-inner'>
                                <ion-icon name="log-out-outline"></ion-icon>
                            </button>
                        </div>
                    )}
                </li>
                
            </ul>
        </div>
    </nav>
</div>
  )
}

export default Navbar