import React from 'react';
import { connect } from 'react-redux';

import { setActivePage } from '../actions/menu';

import './Main.less';

const Main = ({ onSetActivePage }) => {
    
    onSetActivePage('main');
    
    return (
        <div className="Main">
            <div className="container main">
                <h1>Описание работы</h1>
                <p>В этой работе два приложения и несколько простых задач.</p>
                <h2>Календарь</h2>
                <p>
                    Календарь позволяет перелистывать месяцы, делать запись планируемого события в выбранный день.
                    События записываются в локальном хранилище браузера.
                    Осуществлён поиск событий по названию события.
                </p>
                <h2>Погода</h2>
                <p>
                    Это приложение использует услуги сервиса&ensp;
                    <a href='https://openweathermap.org/api' target='_blank' rel="noopener noreferrer" >
                        OpenWeatherMap
                    </a>.
                    Для заданного города становятся доступны характеристики погоды.
                    Города сохраняются в локальном хранилище браузера.
                    Осуществлена сортировка и фильтрация городов.
                </p>
                <p className="note">
                    <span>Внимание. </span> 
                    При отсутствии доступа к сервису OpenWeatherMap приложение работает некорректно.
                </p>
                <h2>Задачи</h2>
                <p>
                    Несколько простых задач.
                </p>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    onSetActivePage: name => dispatch(setActivePage(name))
});

export default connect(
    null,
    mapDispatchToProps
)(Main);
