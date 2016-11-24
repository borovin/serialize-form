const forEach = require('lodash/forEach');
const set = require('lodash/set');

function serializeForm(formElement) {
    const data = {};

    forEach(formElement.querySelectorAll('[name]'), inputElement => {
        switch (inputElement.type) {
            case 'radio':
                inputElement.checked && set(data, inputElement.name, inputElement.value);
                break;
            case 'checkbox':
                set(data, inputElement.name, inputElement.checked);
                break;
            case 'number':
                set(data, inputElement.name, +inputElement.value);
                break;
            default:
                set(data, inputElement.name, inputElement.value);
        }
    });

    return data;
}

module.exports = serializeForm;