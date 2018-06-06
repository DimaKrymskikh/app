import { getNameMonth, getFirstDay, getLastDate, getLastDay, getLastDatePreviousMonth } from './support';

describe('support', () => {
    it('Получение имени месяца по числу', () => {
        expect(getNameMonth(1)).toBe('Февраль');
    });
    
    it('Получение дня недели 1-го числа месяца (октябрь 2018)', () => {
        expect(getFirstDay(0, 21)).toBe(1);
    });
    
    it('Получение последнего дня месяца (февраль 2020)', () => {
        expect(getLastDate(1, 2020)).toBe(29);
    });
    
    it('Получение дня недели последнего дня месяца (февраль 2020)', () => {
        expect(getLastDay(1, 3, 12, 2020)).toBe(6);
    });
    
    it('Получение последнего дня предыдущего месяца', () => {
        expect(getLastDatePreviousMonth(2, 2020)).toBe(29);
    });
});
