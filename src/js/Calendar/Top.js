import React from 'react';
import { connect } from 'react-redux';

import magnifyingGlass from '../../svg/magnifying-glass.svg'
import caretLeft from '../../svg/caret-left.svg'
import caretRight from '../../svg/caret-right.svg'

const Top = ({listMonths, listEvents, onMonthUp, onMonthDown, onChangeNotes, onRefreshNotes}) => {
    
    let inputSearch;
    
    const list = listEvents.map( (item, index) => {
        const pat = new RegExp(inputSearch, "i");
        if(inputSearch) {
            if( pat.test(item.event.toString()) ) {
                return (
                    <li key={index}>{`${item.key}: ${item.event}`}</li>
                );
            }
        } else {
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
        onRefreshNotes();
    };
    
    const change = () => {
        onChangeNotes(inputSearch.value);
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
                            ref={ v => {inputSearch = v} }
                        />
                        <div className="search-list">
                            <ul className="list-notes">{list}</ul>
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

export default connect(
    state => ({
        listMonths: state.listMonths,
        listEvents: state.listEvents
    }),
    dispatch => ({
        onMonthUp: () => {
            dispatch({type: 'PLUS'});
        },
        onMonthDown: () => {
            dispatch({type: 'MINUS'});
        },
        onChangeNotes: (str) => {
            dispatch({type: 'EVENTS_FILTER', str: str});
        },
        onRefreshNotes: () => {
            dispatch({type: 'NOTES_CHANGE'});
        }
    })
)(Top);
