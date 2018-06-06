import React from 'react';

import './BlockCarousel.less';
import big1 from '../../assets/png/big1.png';
import big2 from '../../assets/png/big2.png';
import big3 from '../../assets/png/big3.png';
import big4 from '../../assets/png/big4.png';
import big5 from '../../assets/png/big5.png';

class BlockCarousel extends React.Component{
    constructor(props) {
        super(props);
        this.time = 5000;
        this.frames = [
            big1,
            big2,
            big3,
            big4,
            big5
        ];
        this.state ={
            index: 0
        };
    }
    
    componentDidMount() {
        this.timeMovement = setInterval(this.movedLeft.bind(this), this.time);
    }
    
    componentWillUnmount() {
        clearInterval(this.timeMovement);
    }
    
    movedLeft() {
        if(this.state.index === this.frames.length - 1) {
            this.setState({
                index: 0
            });
        } else {
            this.setState({
                index: ++this.state.index
            });
        }
    }
    
    movedRight() {
        if(this.state.index === 0) {
            this.setState({
                index: this.frames.length - 1
            });
        } else {
            this.setState({
                index: --this.state.index
            });
        }
    }
    
    startMovement() {
        this.timeMovement = setInterval(this.movedLeft.bind(this), this.time);
    }
    
    stopMovement() {
        clearInterval(this.timeMovement);
    }
    
    render() {
        return (
            <div className='BlockCarousel'>
                <div 
                    className="screen" 
                    onMouseEnter={this.stopMovement.bind(this)}
                    onMouseLeave={this.startMovement.bind(this)}
                >
                    <div className='row-circles'>
                        {this.frames.map( (item, index) => (
                            <span 
                                className={ index === this.state.index ?
                                    'circles active'
                                    : 'circles'}
                                key={index}
                            ></span>
                        ))}
                    </div>
                    <div className="frame">
                        <img src={this.frames[this.state.index]}/>
                    </div>
                    <button onClick={this.movedLeft.bind(this)}>&#9668;</button>
                    <button onClick={this.movedRight.bind(this)}>&#9658;</button>
                </div>
            </div>
        );
    };
};

export default BlockCarousel;
