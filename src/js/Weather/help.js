const fetchW = async name => {
    let ob = {};
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=2b9fd247e8a1576f3486d9f34cfc878c`)
        .then(res => res.json())
        .then(
            data => {
                if(data.cod === 200) {
                    ob.name = data.name;
                    ob.temp = Math.round(data.main.temp - 273.15);
                    ob.clouds = Math.round(data.clouds.all);
                    ob.humidity = Math.round(data.main.humidity);
                    ob.pressure = Math.round(data.main.pressure * 0.75006375541921);
                    ob.direction = Math.round(data.wind.deg);
                    ob.speed = Math.round(data.wind.speed);
                    ob.cod = data.cod;
                }
            },
            err => {
                console.log('err: ', err);
            }
        );
    return ob;
};

const initCities = async () => {
    let ob = {};
    const arr = [];
    for( let i =0; i < localStorage.length; i++ ) {
        let key = localStorage.key(i);
        let note = localStorage.getItem(key);
        if( key === note && key ) {
            ob = await fetchW(note);
            arr.push(ob);
        }
    };
    return arr;
};

const growthUp = name => {
    return (ob1,ob2) => {
        var v1 = ob1[name];
        var v2 = ob2[name];
        if(v1 < v2) {
            return -1;
        } else if(v1 > v2) {
            return 1;
        } else {
            return 0;
        }
    };
};

export {fetchW, initCities, growthUp};


