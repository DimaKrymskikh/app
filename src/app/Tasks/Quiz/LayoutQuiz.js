import React from 'react';

import './LayoutQuiz.less'

class LayoutQuiz extends React.Component {
    
    constructor(props) {
        super(props);
        this.initState ={
            nYes: 0,
            nQuestions: 1,
            index: 0,
            indexMark: 0,
            answer: false,
            rating: false,
            end: false,
            mark: ''
        };
        this.state = { ...this.initState };
   }
    
    getAnswer(bool) {
        return () => {
            if(bool === this.props.data.bool[this.state.index]) {
                this.setState({
                    nYes: ++this.state.nYes,
                    mark: 'Правильно.'
                });
            } else {
                this.setState({
                    mark: 'Неправильно.'
                });
            }
            this.setState({
                answer: true
            });
            if(this.state.index === this.props.data.nQu - 1) {
                this.setState({
                    rating: true
                });
            }
        };
    }
    
    getQuestion() {
        this.setState({
            nQuestions: ++this.state.nQuestions,
            index: ++this.state.index,
            answer: false
        });
    }
    
    getRating() {
        this.setState({
            rating: false,
            end: true
        });
        switch(this.state.nYes) {
            case 0: case 1: case 2:
                this.setState({
                    indexMark: 0
                });
                break;
            case 3:
                this.setState({
                    indexMark: 1
                });
                break;
            case 4:
                this.setState({
                    indexMark: 2
                });
                break;
            case 5:
                this.setState({
                    indexMark: 3
                });
                break;
            default:
        }
    }
    
    beginQuiz() {
        this.setState({...this.initState})
    }
    
    render() {
        return (
            <div className="LayoutQuiz">
                <h1>{this.props.data.title}</h1>
                <h2>{
                    !this.state.end ? this.props.data.question : 'Ваша оценка'
                }</h2>
                <div className="row-questions">
                    {!this.state.end ?
                        <h3>{this.props.data.heading[this.state.index]}</h3> : ''}
                    {!this.state.end ? 
                        <div dangerouslySetInnerHTML={{__html: this.props.data.text[this.state.index]}} /> : ''}
                    {this.state.end ? 
                        <div>{this.props.data.marks[this.state.indexMark]}</div> : ''}
                </div>
                <div className="row-buttons">
                    <div className="left">
                        {this.state.answer ? 
                            '' :  <button onClick={this.getAnswer(true).bind(this)}>Да</button>}
                        {this.state.answer ? 
                            '' :  <button onClick={this.getAnswer(false).bind(this)}>Нет</button>}
                        {this.state.answer && !this.state.rating && !this.state.end ? 
                            <button onClick={this.getQuestion.bind(this)}>Следующий вопрос</button> : ''}
                        {this.state.rating ? 
                            <button onClick={this.getRating.bind(this)}>Оценка</button> : ''}
                        {this.state.end ?
                            <button onClick={this.beginQuiz.bind(this)}>Начать заново</button> : ''}
                    </div>
                    <div className="left">
                        <span>{`(${this.state.nYes}/${this.state.nQuestions})`}</span>
                    </div>
                </div>
                <div className="row-answers">
                    {this.state.answer && !this.state.end
                        ? <div><span>{this.state.mark}</span> {this.props.data.answer[this.state.index]}</div>
                        : ''}
                </div>
            </div>
        );
    }
};

export default LayoutQuiz;

