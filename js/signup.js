/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict"

function onReady() {
    var signUp = document.getElementById('signup');
    var selState = signUp.elements['state'];
    var idx;
    var option;
    var state;

    for(idx = 0; idx < usStates.length; ++idx){
        option = document.createElement('option');
        state = usStates[idx];
        option.value = state.code;
        option.innerHTML = state.name;
        selState.appendChild(option);
    }

    var occSelect = document.getElementById('occupation');
    var selOther = signUp.elements['occupationOther'];
    occSelect.addEventListener('change', function(){
       if(occSelect.value == 'other') {
           selOther.style.display = 'block';
       }
       else {
           selOther.value = "";
           selOther.style.display = 'none';
       }
    });

    var exitButton = document.getElementById('cancelButton');
    exitButton.addEventListener('click', function(){
       if(window.confirm("Are you sure you want to leave this page?")) {
           window.location = "https://google.com";
       }
    });
    signUp.addEventListener('submit', onSubmit);

}
document.addEventListener('DOMContentLoaded', onReady);

function onSubmit(evt) {

    try{
        var valid = validateForm(this);
    }
    catch(ex){

    }

    if(!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = valid;
    return valid;
}

function validateForm(form) {
    var reqFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var idx;
    var valid = true;

    for (idx = 0; idx < reqFields.length; ++idx) {
        valid &= validateReqField(form.elements[reqFields[idx]]);
    }

    var occSelect = document.getElementById('occupation');
    var selOther = form.elements['occupationOther'];
    var occValue = selOther.value;
    if (occSelect.value == 'other') {
        selOther.className = 'form-control invalid-field';
        validateReqField(occValue);
    }

    valid &= testZip(form.elements['zip']);

    var dob = form.elements['birthdate'].value;
    var age = calculateAge(dob);
    if (age < 13) {
        valid = false;
        displayAge();
    }

    return valid;
}

function validateReqField (field) {
    var value = field.value;
    value = value.trim();
    var valid = value.length > 0;

    if(valid) {
        field.className = 'form-control';

    }
    else {
        field.className = 'form-control invalid-field';

    }

    return valid;
}

function calculateAge(dob) {
    if(!dob) {
        throw new Error ('Please enter your birthdate.');
    }

    dob = new Date(dob);
    var today = new Date();

    var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
    var monthsDiff = today.getMonth() - dob.getUTCMonth();
    var daysDiff = today.getDate() - dob.getUTCDate();

    if(monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
        yearsDiff--;
    }
    return yearsDiff;
}

function testZip(zipDigits) {
    var zipRegExp = new RegExp('^\\d{5}$');

    if(!zipRegExp.test(zipDigits.value)) {
        zipDigits.className = 'form-control invalid-field';
        return false;
    }
    return true;
}

function displayAge() {
    var ageMsg = 'You must be 13 years of age or older to signup';
    displayError(ageMsg);

}

function displayError(error){
    displayMessage(error, true);
}

function displayMessage(message, isError) {
    var msg = document.getElementById('birthdateMessage');
    msg.innerHTML = message;
    msg.className = isError ? 'alert alert-danger' : 'alert alert-success';
    msg.style.display = 'block';
}
