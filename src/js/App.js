import React from 'react';

import Menu from './Menu';
import Footer from './Footer';

const App = () => {
    
    const navClass = ['nav', 'nav'];
    
    return (
        <div className="app">
            <Menu navClass={navClass} />
            <div className="container main">
                <h1>Описание работы</h1>
                <p>В этой работе два приложения</p>
                <h2>Календарь</h2>
                <p>Календарь позволяет перелистывать месяцы, делать запись планируемого события в выбранный день.
                События записываются в локальном хранилище браузера.
                Осуществлён поиск событий по названию события.
                </p>
                <h2>Погода</h2>
                <p>Это приложение использует услуги сервиса&ensp;
                <a href='https://openweathermap.org/api' target='_blank'>OpenWeatherMap</a>.
                Для заданного города становятся доступны характеристики погоды.
                Города сохраняются в локальном хранилище браузера.
                Осуществлена сортировка городов.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default App;
