console.log("Go Barilo");

const userName=document.getElementById("userName");
const name_form=document.getElementById("name_form");
const email_form=document.getElementById("email_form");
const send_form=document.getElementById("send_form");
const msg_form=document.getElementById("msg_form");
const community_btn=document.getElementById("community");
const form=document.getElementById("form");


// LOGIN - API de Usuarios

community_btn.addEventListener("click",downloadData);


async function downloadData(page =1){
    community_btn.style.display="none";
    form.style.display="inline";

     await axios.get(`https://reqres.in/api/users?page=${page}`)
    .then(function (response) {
        const msj = {
            type: 'success',
            msj: 'Lista obtenida exitosamente.'
        };
        //Message(msj)

        const users_data=response.data.data;
        //console.log(users_data);
        useData(users_data);
       
        
    })
    .catch(function (error) {
        const msj = {
            type: 'danger',
            msj: error.message
        };
        //Message(msj);
        //console.log(error);
    })
    .then(function () {
        console.log("buscando lista de usuarios...")
    });
}



function enterWeb() {
    let newUserName=name_form.value;
    let newUserEmail=email_form.value;
    findUsers(page=1, newUserEmail, newUserName);   
};
   
async function findUsers(page = 1, email, name) {
    
    await axios.get(`https://reqres.in/api/users?page=${page}`)
         .then(function (response) {
             const msj = {
                 type: 'success',
                 msj: 'Lista obtenida exitosamente.'
             };
             //Message(msj)
 
             const users_data=response.data.data;
             //console.log(users_data);
            
             confirmUser(email, name, users_data);
             
         })
         .catch(function (error) {
             const msj = {
                 type: 'danger',
                 msj: error.message
             };
             //Message(msj);
             //console.log(error);
         })
         .then(function () {
             console.log("buscando lista de usuarios...")
         });
     
 }

 function confirmUser(email, name, base_data){
    
    let userFinded = base_data.find(data => data.email === email);
    if(!name || !email || !userFinded){
        msg_form.innerHTML=`<div class="alert alert-danger" role="alert"> Nombre o Email incorrectos o inexistentes </div> `;}
        //console.log("out")};
    if(userFinded.email === email && userFinded.first_name === name){window.location.href="community.html"};

};

function useData(data){
    let listData=document.getElementById("listData");
    let cardListData=` <div class="row row-cols-1 row-cols-md-3 g-4">${User(data)}</div>`;
    listData.innerHTML=cardListData;
}


function User(users) {
    let usersRow = ``;
    for (let user of users) {
        usersRow += `
           <div class="col">
            <div class="card">
            <img class="img-thumbnail" src="${user.avatar}" alt="AVATAR">   
            <h4 class="card-title text-center">${user.first_name}</h4>    
            <p class="text-center">${user.email}</p> 
            </div>
            </div>
        `;
    }
    return usersRow;
}





