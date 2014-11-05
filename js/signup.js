/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict"

function onReady() {
    var submitForm = document.getElementById('signup');
    var stateSelect = submitForm.elements['usState'];
    var idx;
    var option;
    var usState;

    for(idx = 0; idx < usStates.length; ++idx) {
        option = document.createElement('option');
        usState = usStates[idx];
        option.value = usState.code;
        option.innerHTML = usState.name;
        stateSelect.appendChild(option);
    }

    submitForm.addEventListener('submit', onSubmit);
}
document.addEventListener('DOMContentLoaded', onReady);

function onSubmit(evt) {
    try {
        var valid = validateForm(this);
    }
    catch(ex) {

    }

    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = valid;
    return valid;
}

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'city', 'state', 'zip', 'birthdate'];
    var idx;
    var valid = true;

    for (idx = 0; idx < requiredFields.length; ++idx) {
        valid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }

    var occSelect = document.getElementById('occupation');
    var occOther = form.elements['occupationOther'];
    var occValue = occOther.value;

    if(occSelect.value == 'other') {
        occOther.className = 'form-control invalid-field';
        validateRequiredField(occValue);
    }
    valid &= validateRequiredField(form.elements['zip']);

    var birthday = form.elements['birthdate'].value;
    var age = age(dob);


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

function age(dob){
    if(!dob) {
        throw new Error ('Please enter your birthdate.');

    }
    dob = new Date(dob);
    var now = new Date();
    var daysDiff = today.getDate() - dob.getUTCDate();
    var monthsDiff = today.getMonth() - dob.getUTCMonth();
    var yearsDiff = today.getFullYear() - dob.getUTCFullYear();

    if(monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
        yearsDiff--;
    }
    return yearsDiff;
}
