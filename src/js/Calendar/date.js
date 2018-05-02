const date = new Date();
	
//Текущий месяц
export const month = {
	//Определяем год и месяц (в начальный момент - это год и месяц сегодняшнего числа)
	year: date.getFullYear(),
	month: date.getMonth()
};

const getNameMonth = (m) => {
    switch(m) {
        case 0: return "Январь";
        case 1: return "Февраль";
        case 2: return "Март";
        case 3: return "Апрель";
        case 4: return "Май";
        case 5: return "Июнь";
        case 6: return "Июль";
        case 7: return "Август";
        case 8: return "Сентябрь";
        case 9: return "Октябрь";
        case 10: return "Ноябрь";
        case 11: return "Декабрь";
    }
};
month.nameMonth = getNameMonth(month.month);

//Находим день недели 1-го числа месяца
const getFirstDay = (day, date) => {
    let first =	day - (date - 1) % 7;
    if(first < 0) {
        first += 7;
    }
    return first;
};
month.firstDay = getFirstDay(date.getDay(), date.getDate());

//Получаем последний день месяца m
const getLastDate = (m, y) => {
    switch(m) {
        case 0: case 2: case 4: case 6: case 7: case 9: case 11: 
                return 31;
        case 3: case 5: case 8: case 10: 
                return 30;
        case 1:
            if(y % 4) {
                return 28;
            } else {
                return 29 ;
            }
    }
};
//Находим последний день месяца
month.lastDate = getLastDate(month.month, month.year);

//Получаем день недели последнего дня месяца
const getLastDay = (m, day, mDate, year) => {
    switch(m) {
        case 0: case 2: case 4: case 6: case 7: case 9: case 11: 
                return (day + (31 - mDate) % 7) % 7;
        case 3: case 5: case 8: case 10: 
                return (day + (30 - mDate) % 7) % 7;
        case 1:
            if(year % 4) {
                return (day + (28 - mDate) % 7) % 7;
            } else {
                return (day + (29 - mDate) % 7) % 7;
            }
    }
};
//Находим день недели последнего дня месяца
month.lastDay = getLastDay(month.month, date.getDay(), date.getDate(), month.year);

//Получаем последний день предыдущего месяца для месяца m
const getLastDatePreviousMonth = (m, y) => {
    switch(m) {
        case 0: case 1: case 3: case 5: case 7: case 8: case 10: 
                return 31;
        case 4: case 6: case 9: case 11: 
                return 30;
        case 2:
            if(y % 4) {
                return 28;
            } else {
                return 29;
            }
    }
};
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