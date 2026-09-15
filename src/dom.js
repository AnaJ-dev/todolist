let checkNotEmptyTitle = document.querySelector('#task_title')
let checkNotEmptyDescription = document.querySelector('#task_description')
let checkDueDate = document.querySelector('#dueDate')
let container = document.querySelector('.container')
let tablebody = document.querySelector('.tableB')
let submitBtn = document.querySelector('.submit')
let priorityCheck = document.querySelector('#priority')

const domSelectors = {
    checkNotEmptyTitle,
    checkNotEmptyDescription,
    checkDueDate,
    container,
    tablebody,
    submitBtn,
    priorityCheck
}


export { domSelectors }
