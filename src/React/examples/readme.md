# React TodoMVC Example

## Running

To run the app, spin up an HTTP server（eg. `python -m SimpleHTTPServer`）

## Learning

- `cypress run --project <project-path>`
  - By default, Cypress experts your `cypress.json` to be found where your `package.json` is
  - eg.`cypress run --project ./some/nested/forlder`
- HTML5 Custom Data Attributes `[data-*]`

  - Custom data attributes are intended to store custom data private to the page ro application, for which there are no more appropriate attributes or elements
  - eg.

  ```html
  <div id="strawberry-plant" data-fruit="12"></div>
  <script>
    // Getting data-attributes using getAttribute
    var plant = document.getElementById("strawberry-plant");
    var fruitCount = plant.getAttibute("data-fruit"); // fruitCount = '12'

    // Setting data-attributes using setAttribute
    plant.setAttribute("data-fruit", "7");
  </script>
  ```
