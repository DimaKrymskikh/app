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
