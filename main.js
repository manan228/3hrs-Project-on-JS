const expenseAmount = document.getElementById(`expenseAmount`);
const description = document.getElementById(`description`);
const category = document.getElementById(`category`);
const btn = document.getElementById(`btn`)
const expenseList = document.getElementById(`expenseList`);

btn.addEventListener(`click`, onClick);

Object.keys(localStorage).forEach(key => {

    data = JSON.parse(localStorage.getItem(key))

    displayData(data)
})

function onClick() {

    const obj = {

        amount: expenseAmount.value,
        description: description.value,
        category: category.value
    }

    localStorage.setItem(`${obj.amount}`, JSON.stringify(obj));

    displayData(obj);

    expenseAmount.value = ``;
    description.value = ``;
    category.value = ``;
}

function displayData(data) {

    const li = document.createElement(`li`);
    li.id = 'list1';

    li.appendChild(document.createTextNode(`${data.amount} - ${data.description} - ${data.category}`))
    
    createDeleteButton(li, data)
    createEditButton(li, data)

    expenseList.appendChild(li)
}

function createDeleteButton(li, {amount: key}) {

    const deleteBtn = document.createElement(`button`);

    deleteBtn.innerHTML = `Delete`

    li.appendChild(deleteBtn)

    deleteBtn.addEventListener(`click`, () => onDelete(li, key))
}

function createEditButton(li, data) {

    const editBtn = document.createElement(`button`);

    editBtn.innerHTML = `Edit`

    li.appendChild(editBtn)
    
    editBtn.addEventListener(`click`, () => {

        document.getElementById(`expenseAmount`).value = data.amount;
        document.getElementById(`description`).value = data.description;
        document.getElementById(`category`).value = data.category;

        onDelete(li, data.amount)
    })
}

function onDelete(li, key) {

    localStorage.removeItem(key)
    li.remove()
}