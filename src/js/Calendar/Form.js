import React from 'react';
import { connect } from 'react-redux';

import xSvg from '../../svg/x.svg';

const Form = ({listMonths, selectedDay, outForm, onRefreshNotes}) => {
    
    let inputEvent;
    let inputParticipants;
    let textareaDescription;
    
    //Создаём или редактируем запись в хранилище
    const addNote = (d, m, y) => {
        return () => {
            var monitor = document.getElementsByClassName("monitor")[0];
            var eventForm = document.getElementsByClassName("event-form")[0];
            
            //Создам ключ по дате дня
            var key = d.toString() + "." + m.toString() + "." + y.toString();

            var value = inputEvent.value + "{||}" + inputParticipants.value + "{||}" + textareaDescription.value;
            //Делаем запись в хранилище
            localStorage.setItem(key, value);

            monitor.classList.remove("in");
            eventForm.classList.remove("in");
            //Очищаем поля формы
            inputEvent.value = "";
            inputParticipants.value = "";
            textareaDescription.value = "";
            
            // Обновляем записи календаря
            onRefreshNotes();
        };
    };
    
    const removeNote = (d, m, y) => {
        return () => {
            //Получаем доступ к форме
            var monitor = document.getElementsByClassName("monitor")[0];
            var eventForm = document.getElementsByClassName("event-form")[0];

            //Создам ключ по дате дня
            var key = d.toString() + "." + m.toString() + "." + y.toString();

            localStorage.removeItem(key);

            //Убираем форму
            monitor.classList.remove("in");
            eventForm.classList.remove("in");
            //Очищаем поля формы
            inputEvent.value = "";
            inputParticipants.value = "";
            textareaDescription.value = "";
            
            // Обновляем записи календаря
            onRefreshNotes();
	};
    };
    
    return (
        <div className='event-form'>
            <span 
                className='x-svg' 
                onClick={outForm}
                title="Закрыть"
            >
                <img src={xSvg} />
            </span>
            <form name="event">
                <div className="form-date">
                    {`${selectedDay.day}.${selectedDay.month}.${selectedDay.year}`}
                </div>
                <div className="field">
                    <input type="text" name="event"  placeholder="Событие" 
                        ref={ v => { inputEvent = v } }
                    />
                </div>
                <div className="field">
                    <input type="text" name="participants"  placeholder="Участники" 
                        ref={ v => { inputParticipants = v } }
                    />
                </div>
                <div className="field">
                    <textarea rows="8" cols="45" name="description" placeholder="Описание"
                        ref={ v => { textareaDescription = v } }
                    ></textarea>
                </div>
                <div className="field-button">
                    <div className="button" onClick={addNote(selectedDay.day, selectedDay.month, selectedDay.year)}>
                        <div><input type="button" value="Готово" /></div>
                    </div>
                    <div className="button" onClick={removeNote(selectedDay.day, selectedDay.month, selectedDay.year)}>
                        <div><input type="button" value="Удалить" /></div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default connect(
    state => ({
        listMonths: state.listMonths
    }),
    dispatch => ({
        onRefreshNotes: () => {
            dispatch({type: 'NOTES_CHANGE'});
        }
    })
)(Form);
