
export const getNameMonth = (m) => {
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


// Находим день недели 1-го числа месяца
export const getFirstDay = (day, date) => {
    let first =	day - (date - 1) % 7;
    if(first < 0) {
        first += 7;
    }
    return first;
};

// Получаем последний день месяца m
export const getLastDate = (m, y) => {
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

// Получаем день недели последнего дня месяца
export const getLastDay = (m, day, mDate, year) => {
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

// Получаем последний день предыдущего месяца для месяца m
export const getLastDatePreviousMonth = (m, y) => {
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
