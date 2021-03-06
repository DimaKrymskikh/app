import React from 'react';

import './Loader.less';

const Loader = () => {
    return (
        <div className="Loader">
            <div className="circle"></div>
            <span>Загрузка...</span>
        </div>
    );
};

export default Loader;
