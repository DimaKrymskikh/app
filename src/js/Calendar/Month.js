import React from 'react';
import { connect } from 'react-redux';

const Month = ({listMonths, visibilityForm}) => {
	
    return (
        <ul className="month">
            {listMonths.allDays.map( (item, index) => (
                <li 
                    className="month-day" key={index} 
                    onClick={visibilityForm(item.date, item.month, item.year)}
                >
                    <div 
                        className={`${item.clName} ${item.ev}`}
                    >
                        <div className="date">{item.date}</div>
                        <div className="note-ev">{item.event}</div>
                        <div className="note-p">{item.participants}</div>
                        <div className="note-d">{item.description}</div>
                    </div>
                </li>
            ))}
        </ul>
    );
};


export default connect(
    state => ({
        listMonths: state.listMonths
    })
)(Month);
