import React from 'react';
import { connect } from 'react-redux';

import ymaps from 'ymaps';

import { setActiveSection } from '../../actions/menu';

import './Geolocation.less';

class Geolocation extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            status: ''
        };
        this.myMap = null;
    }
    
    componentDidMount() {
        this.props.onSetActiveSection('geolocation');
        this.initGeolocation();
    }
    
    initGeolocation() {
        if(!navigator.geolocation) {
            this.setState({
                status: 'not supported'
            });
        } else {
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            const success = position => {
                var latitude  = position.coords.latitude;
                var longitude = position.coords.longitude;

                //Вставляем Яндекс карту и указатель на ней
                const init = maps => { 
                    this.myMap = new maps.Map ("out", {
                            center: [latitude, longitude],
                            zoom: 16
                    }); 

                    var myPlacemark = new maps.Placemark([latitude, longitude], {
                            hintContent: 'Ваше местоположение'
                    });
                    
                    this.myMap.behaviors.disable([
                        'drag',
                        'scrollZoom',
                        'dblClickZoom',
                        'multiTouch',
                        'rightMouseButtonMagnifier',
                        'leftMouseButtonMagnifier',
                        'ruler',
                        'routeEditor'
                    ]);
                    this.myMap.geoObjects.add(myPlacemark);
                };

                ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
                    .then(init)
                    .catch(error => console.log('Failed to load Yandex Maps', error));

                this.setState({
                    status: 'success'
                });
            };

            const error = err => {
                this.setState({
                    status: err.code
                });
            };

            navigator.geolocation.getCurrentPosition(success, error, options);
        }
    }
    
    handleClick() {
        if(this.myMap) {
            this.myMap.destroy();
        }
        this.initGeolocation();
    }
    
    render() {
        return (
            <div className='Geolocation'>
                <h1>Геолокация</h1>
                <p>Определение вашего местоположения</p>
                <div id="out" 
                    className={
                        this.state.status === 'success' ? 'map' : 'err'
                    }
                >
                    { this.state.status === 'not supported' 
                        ? 'Геолокация не поддерживается вашим браузером'
                        : ''
                    }
                    { this.state.status === 1 
                        ? 'Получение геолокации не удалось, поскольку на этой странице не было разрешения на это.'
                        : ''
                    }
                    { this.state.status === 2 
                        ? 'Получение геолокации не удалось, потому что по крайней мере один внутренний источник позиции возвратил внутреннюю ошибку.'
                        : ''
                    }
                    { this.state.status === 3 
                        ? 'Превышено время, необходимое для получения геолокации.'
                        : ''
                    }
                </div>
                { this.state.status === 'not supported' 
                    ? ''
                    : <button onClick={this.handleClick.bind(this)}>Повторить</button>
                }
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    onSetActiveSection: name => dispatch(setActiveSection(name))
});

export default connect(
    null,
    mapDispatchToProps
)(Geolocation);
