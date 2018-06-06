import { listCities, filterCities } from './list-cities';

const initState = { 
    isLoad: false,      
    cities: [],         
    buttons: [],        
    num: 0,             
    active: 1           
};

const a = {
    name: 'A',
    repeatFetch: false
};
const b = {
    name: 'B',
    repeatFetch: false
};
const c = {
    name: 'C',
    repeatFetch: false
};

const p1 = {
    id: 1
};
const p2 = {
    id: 2
};
    
describe('listCities', () => {

    it('CLEARED_CITIES: устанавливаем начальное состояние', () => {
        expect(
            listCities( undefined, {
                type: 'CLEARED_CITIES'
            }) 
        ).toEqual(initState);
    });

    it('INIT_CITIES: нет городов в локальном хранилище', () => {
        expect(
            listCities( undefined, {
                type: 'INIT_CITIES', 
                cities: [],
                buttons: [], 
                num: 2, 
                active: 1
            }) 
        ).toEqual({
            isLoad: true,
            cities: [],
            buttons: [], 
            num: 2, 
            active: 1
        });
    });

    it('ADD_CITY: повтор города при добавлении, кнопка не добавляется', () => {
        expect(
            listCities({
                isLoad: true, 
                cities: [a, b],
                buttons: [p1], 
                num: 2, 
                active: 1
            }, {
                type: 'ADD_CITY',
                city: a
            })
        ).toEqual({
            isLoad: true, 
            cities: [a, b],
            buttons: [p1], 
            num: 2, 
            active: 1
        });
    });
    it('ADD_CITY: новый город при добавлении, кнопка добавляется', () => {
        expect(
            listCities({
                isLoad: true, 
                cities: [a, b],
                buttons: [p1], 
                num: 2, 
                active: 1
            }, {
                type: 'ADD_CITY',
                city: c
            })
        ).toEqual({
            isLoad: true, 
            cities: [c, a, b],
            buttons: [p1, p2], 
            num: 2, 
            active: 1
        });
    });

    it('DELETE_CITY: удаление города, кнопка удаляется', () => {
        expect(
            listCities({
                cities: [a, b, c],
                buttons: [p1, p2], 
                num: 2, 
                active: 2
            }, {
                type: 'DELETE_CITY', 
                city: b
            })
        ).toEqual({
            cities: [a, c],
            buttons: [p1], 
            num: 2, 
            active: 2 // Активная кнопка изменяется в mapStateToProps, так как кнопки пагинации могут уменьшатся при фильтрации
        });
    });

    it('SORT_CITIES: сортировка (по имени)', () => {
        expect(
            listCities({
                cities: [b, c, a]
            }, {
                type: 'SORT_CITIES', 
                par: "name"
            })
        ).toEqual({
            cities: [a, b, c]
        });
    });

    it('CITIES_REFRESHACTIVE_BUTTON: переход с 1-й на 2-ю страницу', () => {
        expect(
            listCities({
                isLoad: true,
                cities: [a, b, c],
                buttons: [p1, p2], 
                num: 2, 
                active: 1
            }, {
                type: 'CITIES_REFRESHACTIVE_BUTTON', 
                n: 2
            })
        ).toEqual({
            isLoad: true,
            cities: [a, b, c],
            buttons: [p1, p2], 
            num: 2, 
            active: 2
        });
    });

    it('SET_REAPEATFETCH_TRUE: устанавоиваем "repeatFetch: true" для одного города', () => {
        expect(
            listCities({
                cities: [a, b]
            }, {
                type: 'SET_REAPEATFETCH_TRUE', 
                name: 'B'
            })
        ).toEqual({
            cities: [a, {name: 'B', repeatFetch: true}]
        });
    });

    it('SET_REAPEATFETCH_FALSE: устанавоиваем "repeatFetch: false" для одного города', () => {
        expect(
            listCities({
                cities: [{name: 'A', repeatFetch: true}, {name: 'B', repeatFetch: true}]
            }, {
                type: 'SET_REAPEATFETCH_FALSE', 
                name: 'B'
            })
        ).toEqual({
            cities: [{name: 'A', repeatFetch: true}, b]
        });
    });

});

describe('filterCities', () => {
    it('FILTER_CITIES: возвращаем action при любых начальных данных', () => {
        expect(
            filterCities( undefined, {
                type: 'FILTER_CITIES',
                filters: {
                    minTemp: -5,
                    maxTemp: -11,
                    minSpeed: 15,
                    maxSpeed: -2
                }
            }) 
        ).toEqual({
            minTemp: -5,
            maxTemp: -11,
            minSpeed: 15,
            maxSpeed: -2
        });
    });
});
