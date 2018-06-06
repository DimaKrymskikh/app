import React from 'react';
import { connect } from 'react-redux';

import { setActivePage } from '../actions/menu';
import { 
    clearedCitiesWeather, initCitiesWeather, refreshActive, 
    addCityWeather, deleteCityWeather, sortCitiesWeather,
    repeatFetchTrue, repeatFetchFalse, filterCitiesWeather
} from '../actions/weather/cities-weather';
import { initCities, fetchW } from '../actions/weather/get-cities';
import { getButtons } from '../actions/common';

import Form from './Form';
import Aside from './Aside';
import RowPagination from '../RowPagination/RowPagination';
import IconCross from '../IconCross/IconCross';
import Loader from '../Loader/Loader';

import './Weather.less';
import wiCloudy from '../../assets/svg/wi-cloudy.svg';
import wiDayCloudy from '../../assets/svg/wi-day-cloudy.svg';
import wiDaySunny from '../../assets/svg/wi-day-sunny.svg';
import wiRain from '../../assets/svg/wi-rain.svg';

// Число городов на странице
const numberCities = 6;

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selector: 'note',
            answer: ''
        };
        this.props.onSetActivePage('weather');
    }
    
    componentDidMount() {
        (async () => {
            const initStateCities = await initCities();
            this.props.onInitCitiesWeather(initStateCities, numberCities);
        })();
    }
    
    componentWillUnmount() {
        this.props.onClearedCitiesWeather();
    }
    
    getIcon(v) {
        if( v < 20 ) return wiDaySunny;
        if( 20 <= v && v < 50 ) return wiDayCloudy;
        if( 50 <= v && v < 80 ) return wiCloudy;
        if( 80 <= v  ) return wiRain;
    };
    
    async addCity(v) {
        if(!v) return;

        let obCity = await fetchW(v);

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
            this.props.onAddCityWeather(obCity);
        } else {
            this.setState({
                selector: 'note bad',
                answer: 'Город не найден \u2718' 
            });
        }
        setTimeout( this.setState.bind(this, {
            selector: 'note',
            answer: ''
        }), 3000);
    }
    
    newAddCity = v => async () => {
        this.props.onRepeatFetchTrue(v);
        await this.addCity(v);
        this.props.onRepeatFetchFalse(v);
    }
    
    deleteCity(index) {
        return () => {
            // Удаляем город из хранилища
            localStorage.removeItem(this.props.listCities.cities[index].name);
            // Удаляем город из store
            this.props.onDeleteCityWeather(this.props.listCities.cities[index]);
        };
    };
    
    render() {
        return (
            <div className="Weather">
                <div className="container main">
                    <h1>Погода в городах мира</h1>
                    <Form addCity={this.addCity.bind(this)} />
                    <span className={this.state.selector}>{this.state.answer}</span>
                    <div className='row'>
                        <main>
                            <div className="row-cities">
                                { this.props.isLoad ? '' : <Loader />}
                                <div className={this.props.listCities.cities.length || !this.props.isLoad ?
                                    'text out' : 'text'}>Нет выбранных городов</div>
                                {this.props.listCities.cities.map( (item, index) => { 
                                    if (item.err) {
                                        return (
                                            <article key={index}>
                                            {item.repeatFetch ?
                                                <div>
                                                    Выполняется запрос на сервер OpenWeatherMap.
                                                </div>
                                                :
                                                <div>
                                                    Сервер OpenWeatherMap вернул ошибку. 
                                                    Погода в городе {item.name} недоступна.
                                                </div>
                                            }
                                            {item.repeatFetch ? 
                                                <div 
                                                    className="await"
                                                >
                                                    <span>Подождите</span>
                                                </div>
                                                :
                                                <div 
                                                    className="new-attempt"
                                                    onClick={this.newAddCity(item.name).bind(this)}
                                                >
                                                    <span>Повторить</span>
                                                </div>
                                            }
                                                <IconCross
                                                    action={this.deleteCity.bind(this)}
                                                    index={index}
                                                    title = {'Удалить город'}
                                                />
                                            </article>);
                                    } else { 
                                        return (
                                            <article key={index}>
                                                <div className="name">{item.name}</div>
                                                <div className="icon"><img src={this.getIcon(item.clouds)} /></div>
                                                <div className="other">Температура: {item.temp} &#8451;</div>
                                                <div className="other">Облачность: {item.clouds}&#37;</div>
                                                <div className="other">Влажность: {item.humidity}&#37;</div>
                                                <div className="other">Давление: {item.pressure} мм рт.ст</div>
                                                <div className="other">Направление ветра: {item.direction}&deg;</div>
                                                <div className="other">Скорость ветра: {item.speed} м/с</div>
                                                <IconCross
                                                    action={this.deleteCity.bind(this)}
                                                    index={index}
                                                    title = {'Удалить город'}
                                                />
                                            </article>);
                                    }
                                })}
                            </div>
                            <RowPagination 
                                paginButtons={this.props.listCities.buttons} 
                                paginActive={this.props.listCities.active}
                                onRefreshActive={this.props.onRefreshActive} 
                            />
                        </main>
                        <Aside 
                            onSortCities={this.props.onSortCitiesWeather} 
                            onFilterCities={this.props.onFilterCitiesWeather}
                            filterCities={this.props.filterCities}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

const getVisibleCities = (listCities, filterCities, active, n) => {
    const cities = listCities.filter( (item, index) => {
        if(item.err) {
            return item.err;
        } else {
            return filterCities.minTemp <= item.temp &&
                item.temp <= filterCities.maxTemp &&
                filterCities.minSpeed <= item.speed &&
                item.speed <= filterCities.maxSpeed;
        }
    });
    const buttons = getButtons(cities.length, n);
    let act = active;
    while(act > buttons.length) {
        --act;
    };
    return {
        cities: cities.slice( (act - 1) * n , act * n ),
        buttons,
        active: act
    };
};

const mapStateToProps = state => ({
        listCities: getVisibleCities(
            state.listCities.cities, state.filterCities, state.listCities.active, state.listCities.num
        ),
        isLoad: state.listCities.isLoad,
        filterCities: state.filterCities
});

const mapDispatchToProps = dispatch => ({
        onClearedCitiesWeather: cities => dispatch( clearedCitiesWeather() ),
        onInitCitiesWeather: (cities, num) => dispatch( initCitiesWeather(cities, num) ),
        onAddCityWeather: city => dispatch( addCityWeather(city) ),
        onDeleteCityWeather: city => dispatch( deleteCityWeather(city) ),
        onSortCitiesWeather: par => dispatch( sortCitiesWeather(par) ),
        onRefreshActive: n => dispatch( refreshActive(n) ),
        onRepeatFetchTrue: name => dispatch( repeatFetchTrue(name) ),
        onRepeatFetchFalse: name => dispatch( repeatFetchFalse(name) ),
        
        onFilterCitiesWeather: filters => dispatch( filterCitiesWeather(filters) ),
        
        onSetActivePage: name => dispatch( setActivePage(name) )
});
    
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Weather);
