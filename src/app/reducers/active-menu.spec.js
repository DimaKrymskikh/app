import { activeMenu, activeVerticalMenu } from './active-menu'

describe('activeMenu:', () => {
    it('SET_ACTIVE_PAGE: изменяется активная страница', () => {
       expect(
           activeMenu({
               name: 'A'
           }, {
               type: 'SET_ACTIVE_PAGE',
               name: 'B'
           })
        ).toEqual({
               name: 'B'
        });
    });
});

describe('activeVerticalMenu:', () => {
    it('SET_ACTIVE_SECTION: изменяется активный раздел (задача)', () => {
       expect(
           activeVerticalMenu({
               name: 'A'
           }, {
               type: 'SET_ACTIVE_SECTION',
               name: 'B'
           })
        ).toEqual({
               name: 'B'
        });
    });
});
