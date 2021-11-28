var prog = document.getElementById("progress");
var next1 = document.getElementById("next1");
var back1 = document.getElementById("back1");

let progress = 10;
let formLimit = 10;
let formIndex = 1;
let married = false;

var marital = document.getElementById("mStatus")

let person = {
    firstName: null,
    lastName: null,
    gender: null,
    id: null,
    education: null,
    phoneNumber: null,
    email: null,
    otherContacts: null,
    address: null,
    maritalStatus: null
};

function logValue(){
    switch(this.value){
        case 'Married':
            married = true;
            console.log("married =" +married)
            break;
        case 'Unmarried':
            married = false;
            console.log("married =" +married)
            break;
        case 'Divorced':
            married = false;
            console.log("married =" +married)
            break;
    }
}

marital.addEventListener('change', logValue);

back1.onclick = function(){
    var currentForm = document.getElementById("form"+formIndex);
    formIndex -= 1;
    progress -= 10;
    var nextForm = document.getElementById("form"+formIndex);
    if(formIndex === 8 && married === false){
        formIndex -= 1;
        progress -= 10;
        nextForm = document.getElementById("form"+formIndex);
    }
    prog.style.width = progress+"%";
    nextForm.style.left = "20px";
    currentForm.style.left = "-450px";
    if(formIndex===1){
        back1.style.left = "-450px";
    }
    console.log("on form " + formIndex);
}

function correct(){
    person.firstName = document.getElementById("firstname").value;
    person.lastName = document.getElementById("lastname").value;
    person.gender = document.getElementById("gender").value;
    person.maritalStatus = document.getElementById("mStatus").value;
    
    if(person.firstName.length < 2){
        return false;
    }
    if(person.lastName.length < 2){
        return false; 
    }
    if(person.gender==""){
        return false;
    }
    return true;
}


next1.onclick = function(){
    if(correct()){
        console.log(person.firstName);
        console.log(person.maritalStatus);
        var currentForm = document.getElementById("form"+formIndex);
        if(formIndex < formLimit){
            formIndex += 1;
            progress += 10;
        }
        var nextForm = document.getElementById("form"+formIndex);
        if(formIndex === 8 && married === false){
            formIndex += 1;
            progress += 10;
            nextForm = document.getElementById("form"+formIndex);
        }
        prog.style.width = progress+"%";
        currentForm.style.left = "450px";
        nextForm.style.left = "20px";
        back1.style.left = "0px";
        console.log("on form " + formIndex);
    }
    else{
        alert("All fields must be filled out and valid");
    }
}

