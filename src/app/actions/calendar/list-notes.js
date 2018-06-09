export const notes = {};
	
//Получаем список записей в хранилище
notes.getList = str => {
    const listNotes = [];
    for(let i =0; i < localStorage.length; i++) {
        let key = localStorage.key(i).trim();
        if( /^\d*\.\d*\.\d{4}$/.test(key) ) {
            let note = localStorage.getItem(key);
            const arr = note.split("{||}");
            if(arr[0].includes(str)) {
                listNotes.push({
                    key: localStorage.key(i),
                    event: arr[0],
                    participants: arr[1],
                    description: arr[2]
                });
            }
        }
    }
    return listNotes;
};

export const refreshStrInput = str => ({
    type: 'REFRESH_STR_INPUT', 
    str
});

export const monthUp = () => ( {type: 'MONTH_UP'} );

export const monthDown = () => ( {type: 'MONTH_DOWN'} );

export const refreshNotes = () => ( {type: 'NOTES_CHANGE'} );
