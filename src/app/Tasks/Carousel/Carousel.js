import React from 'react';
import { connect } from 'react-redux';

import BlockCarousel from '../../BlockCarousel/BlockCarousel';
import { setActiveSection } from '../../actions/menu';

class Carousel extends React.Component {
    
    componentDidMount() {
        this.props.onSetActiveSection('carousel');
    }
    
    render() {
        return (
            <div className='Carousel'>
                <h1>Карусель</h1>
                <p>
                    Адаптивная карусель. 
                    Кадры меняются каждые 5 секунд. 
                    При наведении курсора мыши на карусель смена кадров останавливается, 
                    и появляются кнопки перемотки кадров в обе стороны. 
                    При смещении курсора мыши с карусели смена кадров возобновляется.
                </p>
                <BlockCarousel />
            </div>
        );
    };
};

const mapDispatchToProps = dispatch => ({
    onSetActiveSection: name => dispatch(setActiveSection(name))
});

export default connect(
    null,
    mapDispatchToProps
)(Carousel);
