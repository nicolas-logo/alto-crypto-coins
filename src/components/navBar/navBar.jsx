import React from 'react';
import { useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavLinks from './../../constants/navLinks';
import './navBar.css';

const NavBar = () => {
    const navRef = useRef();

    const showNavBar = () => {
        navRef.current.classList.toggle('responsive_nav');
    }

    return(
        <header className='container-md nav-header'>
            <h3>CryptoCoins</h3>
            <nav ref={navRef}>
                {
                    //using links from a const file to easily expand them
                    NavLinks.links.map( link => (
                        <Link className='link' key={link.name} to={link.URL} onClick={showNavBar}>{link.name}</Link>
                    ))
                }
                <button 
                    className='nav-btn nav-close-btn' 
                    onClick={showNavBar}>
                    <FaTimes />
                </button>
            </nav>
            <button 
                className='nav-btn' 
                onClick={showNavBar}>
                <FaBars />
            </button>
        </header>
    );
}

export default NavBar;