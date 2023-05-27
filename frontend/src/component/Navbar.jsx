import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

function Navbar() {

    const button = <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>

    const [navbar, setNavbar] = useState(['Home','Planner'])
    const [menuOpen, setMenuOpen] = useState(false);
    const [signIn, setSignIn] = useState(false);

    const onMenuClick = () => {
        setMenuOpen(!menuOpen);
    }



    return (
        <div className="top-0 w-full block">
            <div className="bg-yellow-300 flex justify-between items-center w-full h-20 px-2  2xl:px-16">

                {/* Header/logo */}
                <div className=''>
                    <p className="font-bold text-2xl">Lift bros 🦾</p>
                </div>

                {/* Navbar desktop */}
                <div className='hidden sm:block'>
                    <ul>
                        {/* Links */}
                        {navbar.map((item) => (
                            <li className="font-bold cursor-pointer inline-block px-6 py-2 mx-2 rounded-md hover:bg-green-300">
                                {/* check  if item is home */}
                                {item === 'Home' ? <Link to='/'>{item}</Link> : <Link to={`/${item}`}>{item}</Link>}
                            </li>))}







                    </ul>
                </div>

                {/* Navbar mobile */}
                <div className="sm:hidden flex justify-between items-center">
                    {/* Hamburger Icon */}
                    <div
                        className='cursor-pointer'
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <div className="w-6 h-0.5 bg-black"></div>
                        <div className="w-6 h-0.5 bg-black my-1"></div>
                        <div className="w-6 h-0.5 bg-black"></div>
                    </div>
                    {/* Mobile Menu */}
                    <div className={`${!menuOpen ? 'hidden' : 'block'}`}>
                        <div className="absolute top-full left-0 bg-white font-bold w-full p-4 shadow">
                            {/* Mobile Menu Content */}
                            <ul>
                                {navbar.map((item) => (
                                    <li className="cursor-pointer py-2 rounded-md hover:bg-green-300" key={item}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>


            </div>



        </div>
    )
}

export default Navbar