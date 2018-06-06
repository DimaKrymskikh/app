import React from 'react';

import { defaultMinTemp, defaultMaxTemp, defaultMinSpeed, defaultMaxSpeed } from '../reducers/list-cities'

const Aside = ({ onSortCities, onFilterCities, filterCities }) => {
    
    let minTemp = filterCities.minTemp;
    let maxTemp = filterCities.maxTemp;
    let minSpeed = filterCities.minSpeed;
    let maxSpeed = filterCities.maxSpeed;
    
    const aside = document.querySelector('aside');
    
    const parWeather = [
        'названию',
        'температуре',
        'облачности',
        'влажности',
        'давлению',
        'направлению ветра',
        'скорости ветра'
    ];
    
    const nameSort = (index) => {
        return e => {
            let par = '';
            switch(index) {
                case 0: par = 'name'; break;
                case 1: par = 'temp'; break;
                case 2: par = 'clouds'; break;
                case 3: par = 'humidity'; break;
                case 4: par = 'pressure'; break;
                case 5: par = 'direction'; break;
                case 6: par = 'speed'; break;
            }
            onSortCities(par);
            // Ставим и убираем галочку
            let aside = document.querySelector('aside');
            let li = aside.querySelectorAll('li');
            for(let i = 0; i < li.length; i++) {
                if(e.currentTarget === li[i]) {
                    li[i].querySelector('span').classList.add('in');
                } else {
                    li[i].querySelector('span').classList.remove('in');
                }
            }
            
        };
    };
    
    const handleChange = (e) => {
        e.target.value = e.target.value.replace(/[^-\d]/g, ''); // Не очень хорошо, но лучше не придумал (регулярное выражение)
        onFilterCities({
            minTemp: minTemp.value, 
            maxTemp: maxTemp.value, 
            minSpeed: minSpeed.value, 
            maxSpeed: maxSpeed.value
        });
    };
    
    const clearedFilter = (e) => {
        minTemp.value = defaultMinTemp;
        maxTemp.value = defaultMaxTemp;
        minSpeed.value = defaultMinSpeed;
        maxSpeed.value = defaultMaxSpeed;
        handleChange(e);
    };
    
    const handleAside = () => {
        aside.classList.toggle('in');
    };
    
    return (
        <aside>
            <div className="aside-button" onClick={handleAside}>
                <span></span>
            </div>
            <ul><p>Сортировать по </p>
            {
                parWeather.map( (item, index) =>
                    <li key={index} onClick={nameSort(index)}>{item}
                        <span>{'\u2713'}</span>
                    </li>
                )
            }
            </ul>
            <h2>Фильтровать города</h2>
            <h3>по температуре</h3>
            <div>
                <span>от</span>
                <input 
                    type="text" 
                    defaultValue={filterCities.minTemp}
                    ref={ v => minTemp = v }
                    onChange={ handleChange }
                />
                <span>до</span>
                <input 
                    type="text" 
                    defaultValue={filterCities.maxTemp}
                    ref={ v => maxTemp = v }
                    onChange={ handleChange }
                />
            </div>
            <h3>по скорости ветра</h3>
            <div>
                <span>от</span>
                <input 
                    type="text" 
                    defaultValue={filterCities.minSpeed}
                    ref={ v => minSpeed = v }
                    onChange={ handleChange }
                />
                <span>до</span>
                <input 
                    type="text" 
                    defaultValue={filterCities.maxSpeed}
                    ref={ v => maxSpeed = v }
                    onChange={ handleChange }
                />
            </div>
            <button type='button' onClick={ clearedFilter }>Очистить</button>
        </aside>
    );
};

export default Aside;