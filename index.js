const forEach = require('lodash/forEach');
const set = require('lodash/set');
const get = require('lodash/get');
const trim = require('lodash/trim');

function serializeForm(formElement) {
    const data = {};

    forEach(formElement.querySelectorAll('[name]'), inputElement => {
        const inputName = trim(inputElement.name);
        let inputValue = trim(inputElement.value);

        if (isFinite(inputValue) && inputValue.length){
            inputValue = Number(inputValue);
        }

        switch (inputElement.type) {
            case 'radio':
                const property = get(data, inputName);
                if (typeof property === 'undefined' || property === false) {
                    set(data, inputName, inputElement.checked ? inputValue : false);
                }
                break;
            case 'checkbox':
                set(data, inputName, inputElement.checked);
                break;
            default:
                set(data, inputName, inputValue);
        }
    });

    return data;
}

module.exports = serializeForm;