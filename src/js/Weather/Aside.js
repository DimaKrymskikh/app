import React from 'react';
import { connect } from 'react-redux';

const Aside = ({cities, onNameSort}) => {
    
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
            onNameSort(par);
            // Ставим и убираем галачку
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
    
    return (
        <aside>
        <ul><p>Сортировать по </p>
            {
                parWeather.map( (item, index) =>
                    <li key={index} onClick={nameSort(index)}>{item}
                        <span>{'\u2713'}</span>
                    </li>
                )
            }
            </ul>
        </aside>
    );
};


export default connect(
    state => ({
        cities: state
    }),
    dispatch => ({
        onNameSort: par => {
            dispatch({
                type: 'SORT',
                par: par
            });
        }
    })
)(Aside);
