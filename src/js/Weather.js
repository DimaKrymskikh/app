import React from 'react';
import { connect } from 'react-redux';

import Menu from './Menu';
import Form from './Weather/Form';
import Aside from './Weather/Aside';
import Footer from './Footer';

import {initCities} from './Weather/help';

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
            clText: 'text out'
        };
        
    }
    componentDidMount() {
(async () => {
const initStateCities = await initCities();

console.log(initStateCities);
console.log(this.state.clText)
this.props.onInitCities(initStateCities);
this.setState({
    clText: this.props.listCities.length ? 'text out' : 'text'
});
console.log(this.state.clText)
})();

//this.props.dispatch({
//    type: 'INIT',
//    arr: initStateCities
//});
    }
    
    
    
    getIcon(v) {
        if( v < 20 ) return wiDaySunny;
        if( 20 <= v && v < 50 ) return wiDayCloudy;
        if( 50 <= v && v < 80 ) return wiCloudy;
        if( 80 <= v  ) return wiRain;
    };
    
    deleteCity(index) {
        return () => {
            // Удаляем город из хранилища
            localStorage.removeItem(this.props.listCities[index].name);
            // Удаляем город из store
            this.props.onDeleteCity(this.props.listCities[index]);
        };
    };
    
    render() {
        return (
            <div className="weather">
                <Menu navClass={this.navClass} />
                <div className="container main">
                    <h1>Погода в городах мира</h1>
                    <Form />
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
        onDeleteCity: ob => {
            dispatch({type: 'DELETE', city: ob});
        },
        onInitCities: arr => {
            dispatch({type: 'INIT', arr: arr})
        }
    })
)(Weather);
