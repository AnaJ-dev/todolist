import { domSelectors } from "./dom.js"
import { storage, toDos, toValidate, pushToStorage, checkPriorityLevel, convertIntoString, readLocal } from "./program_logic.js"
import "./style.css"


const {
    checkNotEmptyTitle,
    checkNotEmptyDescription,
    checkDueDate,
    tablebody,
    submitBtn,
    priorityCheck
} = domSelectors


// render FN
function renderOnScreen() {
    tablebody.innerHTML = ''
    for (let i = 0; i < storage.length; i++) {
        let currentToDo = storage[i]
        let tableRow = document.createElement('tr')
        tableRow.classList.add('toDoRow')

        if (currentToDo.done === true) {
            tableRow.classList.add('doneRowStyle')
        }


        for (let i = 0; i < 4; i++) {
            let tableData = document.createElement('td')

            if (i === 0) {
                tableData.innerText = currentToDo.title
            }
            if (i === 1) {
                tableData.innerText = currentToDo.description
            }
            if (i === 2) {
                tableData.innerText = currentToDo.date
            }
            if (i === 3) {
                tableData.innerText = currentToDo.priority
            }

            tableRow.append(tableData)

        }

        //done btn
        let doneTick = document.createElement('button')
        doneTick.classList.add('doneBtn')
        doneTick.innerHTML = '<span class="material-symbols-outlined">done</span>'
        doneTick.id = currentToDo.id

        let tdForDone = document.createElement('td')
        tdForDone.append(doneTick)
        tableRow.append(tdForDone)


        //edit
        let editBtnforTable = document.createElement('button')
        editBtnforTable.classList.add('editBtn')
        editBtnforTable.innerHTML = '<span class="material-symbols-outlined">edit</span>'
        editBtnforTable.id = currentToDo.id

        let tdForEdit = document.createElement('td')
        tdForEdit.append(editBtnforTable)
        tableRow.append(tdForEdit)

        tablebody.append(tableRow)


        //delete

        let deleteBtnForTable = document.createElement('button')
        deleteBtnForTable.classList.add('deleteX')
        deleteBtnForTable.innerHTML = '<span class="material-symbols-outlined">delete</span>'
        deleteBtnForTable.id = currentToDo.id

        let tdForDelete = document.createElement('td')
        tdForDelete.append(deleteBtnForTable)
        tableRow.append(tdForDelete)
    }
}




//done logic


let doneClicked = document.querySelectorAll('.doneBtn')

function doneOnToDo() {

    for (const el of doneClicked) {
        el.addEventListener('click', () => {
            let doneBtnId = el.id

            for (let i = 0; i < storage.length; i++) {
                if (storage[i].id === doneBtnId) {
                    storage[i].done = !storage[i].done
                    convertIntoString(storage)
                    renderOnScreen()
                    doneClicked = document.querySelectorAll('.doneBtn')
                    doneOnToDo()

                    deleteBtn = document.querySelectorAll('.deleteX')
                    deleteToDo()

                    editBtn = document.querySelectorAll('.editBtn')
                    editToDo()

                }

            }




        })
    }

}





//edit logic

let clickedEdit = null
let editBtn = document.querySelectorAll('.editBtn')

function editToDo() {
    for (const el of editBtn) {
        el.addEventListener('click', () => {
            let editBtnId = el.id

            for (let i = 0; i < storage.length; i++) {
                if (storage[i].id === editBtnId) {
                    clickedEdit = storage[i].id
                    checkNotEmptyTitle.value = storage[i].title
                    checkNotEmptyDescription.value = storage[i].description
                    checkDueDate.value = storage[i].date
                    priorityCheck.value = storage[i].priority


                }

            }


        })



    }


}







// delete my row
let deleteBtn = document.querySelectorAll('.deleteX')

function deleteToDo() {
    for (const el of deleteBtn) {
        el.addEventListener('click', () => {
            let deletedObjId = el.id

            for (let i = 0; i < storage.length; i++) {
                if (storage[i].id === deletedObjId) {
                    storage.splice(i, 1)
                    convertIntoString(storage)
                    tablebody.innerHTML = ''
                    renderOnScreen()

                    deleteBtn = document.querySelectorAll('.deleteX')
                    deleteToDo()

                    editBtn = document.querySelectorAll('.editBtn')
                    editToDo()

                    doneClicked = document.querySelectorAll('.doneBtn')
                    doneOnToDo()
                }
            }
        })
    }
}









// submit btn
function submit() {
    submitBtn.addEventListener('click', (e) => {
        console.log(clickedEdit)
        e.preventDefault()

        if (clickedEdit === null) {
            let titlesAdded = checkNotEmptyTitle.value
            let DescriptionAdded = checkNotEmptyDescription.value
            let DueDateAdd = checkDueDate.value
            let priorityAdd = priorityCheck.value

            const toDofromForm = new toDos(titlesAdded, DescriptionAdded, DueDateAdd, priorityAdd)

            if (toValidate(toDofromForm) === false) {
                return
            }

            pushToStorage(toDofromForm)

            storage.sort(function (a, b) {


                if (checkPriorityLevel(a) === checkPriorityLevel(b)) {
                    return a.title.localeCompare(b.title)
                }
                return checkPriorityLevel(a) - checkPriorityLevel(b)
            })
        }

        if (clickedEdit !== null) {
            const toDoFromEdit = new toDos(
                checkNotEmptyTitle.value,
                checkNotEmptyDescription.value,
                checkDueDate.value,
                priorityCheck.value
            )

            if (toValidate(toDoFromEdit) === false) {
                return
            }

            for (let i = 0; i < storage.length; i++) {
                if (storage[i].id === clickedEdit) {
                    storage[i].title = checkNotEmptyTitle.value
                    storage[i].description = checkNotEmptyDescription.value
                    storage[i].date = checkDueDate.value
                    storage[i].priority = priorityCheck.value
                }
            }

            clickedEdit = null

            storage.sort(function (a, b) {
                return checkPriorityLevel(a) - checkPriorityLevel(b)
            })
        }

        convertIntoString(storage)

        tablebody.innerHTML = ''
        renderOnScreen()

        checkNotEmptyTitle.value = ''
        checkNotEmptyDescription.value = ''
        checkDueDate.value = ''
        priorityCheck.value = 'Low'

        deleteBtn = document.querySelectorAll('.deleteX')
        deleteToDo()

        editBtn = document.querySelectorAll('.editBtn')
        editToDo()

        doneClicked = document.querySelectorAll('.doneBtn')
        doneOnToDo()

    })
}


readLocal()
renderOnScreen()
deleteBtn = document.querySelectorAll('.deleteX')
deleteToDo()

editBtn = document.querySelectorAll('.editBtn')
editToDo()
submit()

doneClicked = document.querySelectorAll('.doneBtn')
doneOnToDo()

