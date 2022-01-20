let toDoText = document.querySelector('.to-do'),
  button = document.querySelector('.submit-to-do'),
  main = document.querySelector('.list-container');

// class for object creation
class ToDo {
  constructor(todo, key) {
    this.key = key;
    this.todo = todo;
  }
}

// get key for new item
// using time milliseconds as an identification key
function getKey() {
  const date = new Date();
  const key = date.getTime();
  return key;
}

// all items holder
let items = JSON.parse(localStorage.getItem('ToDo')) || [];

// rendering elemnts beofre anything else so we can see them from local storage on refresh
renderElements();

// onclick event
button.addEventListener('click', (e) => {
  e.preventDefault();
  let item = new ToDo(toDoText.value, getKey());
  items.push(item);
  console.log(items);

  renderElements();
  updateToDO();
  toDoText.value = '';
});

// renderlist with elements
function renderElements() {
  main.innerHTML = '';
  items.forEach((item) => {
    main.innerHTML += `
            <ul>
                <div class="container">
                    <li class="to-do-item">${item.todo}</li>
                    <p class="removeItem" onclick="removeItem(${item.key})">&#10005;</p>
                </div>
            </ul>
            `;
  });
}

// removing items from the array with the correct key
function removeItem(key) {
  items = items.filter((item) => item.key !== key);
  updateToDO();
}

// update UI
function updateToDO() {
  renderElements();

  // save to localstorage
  localStorage.setItem('ToDo', JSON.stringify(items));
}
