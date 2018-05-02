import React from 'react';

import Menu from './Menu';
import Form from './Calendar/Form';
import Top from './Calendar/Top';
import Week from './Calendar/Week';
import Month from './Calendar/Month';
import Footer from './Footer';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navClass: ['nav active', 'nav'],
            day: {
                day: null,
                month: null,
                year: null
            }
        };
    }
    
    visibilityForm(d, m, year) {
        
        return () => {
            this.setState({
                day: {
                    day: d,
                    month: m + 1,
                    year: year
                }
            });

            //Получаем доступ к форме
            var monitor = document.getElementsByClassName("monitor")[0];
            var eventForm = document.getElementsByClassName("event-form")[0];
            var formEvent = document.forms["event"];
            var inputEvent = formEvent["event"];
            var inputParticipants = formEvent["participants"];
            var textareaDescription = formEvent["description"];

            monitor.classList.toggle("in");
            eventForm.classList.toggle("in");

            monitor.style.width = window.innerWidth + "px";
            monitor.style.height = window.innerHeight + "px";

            var x = eventForm.offsetWidth;
            var y = eventForm.offsetHeight;
            eventForm.style.top = (window.innerHeight - y)/2 + "px";
            eventForm.style.left = (window.innerWidth - x)/2 + "px";

            //Создам ключ по дате дня
            var key = d.toString() + "." + (m + 1).toString() + "." + year.toString();

            //Если на этот день есть запись в хранилище, то ею заполняются поля формы
            var note = localStorage.getItem(key);
            var formValue = [];
            if(note) {
                formValue = note.split("{||}");
                inputEvent.value = formValue[0];
                inputParticipants.value = formValue[1];
                textareaDescription.value = formValue[2];
            }
        };
    };

    
    outForm() {
        //Получаем доступ к форме
        var monitor = document.getElementsByClassName("monitor")[0];
        var eventForm = document.getElementsByClassName("event-form")[0];
        var formEvent = document.forms["event"];
        var inputEvent = formEvent["event"];
        var inputParticipants = formEvent["participants"];
        var textareaDescription = formEvent["description"];

        monitor.classList.remove("in");
        eventForm.classList.remove("in");
        //Очищаем поля формы
        inputEvent.value = "";
        inputParticipants.value = "";
        textareaDescription.value = "";
    };

    render() {
        return (
            <div className="calendar">
                <Menu navClass={this.state.navClass} />
                <div className="container main calendar">
                    <div className="monitor" onClick={this.outForm}></div>
                    <Form
                        outForm={this.outForm}
                        selectedDay={this.state.day}
                    />
                    <h1>Календарь событий</h1>
                    <Top />
                    <Week />
                    <Month visibilityForm={this.visibilityForm.bind(this)} />
                </div>
                <Footer />
            </div>
        );
    }
};

export default Calendar;
