import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Menu.less';

import homeSvg from '../../assets/svg/home.svg';

const Menu = ({active}) => {
    
    const getActive = v => {
        if(v === active.name) {
            return 'active';
        }
        return '';
    };
    
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
        <header className="Menu">
            <div className='container'>
                <nav>
                    <div className='home'>
                        <Link onClick={removeMenu} to='/'>
                            <img src={homeSvg} />
                        </Link>
                    </div>
                    <div className="button" onClick={toggleMenu}><span></span></div>
                    <ul className="menu">
                        <li>
                            <Link 
                                className={`nav ${getActive('calendar')}`} 
                                onClick={removeMenu} 
                                to='/calendar'
                            >
                                Календарь
                            </Link></li>
                        <li>
                            <Link 
                                className={`nav ${getActive('weather')}`} 
                                onClick={removeMenu} 
                                to='/weather'
                            >
                                Погода
                            </Link>
                        </li>
                        <li>
                            <Link 
                                className={`nav ${getActive('tasks')}`} 
                                onClick={removeMenu} 
                                to='/tasks'
                            >
                                Задачи
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

const mapStateToProps = state => ({
    active: state.activeMenu
});

export default connect(
    mapStateToProps
)(Menu);
