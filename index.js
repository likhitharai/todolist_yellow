const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");

// let localTodoList = [];         //It was being replaced by others, so we have declared it out of the scope -> In the global scope

const getTodoListFromLocal = () => {
     return JSON.parse(localStorage.getItem("to-do-list"));
}

const addTodoListLocalStorage = (localTodoList) => {
    return localStorage.setItem ("to-do-list", JSON.stringify(localTodoList));
}

let localTodoList = getTodoListFromLocal() || [];

const addTodoDynamicElement= (curElem) => {
    const divElement = document.createElement("div");
    divElement.classList.add("main_todo_div");
    divElement.innerHTML = `<li>${curElem}</li> <button class="deletebtn but">Delete</button`;
    mainTodoElem.append(divElement);
}

const addTodoList = (e) => {
    e.preventDefault();
    
    const todoListValue = inputValue.value.trim();
    inputValue.value = "";
    
    if (todoListValue!== "" && !localTodoList.includes(todoListValue)){
    localTodoList.push(todoListValue);                  //Add items to the array
    localTodoList = [...new Set(localTodoList)]         // By doing this, it will only store a single set of data in our local storage 
                                                        // -> Displays multiple div element
    localStorage.setItem("to-do-list", JSON.stringify(localTodoList))
    console.log(localTodoList);

addTodoDynamicElement(todoListValue);
    // const divElement = document.createElement("div");
    // divElement.classList.add("main_todo_div");
    // divElement.innerHTML = `<li>${inputValue.value}</li> <button class="deletebtn but">Delete</button`;
    // mainTodoElem.append(divElement);
}

// <div class = "main_todo_div">
    // <li></li>
    // <button class="deletebtn">Delete</button>
//  </div>

}

const showTodoList = () => {
    localTodoList.forEach((curElem)=> {
        addTodoDynamicElement(curElem);
    })
}
showTodoList();



const removeTodoElem = (e) => {
    const todoRemove =  e.target;
    let todoListContent = todoRemove.previousElementSibling.innerText;
    let parentElem = todoRemove.parentElement;
    console.log(todoListContent);

    localTodoList = localTodoList.filter((curTodo)=> {
        return curTodo !== todoListContent;
    })

    addTodoListLocalStorage(localTodoList);
    parentElem.remove();

    console.log(localTodoList);
}

mainTodoElem.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("deletebtn")){
    removeTodoElem(e);
}

    
})

document.querySelector(".btn").addEventListener("click", (e)=>{
    addTodoList(e);
})