var prog = document.getElementById("progress");
var next1 = document.getElementById("next1");
var back1 = document.getElementById("back1");

let progress = 0;
let formLimit = 12;
let formIndex = 1;
let married = false;

var marital = document.getElementById("mStatus")
var workStatus = document.getElementById("workStatus")

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
    maritalStatus: null,
    employmentStatus: null
};

function logValue(){
    switch(this.value){
        case 'Married':
            married = true;
            if(person.gender == "female"){
                document.getElementById("maidenNameLabel").style.visibility = "visible";
                document.getElementById("mName").hidden = false;
            }
            break;
        case 'Unmarried':
            married = false;
            document.getElementById("maidenNameLabel").style.visibility = "hidden";
            document.getElementById("mName").hidden = true;
            break;
        case 'Divorced':
            married = false;
            document.getElementById("maidenNameLabel").style.visibility = "hidden";
            document.getElementById("mName").hidden = true;
            break;
    }
}

marital.addEventListener('change', logValue);

function logValueW(){
    switch(this.value){
        case 'studying':
            document.getElementById("unemploymentLabel").style.visibility = "hidden";
            document.getElementById("reasonUnemployment").style.visibility = "hidden"; 
            document.getElementById("mpleaveDate").style.visibility = "hidden";
            document.getElementById("mpDate").style.visibility = "hidden";
            break;
        case 'employed':
            document.getElementById("unemploymentLabel").style.visibility = "hidden";
            document.getElementById("reasonUnemployment").style.visibility = "hidden"; 
            document.getElementById("mpleaveDate").style.visibility = "hidden";
            document.getElementById("mpDate").style.visibility = "hidden";
            break;
        case 'unemployed':
            document.getElementById("mpleaveDate").style.visibility = "hidden";
            document.getElementById("mpDate").style.visibility = "hidden";
            document.getElementById("unemploymentLabel").style.visibility = "visible";
            document.getElementById("reasonUnemployment").style.visibility = "visible"; 
            next1.value = "submit";
            break;
        case 'mpleave':
            document.getElementById("unemploymentLabel").style.visibility = "hidden";
            document.getElementById("reasonUnemployment").style.visibility = "hidden"; 
            document.getElementById("mpleaveDate").style.visibility = "visible";
            document.getElementById("mpDate").style.visibility = "visible";
            next1.value = "submit";
            break;
    }
}

workStatus.addEventListener('change', logValueW)

back1.onclick = function(){
    var currentForm = document.getElementById("form"+formIndex);
    formIndex -= 1;
    progress -= 10;
    var nextForm = document.getElementById("form"+formIndex);
    if(formIndex === 10 && person.employmentStatus == "employed"){
        formIndex -= 1;
        nextForm = document.getElementById("form"+formIndex);
    }
    if(formIndex === 8 && married === false){
        formIndex -= 1;
        progress -= 10;
        nextForm = document.getElementById("form"+formIndex);
    }
    if(formIndex === 11 || formIndex === 10){
        next1.value = "submit";
    }
    else{
        next1.value = "next";
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
    person.employmentStatus = document.getElementById("workStatus").value;

    
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

let skip = false;

next1.onclick = function(){
    if(correct()){
        var currentForm = document.getElementById("form"+formIndex);
        if(formIndex < formLimit){
            formIndex += 1;
            progress += 10;
        }
        var nextForm = document.getElementById("form"+formIndex);
        
        if(formIndex === 10 && (person.employmentStatus == "unemployed" || person.employmentStatus == "mpleave")){
            next1.hidden;
            nextForm = document.getElementById("form12");
            progress = 100;
            next1.style.visibility = "hidden";
            back1.style.visibility = "hidden";
        }
        else if(formIndex === 10 && person.employmentStatus == "employed"){
            formIndex += 1;
            progress += 10;
            nextForm = document.getElementById("form"+formIndex);
        }
        if(formIndex === 11 && person.employmentStatus == "studying"){
            formIndex += 1;
            nextForm = document.getElementById("form"+formIndex);
        }
        if(formIndex === 11 || formIndex === 10){
            next1.value = "submit";
        }
        else{
            next1.value = "next";
        }
        if(formIndex === 12){
            next1.style.visibility = "hidden";
            back1.style.visibility = "hidden";
            nextForm = document.getElementById("form12");
            progress = 100;
        }
        if(formIndex === 7 && married && person.gender == "female"){
            document.getElementById("maidenNameLabel").style.visibility = "visible";
            document.getElementById("mName").hidden = false;
        }
        else{
            document.getElementById("maidenNameLabel").style.visibility = "hidden";
            document.getElementById("mName").hidden = true;
        }
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

