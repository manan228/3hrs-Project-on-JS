const expenseAmount = document.getElementById(`expenseAmount`);
const description = document.getElementById(`description`);
const category = document.getElementById(`category`);
const btn = document.getElementById(`btn`)
const expenseList = document.getElementById(`expenseList`);

btn.addEventListener(`click`, onClick);

window.addEventListener(`DOMContentLoaded`, async () => {

    try {

        const response = await axios.get("https://crudcrud.com/api/96c9cd4a77b34a8ea5f4b916779331c0/data")
        
        response.data.forEach(data => displayData(data))
    }

    catch(err) {
        console.log(err)
    }
})

// Object.keys(localStorage).forEach(key => {

//     data = JSON.parse(localStorage.getItem(key))

//     displayData(data)
// })

async function onClick() {
    try {

    const obj = {

        amount: expenseAmount.value,
        description: description.value,
        category: category.value
    }

        const response = await axios.post('https://crudcrud.com/api/96c9cd4a77b34a8ea5f4b916779331c0/data', obj)

        displayData(response.data)

    expenseAmount.value = ``;
    description.value = ``;
    category.value = ``;
}

catch(err) {

    console.log(err)
}
}

function displayData(data) {

    const li = document.createElement(`li`);
    li.id = '_id';

    li.appendChild(document.createTextNode(`${data.amount} - ${data.description} - ${data.category}`))
    
    createDeleteButton(li, data)
    createEditButton(li, data)

    expenseList.appendChild(li)
}

function createDeleteButton(li, {_id: key}) {

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

        onDelete(li, data._id)
    })
}

async function onDelete(li, key) {

    try {

        const response = await axios.delete("https://crudcrud.com/api/96c9cd4a77b34a8ea5f4b916779331c0/data/" + key)

        li.remove();
    }

    catch(err) {

        console.log(err)
    }
    
    // .then(response => li.remove())
    // .catch(err => console.log(err))

    // localStorage.removeItem(key)
    // li.remove()
}