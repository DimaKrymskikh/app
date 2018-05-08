import React from 'react';
import { connect } from 'react-redux';

import Menu from './Menu';
import Form from './Weather/Form';
import Aside from './Weather/Aside';
import Footer from './Footer';

import {initCities, fetchW} from './Weather/help';

import xSvg from '../svg/x.svg';
import wiCloudy from '../svg/wi-cloudy.svg';
import wiDayCloudy from '../svg/wi-day-cloudy.svg';
import wiDaySunny from '../svg/wi-day-sunny.svg';
import wiRain from '../svg/wi-rain.svg';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.navClass = ['nav', 'nav active'];
        this.state = {
            selector: 'note',
            answer: '',
            clText: 'text out'
        };
    }
    
    componentDidMount() {
        (async () => {
            const initStateCities = await initCities();
            this.props.onInitCities(initStateCities);
            this.setState({
                clText: this.props.listCities.length ? 'text out' : 'text'
            });
        })();
    }
    
    getIcon(v) {
        if( v < 20 ) return wiDaySunny;
        if( 20 <= v && v < 50 ) return wiDayCloudy;
        if( 50 <= v && v < 80 ) return wiCloudy;
        if( 80 <= v  ) return wiRain;
    };
    
    async addCity(v) {
        if(!v.value) return;
        
        let obCity = await fetchW(v.value);
    
        if(obCity.cod === 200) {
            this.setState({
                selector: 'note good',
                answer: 'Город добавлен \u2713',
                clText: 'text out'
            });
            // Делаем запись в хранилище
            const key = obCity.name;
            const value = obCity.name;
            localStorage.setItem(key, value);
            // Добавляем город в store для динамического обновления
            this.props.onAddCity(obCity);
        } else {
            this.setState({
                selector: 'note bad',
                answer: 'Город не найден \u2718' 
            });
        }
        // Очищаем поле ввода
        v.value = '';
        setTimeout( this.setState.bind(this, {
            selector: 'note',
            answer: ''
        }), 3000);
    }
    
    deleteCity(index) {
        return () => {
            // Удаляем город из хранилища
            localStorage.removeItem(this.props.listCities[index].name);
            // Удаляем город из store
            this.props.onDeleteCity(this.props.listCities[index]);
            // Пишем this.props.listCities.length - 1
            // потому что this.props.listCities остаётся неизменной в deleteCity
            this.setState({
                clText: this.props.listCities.length - 1 ? 'text out' : 'text'
            });
        };
    };
    
    render() {
        return (
            <div className="weather">
                <Menu navClass={this.navClass} clText={this.state.clText} />
                <div className="container main">
                    <h1>Погода в городах мира</h1>
                    <Form onAddCity={this.addCity.bind(this)} />
                    <span className={this.state.selector}>{this.state.answer}</span>
                    <div className='row'>
                        <main>
                            <div className={this.state.clText}>Нет выбранных городов</div>
                            {this.props.listCities.map( (item, index) => 
                                <article key={index}>
                                    <div className="name">{item.name}</div>
                                    <div className="icon"><img src={this.getIcon(item.clouds)} /></div>
                                    <div className="other">Температура: {item.temp} &#8451;</div>
                                    <div className="other">Облачность: {item.clouds}&#37;</div>
                                    <div className="other">Влажность: {item.humidity}&#37;</div>
                                    <div className="other">Давление: {item.pressure} мм рт.ст</div>
                                    <div className="other">Направление ветра: {item.direction}&deg;</div>
                                    <div className="other">Скорость ветра: {item.speed} м/с</div>
                                    <span 
                                        className='x-svg' 
                                        onClick={this.deleteCity(index)}
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
    }
};

export default connect(
    state => ({
        listCities: state.listCities
    }),
    dispatch => ({
        onAddCity: ob => {
            dispatch({type: 'ADD', city: ob});
        },
        onDeleteCity: ob => {
            dispatch({type: 'DELETE', city: ob});
        },
        onInitCities: arr => {
            dispatch({type: 'INIT', arr: arr});
        }
    })
)(Weather);
