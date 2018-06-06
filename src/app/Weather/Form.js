import React from 'react';

class Form extends React.Component {
    
    inputCity = {};
    
    async handleAddCity() {
        const city = this.inputCity.value;
        if(this.inputCity.value) {
            this.inputCity.value = 'Подождите...';
        }
        await this.props.addCity(city);
    };
    
    render() {
        this.inputCity.value = '';
        return (
            <div className='weather-form'>
                <p>
                    Введите название города на английском, чтобы узнать текущую погоду.
                    Например, Novosibirsk или Moscow.
                </p>
                <div className="form-row">
                    <div className="form-left">
                        <input 
                            type='text' name='city' 
                            placeholder='Введите название города на английском' 
                            ref={ v => this.inputCity = v } 
                        />
                    </div>
                    <div className="form-right">
                        <button type='button' onClick={this.handleAddCity.bind(this)}>Получить</button>
                    </div>
                </div>
            </div>
        );
    }
};


export default Form;
