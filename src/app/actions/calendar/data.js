import { getNameMonth, getFirstDay, getLastDate, getLastDay, getLastDatePreviousMonth } from './support';

const date = new Date();
	
//Текущий месяц
export const month = {
	//Определяем год и месяц (в начальный момент - это год и месяц сегодняшнего числа)
	year: date.getFullYear(),
	month: date.getMonth()
};

month.nameMonth = getNameMonth(month.month);
month.firstDay = getFirstDay(date.getDay(), date.getDate());
//Находим последний день месяца
month.lastDate = getLastDate(month.month, month.year);
//Находим день недели последнего дня месяца
month.lastDay = getLastDay(month.month, date.getDay(), date.getDate(), month.year);
//Находим день недели последнего дня предыдущего месяца
month.lastDatePreviousMonth = getLastDatePreviousMonth(month.month, month.year);

const getAllDays = () => {
    var days = [];

    //Если первый день месяца - воскресенье
    if(!month.firstDay) {
        month.firstDay += 7;
    }
    //Находим дни предыдущего месяца
    for (var i = month.firstDay - 1, k = 0; i > 0; i--) {
        days[i-1] = {
            month: month.month-1,
            date: month.lastDatePreviousMonth - k,
            clName: "out",
            ev: "",
            event: "",
            participants: "",
            description: ""
        };
        
        if(month.month === 0) {
            days[i-1].year = month.year - 1;
        } else {
            days[i-1].year = month.year;
        }
        k++;
    }

    //Находим дни текущего месяца
    for (i = 0; i < month.lastDate; i++) {
        days[i + month.firstDay - 1] = {
            year: month.year,
            month: month.month,
            date: i + 1,
            clName: "yes",
            ev: "",
            event: "",
            participants: "",
            description: ""
        };
        if(i + 1 === date.getDate() && month.month === date.getMonth() && month.year === date.getFullYear()) {
            days[i + month.firstDay - 1].clName = "today";
        }
    }

    //Находим дни следующего месяца
    if(month.lastDay) {
        for (i = month.lastDay, k = 1; i < 7; i++) {
            days.push({
                month: month.month + 1,
                date: k,
                clName: "out",
                ev: "",
                event: "",
                participants: "",
                description: ""
            });
            if(month.month === 11) {
                days[days.length -1].year = month.year + 1;
            } else {
                days[days.length -1].year = month.year;
            }
            k++;
        }
    }
    //Заполняем страницу календаря событиями
    return getNote(days);
};

month.allDays = getAllDays();

//Функция, заполняющая страницу календаря событиями
function getNote(arr) {
    //Проверяем дни на наличие событий в хранилище
    arr.map(function(item) {
        //Создаём ключ, определяющий наличие событий
        var key = item.date.toString() + "." + (item.month +1).toString() + "." + item.year.toString();
        //Если есть событие с таким ключом, то выделяем день
        if(localStorage.getItem(key)) {
            var note = localStorage.getItem(key);
            var arr = note.split("{||}");
            item.event = arr[0];
            item.participants = arr[1];
            item.description = arr[2];

            if(item.year > date.getFullYear()) {
                item.ev = "event";
            } else if(item.month > date.getMonth() && item.year === date.getFullYear()) {
                item.ev = "event";
            } else if(item.date >= date.getDate() && item.month === date.getMonth() && item.year === date.getFullYear()) {
                item.ev = "event";
            } else {
                item.ev = "event_old";
            }
        } else {
            //Удаляем цвет
            item.ev = "";
            //Удаляем записи
            item.event = "";
            item.participants = "";
            item.description = "";
        }
        return item;
    });
    return arr;
}

//Идём в будущее
export const monthUp = () => {
    month.month++;
    if(month.month === 12) {
        month.month = 0;
        month.year++;
    }
    month.nameMonth = getNameMonth(month.month);

    month.firstDay = (month.lastDay + 1) % 7;
    month.lastDay = getLastDay(month.month, month.firstDay, 1, month.year);
    month.lastDate = getLastDate(month.month, month.year);
    month.lastDatePreviousMonth = getLastDatePreviousMonth(month.month, month.year);
    month.allDays = getAllDays();
    
    let ob = Object.assign({}, month);
    
    return ob;
};


//Возвращаемся в прошлое
export const monthDown = () => {
    month.month--;
    if(month.month === -1) {
        month.month += 12;
        month.year--;
    }
    month.nameMonth = getNameMonth(month.month);

    month.lastDay = month.firstDay - 1;
    if(month.lastDay < 0) {
        month.lastDay += 7;
    }
    month.lastDate = getLastDate(month.month, month.year);
    month.firstDay = getFirstDay(month.lastDay, month.lastDate);
    month.lastDatePreviousMonth = getLastDatePreviousMonth(month.month, month.year);
    month.allDays = getAllDays();
    
    let ob = Object.assign({}, month);
    
    return ob;
};

export const getMonth = () => {
    month.allDays = getAllDays();
    let ob = Object.assign({}, month);
    return ob;
};