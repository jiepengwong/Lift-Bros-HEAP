import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

function Navbar() {

    const button = <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>

    const [navbar, setNavbar] = useState(['Home', 'Planner'])
    const [menuOpen, setMenuOpen] = useState(false);
    const [signIn, setSignIn] = useState(false);

    const onMenuClick = () => {
        setMenuOpen(!menuOpen);
    }

    const handleMenuClick = (item) => {
        // you can close the menu after clicking an item
        setMenuOpen(false);

    };



    return (
        <div className="top-0 w-full block">
            <div className="bg-yellow-300 flex justify-between items-center w-full h-20 px-2 2xl:px-16">
                {/* Header/logo */}
                <div className="">
                    <p className="font-bold text-2xl">Lift bros 🦾</p>
                </div>

                {/* Navbar desktop */}
                <div className="hidden sm:block">
                    <ul>
                        {/* Links */}
                        {navbar.map((item) => (
                            <li
                                key={item}
                                className="font-bold cursor-pointer inline-block px-6 py-2 mx-2 rounded-md hover:bg-green-300"
                            >
                                {/* Check if item is home */}
                                {item === 'Home' ? (
                                    <Link to="/">{item}</Link>
                                ) : (
                                    <Link to={`/${item}`}>{item}</Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Navbar mobile */}
                <div className="sm:hidden flex flex-1 justify-end items-center">
                    {/* Hamburger Icon */}
                    <div
                        className={`cursor-pointer flex flex-col justify-center items-center w-6 h-6`}
                        onClick={() => setMenuOpen((menuOpen) => !menuOpen)}
                    >
                        {/* Hamburger Lines */}
                        <div
                            className={`w-6 h-0.5 bg-black transition-all duration-300 transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''
                                }`}
                        ></div>
                        <div
                            className={`w-6 h-0.5 bg-black my-1 transition-all duration-300 opacity ${menuOpen ? 'opacity-0' : ''
                                }`}
                        ></div>
                        <div
                            className={`w-6 h-0.5 bg-black transition-all duration-300 transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''
                                }`}
                        ></div>
                    </div>
                </div>


            </div>

            {/* Mobile Menu, outside of the flex*/}
            <div
                className={`${menuOpen ? 'flex flex-col' : 'hidden'
                    } z-10 bg-white shadow-lg relative rounded-xl sidebar`}
                style={{
                    backgroundColor: menuOpen ? '#f0f0f0' : 'white',
                    borderRadius: menuOpen ? '4px' : '0',
                }}
            >
                {/* Caret */}
                {/* <div className="absolute top-0 right-0 w-9 h-9 transform rotate-45 bg-gray-200"> */}
                {/* Empty div to hide the caret on hover */}
                {/* <div className="w-full h-full bg-white transition-opacity duration-300 hover:opacity-0"></div>
                </div> */}

                {/* Mobile Menu Content */}
                <ul>
                    {/* Links */}
                    {navbar.map((item, index) => (
                        <li
                            key={item}
                            className={`z-10 font-bold cursor-pointer block py-2 mx-2 rounded-md ${index === navbar.length - 1 ? 'last-item' : ''
                                }`}
                            onClick={() => handleMenuClick(item)}
                        >
                            {/* Check if item is home */}
                            {item === 'Home' ? (
                                <Link to="/">{item}</Link>
                            ) : (
                                <Link to={`/${item}`}>{item}</Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default Navbar