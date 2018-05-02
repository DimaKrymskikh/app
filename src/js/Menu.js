import React from 'react';
import { Link } from 'react-router-dom';

import homeSvg from '../svg/home.svg';

const Menu = ({navClass}) => {
    
    const toggleMenu = () => {
        let button = document.querySelector('.button');
        let menu = document.querySelector('.menu');
        button.classList.toggle('in');
        menu.classList.toggle('in');
    };
    
    const removeMenu = () => {
        let button = document.querySelector('.button');
        let menu = document.querySelector('.menu');
        button.classList.remove('in');
        menu.classList.remove('in');
    };
    
    return (
        <header>
            <div className='container'>
                <nav>
                    <div className='home'>
                        <Link onClick={removeMenu} to='/'>
                            <img src={homeSvg} />
                        </Link>
                    </div>
                    <div className="button" onClick={toggleMenu}><span></span></div>
                    <ul className="menu">
                        <li><Link className={navClass[0]} onClick={removeMenu} to='/calendar'>Календарь</Link></li>
                        <li><Link className={navClass[1]} onClick={removeMenu} to='/weather'>Погода</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Menu;
