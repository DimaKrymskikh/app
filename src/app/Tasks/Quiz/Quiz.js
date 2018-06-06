import React from 'react';
import { connect } from 'react-redux';

import LayoutQuiz from './LayoutQuiz';
import quiz from '../../../assets/json/quiz.json';
import { setActiveSection } from '../../actions/menu';

class Quiz extends React.Component {
    
    componentDidMount() {
        this.props.onSetActiveSection('quiz');
    }
    
    render() {
        return (
            <div className='Quiz'>
                <h1>Викторина</h1>
                <p>
                    Викторина из 5 вопросов.
                </p>
                <LayoutQuiz data={quiz} />
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
)(Quiz);
