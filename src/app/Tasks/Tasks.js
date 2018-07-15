import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { setActivePage } from '../actions/menu';

import Description from './Description';
import Pagination from './Pagination/Pagination';
import Carousel from './Carousel/Carousel';
import Quiz from './Quiz/Quiz';
import Geolocation from './Geolocation/Geolocation';

import './Tasks.less';

class Tasks extends React.Component {
    
    componentDidMount() {
        this.props.onSetActivePage('tasks');
        this.aside = document.querySelector('aside');
        this.asideButton = document.querySelector('.aside-button');
        this.handleAsideOnBody = this.handleAsideOnBody.bind(this); // Позволяет удалить this.handleAsideOnBody в componentWillUnmount()
        document.body.addEventListener('click', this.handleAsideOnBody, false);
        this.asideButton.addEventListener('click', this.handleAside.bind(this), false);
    }
    
    componentWillUnmount() {
        document.body.removeEventListener('click', this.handleAsideOnBody, false);
    }
    
    getActive(v) {
        if(v === this.props.active.name) {
            return 'active';
        }
        return '';
    }
    
    handleAside(e) {
        this.aside.classList.toggle('in');
        e.stopPropagation();
    }

    handleAsideOnBody() {
        this.aside.classList.remove('in');
    }

    render() {
        return (
            <div className="Tasks">
                <div className="container main">
                    <div className='row'>
                        <main>
                            <Switch>
                                <Route exact path={this.props.match.path} component={Description} />
                                <Route path={`${this.props.match.path}/pagination`} component={Pagination} />
                                <Route path={`${this.props.match.path}/carousel`} component={Carousel} />
                                <Route path={`${this.props.match.path}/quiz`} component={Quiz} />
                                <Route path={`${this.props.match.path}/geolocation`} component={Geolocation} />
                                <Route component={Description} />
                            </Switch>
                        </main>
                        <aside>
                            <div className="aside-button">
                                <span></span>
                            </div>
                            <ul>
                                <li>
                                    <Link 
                                        className={this.getActive('tasks')}
                                        to={`${this.props.match.url}`}
                                    >
                                        Описание задач
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={this.getActive('pagination')}
                                        to={`${this.props.match.url}/pagination`}
                                    >
                                        Пагинация
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={this.getActive('carousel')}
                                        to={`${this.props.match.url}/carousel`}
                                    >
                                        Карусель
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={this.getActive('quiz')}
                                        to={`${this.props.match.url}/quiz`}
                                    >
                                        Викторина
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={this.getActive('geolocation')}
                                        to={`${this.props.match.url}/geolocation`}
                                    >
                                        Геолокация
                                    </Link>
                                </li>
                            </ul>
                        </aside>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => ({
    active: state.activeVerticalMenu
});

const mapDispatchToProps = dispatch => ({
    onSetActivePage: name => dispatch(setActivePage(name))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tasks);
