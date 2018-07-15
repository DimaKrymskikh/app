import React from 'react';
import { connect } from 'react-redux';

import { setActiveSection } from '../actions/menu';

class Description extends React.Component {
    
    componentDidMount() {
        this.props.onSetActiveSection('tasks');
    }
    
    render() {
        return (
            <div className='Description'>
                <h1>Описание задач</h1>
                <h2>Пагинация</h2>
                <p>
                    Генерируются страницы с пагинацией.
                    Можно менять число страниц, что позволяет рассмотреть разные режимы пагинации.
                </p>
                <h2>Карусель</h2>
                <p>
                    Рассматривается пример адаптивной карусели.
                </p>
                <h2>Викторина</h2>
                <p>
                    Викторина из пяти вопросов по творчеству Александра Сергеевича Пушкина.
                </p>
                <h2>Геолокация</h2>
                <p>
                    Определяется местоположение при помощи интерфейса&ensp;
                    <a 
                        href='https://developer.mozilla.org/en-US/docs/Web/API/Geolocation' 
                        target='_blank' 
                        rel="noopener noreferrer" 
                    >
                        Geolocation
                    </a>.
                    Данные позиционируются на&ensp;
                    <a href='https://tech.yandex.ru/maps/jsapi/' target='_blank' rel="noopener noreferrer" >
                        JavaScript API Яндекс.Карт
                    </a>.
                </p>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    onSetActiveSection: name => dispatch(setActiveSection(name))
});

export default connect(
    null,
    mapDispatchToProps
)(Description);
