import React from 'react';
import { connect } from 'react-redux';

import {fetchW} from './help';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selector: 'note',
            answer: ''
        };
    }
    
    async addCity() {
        if(!this.inputCity.value) return;
        
        let obCity = await fetchW(this.inputCity.value);
    
        if(obCity.cod === 200) {
            this.setState({
                selector: 'note good',
                answer: 'Город добавлен \u2713'
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
        this.inputCity.value = '';
        setTimeout( this.setState.bind(this, {
            selector: 'note',
            answer: ''
        }), 3000);
    }
    
    render() {
        return (
            <div className='weather-form'>
                <p>
                    Введите название города на английском, чтобы узнать текущую погоду.
                    Например, Novosibirsk или Moscow.
                </p>
                <div className="form-row">
                    <div className="form-left">
                        <input type='text' name='city' placeholder='Город' ref={ v => {this.inputCity = v} } />
                    </div>
                    <div className="form-right">
                        <button type='button' onClick={this.addCity.bind(this)}>Получить</button>
                    </div>
                </div>
                <span className={this.state.selector}>{this.state.answer}</span>
            </div>
        );
    }
};


export default connect(
    state => ({
        cities: state
    }),
    dispatch => ({
        onAddCity: ob => {
            dispatch({type: 'ADD', city: ob});
        }
    })
)(Form);
