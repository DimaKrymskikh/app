import React from 'react';

import './IconCross.less';

const IconCross = ({action, title , index = null}) => {
    return (
        <div 
            className = 'IconCross' 
            onClick = {index === null ? action : action(index)}
            title = {title}
        >
            <span className="cross"></span>
        </div>
    );
};

export default IconCross;
