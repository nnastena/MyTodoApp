let ul =document.getElementById("todo-list");
const url = 'http://localhost:3000/tasks';
let counter =0 //количество полученных заданий
let tasksID =[] //массив ID всех полученных заданий

//получение данных и их отрисовка
const getData = async () =>{
    await fetch( url)
    .then( (response) => { return response.json(); } )
    .then((data) => {
        console.log(data)
        tasksID =[]
        data.map((item) =>{
            tasksID.push(item.id)
            let p = document.createElement('p');
            let span = document.createElement('span');
            let li = document.createElement("li");
            p.appendChild(document.createTextNode(item.title));
            span.appendChild(document.createTextNode(item.date));

            let button1=document.createElement('button');
            button1.className = "delete"
            let butImg = document.createElement('img');
            butImg.src = "./img/delete.svg"
            button1.appendChild(butImg);
            button1.onclick = function(){
                deleteTask(item.id)
            }

            let button2=document.createElement('button');
            let butImg2 = document.createElement('img');
            if(item.do ==true){
                button2.className = "return"
                butImg2.src = "./img/return.svg"
                li.className = "done"
            }else{
                button2.className = "complete"
                butImg2.src = "./img/check.svg"
                li.className = "active"
            }
            button2.appendChild(butImg2);
            button2.onclick = function(){
                updateTask(item.id, !item.do)
            }

            li.appendChild(span);
            li.appendChild(p);
            li.appendChild(button1);
            li.appendChild(button2);
            ul.appendChild(li)
        })
        counter = data.length
        console.log(tasksID)
    } )
    .catch((message) => console.log("Error message " + message ));
}
getData();

const form = document.getElementById("form");
const input = document.getElementById('input');
//форма для добавления нового задания
form.addEventListener('submit', (event)=>{
    event.preventDefault()
    if(input.value !=''){
        const date= new Date();
        const dateRes = date.toLocaleDateString().slice(0, 5)
        fetch(url,{
            method: "POST",
            body: JSON.stringify({
                title: input.value,
                do: false,
                date: dateRes
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
    }
    else{
        alert("You entered an empty string, please try again")
    }
})

//удаление одного задания по переданному ID
function deleteTask(id){
    fetch(url+ "/"+id,{
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
}
//изменение поля "do" задания (перевод задания в законченные или незаконченные)
function updateTask(id, done){
    fetch(url+ "/"+id,{
        method: "PATCH",
        body: JSON.stringify({
            do: done,
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
}
//изменение всех заданий, перевод в законченные или нет
function updateAll(res){
    tasksID.forEach( (item)=>{
        updateTask(item, res)
    })
}
//удаление всех заданий
function deleteAll(){
    console.log("rdnbty")
    tasksID.forEach( (item)=>{
        deleteTask(item)
    })
}


