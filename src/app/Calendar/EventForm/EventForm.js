import React from 'react';
import { connect } from 'react-redux';

import { refreshNotes } from '../../actions/calendar/list-notes';

import IconCross from '../../IconCross/IconCross';

import './EventForm.less';

const EventForm = ({listMonths, selectedDay, outForm, onRefreshNotes}) => {
    
    let inputEvent;
    let inputParticipants;
    let textareaDescription;
    
    //Получаем доступ к форме
    const monitor = document.getElementsByClassName("monitor")[0];
    const form = document.getElementsByClassName("form")[0];
    
    //Создаём или редактируем запись в хранилище
    const addNote = (d, m, y) => {
        return () => {
            //Создам ключ по дате дня
            var key = d.toString() + "." + m.toString() + "." + y.toString();

            var value = inputEvent.value + "{||}" + inputParticipants.value + "{||}" + textareaDescription.value;
            //Делаем запись в хранилище
            localStorage.setItem(key, value);

            monitor.classList.remove("in");
            form.classList.remove("in");
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
            //Создам ключ по дате дня
            var key = d.toString() + "." + m.toString() + "." + y.toString();

            localStorage.removeItem(key);

            //Убираем форму
            monitor.classList.remove("in");
            form.classList.remove("in");
            //Очищаем поля формы
            inputEvent.value = "";
            inputParticipants.value = "";
            textareaDescription.value = "";
            
            // Обновляем записи календаря
            onRefreshNotes();
	};
    };
    
    const handleSubmit = e => {
        e.preventDefault();
    };
    
    return (
        <div className="EventForm">
            <div className="monitor" onClick={outForm}></div>
            <div className='form'>
                <IconCross action = {outForm} title = {'Закрыть'} />
                <form name="event" onSubmit={handleSubmit}>
                    <div className="form-date">
                        {`${selectedDay.day}.${selectedDay.month}.${selectedDay.year}`}
                    </div>
                    <div className="field">
                        <input type="text" name="event"  placeholder="Событие" 
                            ref={ v => inputEvent = v }
                        />
                    </div>
                    <div className="field">
                        <input type="text" name="participants"  placeholder="Участники" 
                            ref={ v => inputParticipants = v }
                        />
                    </div>
                    <div className="field">
                        <textarea rows="8" cols="45" name="description" placeholder="Описание"
                            ref={ v => textareaDescription = v }
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
        </div>
    );
};

const mapStateToProps = state => ({
    listMonths: state.listMonths
});

const mapDispatchToProps = dispatch => ({
    onRefreshNotes: () => {
        dispatch(refreshNotes());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventForm);
