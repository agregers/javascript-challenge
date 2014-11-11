/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict"

function onReady() {
    var signUp = document.getElementById('signup');
    var stateSelect = signUp.elements['state'];
    var idx;
    var option;
    var state;

    for(idx = 0; idx < usStates.length; ++idx) {
        option = document.createElement('option');
        state = usStates[idx];
        option.value = state.code;
        option.innerHTML = state.name;
        stateSelect.appendChild(option);
    }



    var exitButton = document.getElementById('cancelButton');
    exitButton.addEventListener('click', function(){
       if(window.confirm("Are you sure you want to leave?")){
           window.location = 'http://www.google.com';
       }
    });

    var occupationSelect = document.getElementById('occupation');
    var occupationOther = signUp.elements['occupationOther'];
    occupationSelect.addEventListener('change', function(){
        if(occupationSelect.value == 'other') {
            occupationOther.style.display = 'block';
        }
        else{
            occupationOther.value = "";
            occupationOther.style.display = 'none';
        }
    });


    signUp.addEventListener('submit', onSubmit);

}
document.addEventListener('DOMContentLoaded', onReady);

function onSubmit (eventObject) {
    try {
        var valid = validateForm(this);}
    catch(err){

    }

    if (!valid && eventObject.preventDefault) {
        eventObject.preventDefault();
    }

    eventObject.returnValue = valid;
    return valid;
}


function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'city', 'state', 'zip', 'birthdate'];
    var idx;
    var valid = true;

    for (idx = 0; idx < requiredFields.length; ++idx) {
        valid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }
    valid &= validateZip(form.elements['zip']);

    var occupationSelect = document.getElementById('occupation');
    var occupationOther = form.elements['occupationOther'];
    var occValue = occupationOther.value;
    if(occupationSelect.value == 'other'){
        valid &= validateRequiredField(occupationOther);
    }
    else if(occupationSelect.value == ""){
        valid &= validateRequiredField(occupationSelect);
    }

    var dob = form.elements['birthdate'];
    var age = calculateAge(dob.value);

    if(age < 13) {
        valid &= false;
        dob.className = 'form-control invalid-field';
        displayAge(false);
    }
    else {
        displayAge(true);
    }

    return valid;
}

function validateRequiredField(field) {
    var value = field.value;
    value = value.trim();
    var valid = value.length > 0;

    if (valid) {
        field.className = 'form-control';
    }
    else{
        field.className = 'form-control invalid-field';
    }

    return valid;

}
function calculateAge(dob) {
    if (!dob) {
        throw new Error('Please enter your birth date!');
    }
    dob = new Date(dob);
    var today = new Date();

    var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
    var monthsDiff = today.getMonth() - dob.getUTCMonth();
    var daysDiff = today.getDate() - dob.getUTCDate();

    if (monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
        yearsDiff--;
    }

    return yearsDiff;
}

function displayAge(valid){
    var msg = "You must be 13 years of age or older to signup";
    var errMsg = document.getElementById('birthdateMessage');
    errMsg.innerHTML = msg;
    if(!valid){
        errMsg.style.display = 'block';
    }
    else{
        errMsg.style.display = 'none';
    }

}

function  validateZip(zip) {
    var regZip = new RegExp('^\\d{5}$');
    var valid = regZip.test(zip.value);

    if (valid) {
        zip.className = 'form-control';
    }
    else {
        zip.className = 'form-control invalid-field';
    }
    return valid;
}
