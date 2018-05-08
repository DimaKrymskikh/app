import React from 'react';

const Form = ({onAddCity}) => {
    
    let inputCity = null;
    
    const addCity = () => {
        onAddCity(inputCity);
    };
    
    return (
        <div className='weather-form'>
            <p>
                Введите название города на английском, чтобы узнать текущую погоду.
                Например, Novosibirsk или Moscow.
            </p>
            <div className="form-row">
                <div className="form-left">
                    <input type='text' name='city' placeholder='Город' ref={ v => {inputCity = v} } />
                </div>
                <div className="form-right">
                    <button type='button' onClick={addCity}>Получить</button>
                </div>
            </div>
        </div>
    );
};


export default Form;
