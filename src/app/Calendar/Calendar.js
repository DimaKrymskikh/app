import React from 'react';
import { connect } from 'react-redux';

import { setActivePage } from '../actions/menu';

import EventForm from './EventForm/EventForm';
import Top from './Top';
import Week from './Week';
import Month from './Month';

import './Calendar.less';

class Calendar extends React.Component {
            
    constructor(props) {
        super(props);
        this.state = {
            day: {
                day: null,
                month: null,
                year: null
            }
        };
    }
    
    componentDidMount() {
        this.props.onSetActivePage('calendar');
        this.monitor = document.getElementsByClassName("monitor")[0];
        this.form = document.getElementsByClassName("form")[0];
        //Получаем доступ к форме
        this.formEvent = document.forms["event"];
        this.inputEvent = this.formEvent["event"];
        this.inputParticipants = this.formEvent["participants"];
        this.textareaDescription = this.formEvent["description"];
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

            this.monitor.classList.toggle("in");
            this.form.classList.toggle("in");

            this.monitor.style.width = window.innerWidth + "px";
            this.monitor.style.height = window.innerHeight + "px";

            var x = this.form.offsetWidth;
            var y = this.form.offsetHeight;
            this.form.style.top = (window.innerHeight - y)/2 + "px";
            this.form.style.left = (window.innerWidth - x)/2 + "px";

            //Создам ключ по дате дня
            var key = d.toString() + "." + (m + 1).toString() + "." + year.toString();

            //Если на этот день есть запись в хранилище, то ею заполняются поля формы
            var note = localStorage.getItem(key);
            var formValue = [];
            if(note) {
                formValue = note.split("{||}");
                this.inputEvent.value = formValue[0];
                this.inputParticipants.value = formValue[1];
                this.textareaDescription.value = formValue[2];
            }
        };
    };

    
    outForm() {
        this.monitor.classList.remove("in");
        this.form.classList.remove("in");
        //Очищаем поля формы
        this.inputEvent.value = "";
        this.inputParticipants.value = "";
        this.textareaDescription.value = "";
    };

    render() {
        return (
            <div className="Calendar">
                <div className="container main calendar">
                    <EventForm
                        outForm={this.outForm.bind(this)}
                        selectedDay={this.state.day}
                    />
                    <h1>Календарь событий</h1>
                    <Top />
                    <Week />
                    <Month visibilityForm={this.visibilityForm.bind(this)} />
                </div>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    onSetActivePage: name => dispatch(setActivePage(name))
});

export default connect(
    null,
    mapDispatchToProps
)(Calendar);
