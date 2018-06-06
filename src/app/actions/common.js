export const getButtons = (all, one) => {
    const n = Math.ceil(all/one);
    const arr = [];
    for(let i = 1; i <= n; i++) {
        arr.push({
            id: i
        });
    }
    return arr;
};


export const growthUp = name => {
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
