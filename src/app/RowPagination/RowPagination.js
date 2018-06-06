import React from 'react';

import './RowPagination.less';

const RowPagination = ({
    paginButtons, paginActive, onRefreshActive
}) => { 
    
    const activeP1 = () => {
        if(paginActive < paginButtons.length) {
            onRefreshActive(paginActive + 1);
        }
    };
    
    const activeM1 = () => {
        if(paginActive > 1) {
            onRefreshActive(paginActive - 1);
        }
    };
    
    const activeN = (n) => { 
        return () => {
            onRefreshActive(n);
        };
    };
    
    return (
        <div className="RowPagination">
            { paginButtons.length 
                ? <button 
                    className={paginActive === 1 ? 'pasive' : ''}
                    onClick={activeM1} 
                  >
                    &#9668;
                  </button> 
                : ''
            }
            { paginButtons.length
                    ? <button 
                        className={paginActive === 1 ? 'active' : ''}
                        onClick={activeN(1)}
                      >1</button> 
                    : ''
            }
            { paginActive > 5 ? <span>&hellip;</span> : ''}
            {paginButtons.map( (item, index, arr) => {
                let num = index + 1;
                if(
                    1 < num && 
                    paginActive - 3 <= num && 
                    num <= paginActive + 3 && 
                    num < arr.length 
                ) {
                    return <button 
                        key={index}
                        className={paginActive === num ? 'active' : ''}
                        onClick={activeN(num)}
                    >{num}</button>
                }
            })}
            { paginButtons.length > paginActive + 4 
                ? <span>&hellip;</span> : ''}
            { paginButtons.length > 1
                ? <button 
                    className={paginActive === paginButtons.length 
                        ? 'active' : ''}
                    onClick={activeN(paginButtons.length)}
                  >
                    {paginButtons.length}
                  </button> 
                : ''}
            { paginButtons.length 
                ? <button 
                    className={paginActive === paginButtons.length 
                        ? 'pasive' : ''}
                    onClick={activeP1} 
                  >
                    &#9658;
                  </button> 
                : ''
            }
        </div>
    );
};

export default RowPagination;
