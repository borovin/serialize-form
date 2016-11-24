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

afterEach(() => {
    document.body.innerHTML = '';
});

it('should serialize flat form', () => {
    document.body.innerHTML = form;

    const formData = serializeForm(document.getElementById('form'));

    expect(formData).toEqual({
        "number": 1.1,
        "text": {"string": "text", "number": 1.2},
        "textarea": {"string": "test", "number": 1.3},
        "checkboxOn": true,
        "checkboxOff": false,
        "radio": [2, false]
    });
});

