const serializeForm = require('../index');

const flatForm = `<form id="flatForm">
    <input type="text" name="a" value="1" />
    <textarea name="b">2</textarea>
    <input type="checkbox" name="c" checked />
    <input type="checkbox" name="d" />
    <input type="radio" name="e" value="3" />
    <input type="radio" name="e" value="4" checked />
    <input type="radio" name="e" value="5" />
    <input type="radio" name="e" value="6" />
    <input type="number" name="f" value="7.1" />
</form>`;

const complexForm = `<form id="complexForm">
    <input type="text" name="a.text" value="1" />
    <textarea name="a.area">2</textarea>
    <input type="checkbox" name="c.one" checked />
    <input type="checkbox" name="c.two" />
    <input type="radio" name="e.radio" value="3" />
    <input type="radio" name="e.radio" value="4" checked />
    <input type="radio" name="e.radio" value="5" />
    <input type="radio" name="e.radio" value="6" />
    <input type="number" name="f[0]" value="7.1" />
    <input type="number" name="f[1]" value="10" />
</form>`;

afterEach(() => {
    document.body.innerHTML = '';
});

it('should serialize flat form', () => {
    document.body.innerHTML = flatForm;

    const formData = serializeForm(document.getElementById('flatForm'));

    expect(formData).toEqual({"a": "1", "b": "2", "c": true, "d": false, "e": "4", "f": 7.1});
});

it('should serialize flat form', () => {
    document.body.innerHTML = complexForm;

    const formData = serializeForm(document.getElementById('complexForm'));

    expect(formData).toEqual({
        "a": {"text": "1", "area": "2"},
        "c": {"one": true, "two": false},
        "e": {"radio": "4"},
        "f": [7.1, 10]
    });
});