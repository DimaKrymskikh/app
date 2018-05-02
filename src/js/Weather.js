import React from 'react';
import { connect } from 'react-redux';

import Menu from './Menu';
import Form from './Weather/Form';
import Aside from './Weather/Aside';
import Footer from './Footer';


import xSvg from '../svg/x.svg';
import wiCloudy from '../svg/wi-cloudy.svg';
import wiDayCloudy from '../svg/wi-day-cloudy.svg';
import wiDaySunny from '../svg/wi-day-sunny.svg';
import wiRain from '../svg/wi-rain.svg';

const Weather = ({listCities, onDeleteCity}) => {
    
    const navClass = ['nav', 'nav active'];
    
    let clText = listCities.length ? 'text out' : 'text';
    
    const getIcon = v => {
        if( v < 20 ) return wiDaySunny;
        if( 20 <= v && v < 50 ) return wiDayCloudy;
        if( 50 <= v && v < 80 ) return wiCloudy;
        if( 80 <= v  ) return wiRain;
    };
    
    const deleteCity = (index) => {
        return () => {
            // Удаляем город из хранилища
            localStorage.removeItem(listCities[index].name);
            // Удаляем город из store
            onDeleteCity(listCities[index]);
        };
    };
    
    return (
        <div className="weather">
            <Menu navClass={navClass} />
            <div className="container main">
                <h1>Погода в городах мира</h1>
                <Form />
                <div className='row'>
                    <main>
                        <div className={`${clText}`}>Нет выбранных городов</div>
                        {listCities.map( (item, index) => 
                            <article key={index}>
                                <div className="name">{item.name}</div>
                                <div className="icon"><img src={`${getIcon(item.clouds)}`} /></div>
                                <div className="other">Температура: {item.temp} &#8451;</div>
                                <div className="other">Облачность: {item.clouds}&#37;</div>
                                <div className="other">Влажность: {item.humidity}&#37;</div>
                                <div className="other">Давление: {item.pressure} мм рт.ст</div>
                                <div className="other">Направление ветра: {item.direction}&deg;</div>
                                <div className="other">Скорость ветра: {item.speed} м/с</div>
                                <span 
                                    className='x-svg' 
                                    onClick={deleteCity(index)}
                                    title="Удалить город"
                                >
                                    <img src={`${xSvg}`} />
                                </span>
                            </article>
                        )}
                    </main>
                    <Aside />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default connect(
    state => ({
        listCities: state.listCities
    }),
    dispatch => ({
        onDeleteCity: ob => {
            dispatch({type: 'DELETE', city: ob});
        }
    })
)(Weather);
