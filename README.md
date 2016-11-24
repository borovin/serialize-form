# serialize-form

Simple function to serialize html form to plain JS object. Supports nested properties and arrays.
Each input with `name` attribute will be added to serialized object. If value of this input passed `isFinite` function
check it serializes as number. If checkbox or radio button is not checked its value will be false.

## Install

`npm install @basket/serialize-form --save`

## Usage

```
const serializeForm = require('../index');

const form = `<form id="form">
    <input type="text" name="number" value="1.1" />
    <input type="text" name="text.string" value="text" />
    <input type="text" name="text.number" value="1.2" />
    <textarea name="textarea.string">test</textarea>
    <textarea name="textarea.number">1.3</textarea>
    <input type="checkbox" name="checkboxOn" checked />
    <input type="checkbox" name="checkboxOff" />
    <input type="radio" name="radio[0]" value="1" />
    <input type="radio" name="radio[0]" value="2" checked />
    <input type="radio" name="radio[1]" value="3" />
    <input type="radio" name="radio[1]" value="4" />
</form>`;

document.body.innerHTML = form;

const formData = serializeForm(document.getElementById('form'));
```

The result of form data will be:

```
{
    "number": 1.1,
    "text": {"string": "text", "number": 1.2},
    "textarea": {"string": "test", "number": 1.3},
    "checkboxOn": true,
    "checkboxOff": false,
    "radio": [2, false]
}
```