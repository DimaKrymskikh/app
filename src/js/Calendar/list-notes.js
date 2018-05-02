export const notes = {};
	
//Получаем список записей в хранилище
notes.getList = (str) => {
    const reg = new RegExp(str, 'i');
    
    var listNotes = [];
    for(var i =0; i < localStorage.length; i++) {
        var key = localStorage.key(i).trim();
        if( /^\d*\.\d*\.\d{4}$/.test(key) ) {
            var note = localStorage.getItem(key);
            var arr = note.split("{||}");
            if(reg.test(arr[0])) {
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
