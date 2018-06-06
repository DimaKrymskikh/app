import React from 'react';
import { connect } from 'react-redux';

import RowPagination from '../../RowPagination/RowPagination';
import { setCards, refreshActive } from '../../actions/pagination';
import { setActiveSection } from '../../actions/menu';

import './Pagination.less';

// Число карточек на странице
const numberCards = 10;

class Pagination extends React.Component {
    
    componentDidMount() {
        this.props.onSetActiveSection('pagination');
    }
    
    inputN = null;
    
    generateCards() {
        if(!this.inputN.value || this.inputN.value.length > 3) {
            this.inputN.value = '';
            this.props.onSetCards([], numberCards);
            return;
        }
        
        const nCards = Number(this.inputN.value);
        if( Number.isInteger(nCards) && nCards > 0 ) {
            const cards = [];
            for(let i = 1; i <= nCards; i++) {
                const ob = {
                    id: i
                };
                cards.push(ob);
            }
            this.props.onSetCards(cards, numberCards);
            return;
        } else {
            this.inputN.value = '';
            this.props.onSetCards([], numberCards);
            return;
        }
    };
    
    render() {
        return (
            <div className='Pagination'>
                <h1>Пагинация</h1>
                <p>
                    Для проверки работоспособности пагинации введите положительное целое число меньшее 1000.
                    На одной странице будет размещено 10 пронумерованных по порядку карточек.
                    Изменяя число карточек, можно опробовать разные варианты пагинации.
                </p>
                <div className='input-button'>
                    <div className='field-input'>
                        <input 
                            type='text' 
                            placeholder='Введите положительное целое число меньшее 1000' 
                            ref={v => this.inputN = v} 
                        />
                    </div>
                    <div className='field-button'>
                        <button type="button" onClick={this.generateCards.bind(this)}>
                            Получить
                        </button>
                    </div>
                </div>
                <div className="list-cards">
                    {this.props.listCards.map( (item, index) => 
                        <article key={index}>
                            <div className="card">
                                <h2>{item.id}</h2>
                            </div>
                        </article>
                    )}
                </div>
                <RowPagination 
                    paginButtons={this.props.paginButtons} 
                    paginActive={this.props.paginActive}
                    onRefreshActive={this.props.onRefreshActive} 
                />
            </div>
        );
    };
};


const getVisibleCards = (arr, active, n) =>
    arr.slice( (active - 1) * n , active * n );

const mapStateToProps = state => ({
    listCards: getVisibleCards(state.listCards.cards, state.listCards.active, state.listCards.num),
    paginButtons: state.listCards.buttons,
    paginActive: state.listCards.active
});

const mapDispatchToProps = dispatch => ({
    onSetCards: (cards, num) => dispatch( setCards(cards, num) ),
    onRefreshActive: num => dispatch( refreshActive(num) ),
    onSetActiveSection: name => dispatch(setActiveSection(name))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pagination);
