// my overall storage where all the stuff is
let storage = [];

// constructor to generate them objs
function toDos(title, description, date, priority) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.id = crypto.randomUUID();
    this.done = false;
}

// validations prep before push
function toValidate(toDoObject) {
    if (
        toDoObject.title === '' ||
        toDoObject.description === '' ||
        toDoObject.date === ''
    ) {
        alert('all fields must be filled out');
        return false;
    }

    return true;
}

// pushing to storage
function pushToStorage(toDoObject) {
    storage.push(toDoObject);
}

// sorts based on priority
function checkPriorityLevel(toDoObject) {
    if (toDoObject.priority === 'High') {
        return 1;
    }

    if (toDoObject.priority === 'Medium') {
        return 2;
    }

    if (toDoObject.priority === 'Low') {
        return 3;
    }
}


function convertIntoString(storage) {

    let convertIntoString = JSON.stringify(storage) //convert into string
    localStorage.setItem("saveTolocale", convertIntoString) //save into localStorage

}
// convertIntoString(storage)



function readLocal() {
    let readlocaleDate = localStorage.getItem("saveTolocale")
    let getSavedLocale = JSON.parse(readlocaleDate)
    storage.length = 0
    if (getSavedLocale !== null) {
        for (const el of getSavedLocale) {

            storage.push(el)
        }
    }
}
readLocal()

export { storage, toDos, toValidate, pushToStorage, checkPriorityLevel, convertIntoString, readLocal };