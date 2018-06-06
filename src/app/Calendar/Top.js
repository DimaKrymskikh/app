import React from 'react';
import { connect } from 'react-redux';

import { notes, refreshStrInput, monthUp, monthDown } from '../actions/calendar/list-notes';

import magnifyingGlass from '../../assets/svg/magnifying-glass.svg';
import caretLeft from '../../assets/svg/caret-left.svg';
import caretRight from '../../assets/svg/caret-right.svg';

const Top = ({ listMonths, listEvents, onMonthUp, onMonthDown, onRefreshStrInput }) => {
    
    let inputSearch = {};
    
    const list = listEvents.map( (item, index) => {
        const pat = new RegExp(inputSearch.value, "i");
        if(inputSearch) {
            // Если поле ввода заполнено, рендерим события, прошедшие тест
            if( pat.test(item.event.toString()) ) {
                return (
                    <li key={index}>{`${item.key}: ${item.event}`}</li>
                );
            }
        } else {
            // Если поле ввода пусто, рендерим все события
            return (
                <li key={index}>{`${item.key}: ${item.event}`}</li>
            );
        }
    });
    
    const visibilityListNotes = () => {
        let listNotes = document.getElementsByClassName("list-notes")[0];
        listNotes.classList.add("in");
    };
    
    const hideListNotes = () => {
        let listNotes = document.getElementsByClassName("list-notes")[0];
        listNotes.classList.remove("in");
        let search = document.getElementsByClassName("search")[0];
        search.classList.remove("in");
        // Очищаем поле
        inputSearch.value = '';
        // Получаем исходный список
        onRefreshStrInput('');
    };
    
    const change = () => {
        onRefreshStrInput(inputSearch.value);
    };
    
    const visibilitySearch = () => {
        let search = document.getElementsByClassName("search")[0];
        search.classList.add("in");
    };
    
    const monthUp = () => {
        onMonthUp();
    };
    
    const monthDown = () => {
        onMonthDown();
    };

    return (
        <div className="calendar-top">
            <div className="right-col">
                <div className="search">
                    <div className="search-field">
                        <input 
                            type="text" 
                            placeholder="Поиск событий" 
                            onFocus={visibilityListNotes}
                            onBlur={hideListNotes}
                            onChange={change}
                            ref={ v => inputSearch = v }
                        />
                        <div className="search-list">
                            <ul className="list-notes">{
                                listEvents.length ? list
                                    : <li>Нет событий, удовлетворяющих условию, или Вы ещё не задали ни одного события</li>
                            }</ul>
                        </div>
                    </div>
                    <img 
                        src={magnifyingGlass}
                        className="magnifying-glass" 
                        title="Поиск событий" 
                        onClick={visibilitySearch}
                    />
                </div>
            </div>
            <div className="left-col">
                <img 
                    src={caretLeft} 
                    title="Вперёд в будущее"
                    onClick={monthUp}
                />
                <span className="month-year">
                    {`${listMonths.nameMonth} ${listMonths.year}`}
                </span>
                <img 
                    src={caretRight} 
                    title="Назад в прошлое"
                    onClick={monthDown}
                />
            </div>
        </div>
    );
};


const mapStateToProps = state => ({
    listMonths: state.listMonths.month,
    listEvents: notes.getList(state.listMonths.str)
});

const mapDispatchToProps = dispatch => ({
    onMonthUp: () => dispatch( monthUp() ),
    onMonthDown: () => dispatch( monthDown() ),
    onRefreshStrInput: str => dispatch( refreshStrInput(str) )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Top);
