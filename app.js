let toDoText = document.querySelector('.to-do'),
  button = document.querySelector('.submit-to-do'),
  main = document.querySelector('.list-container'),
  clear = document.querySelector('.to-do-clear');

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

// clearing list
clear.addEventListener('click', (e) => {
  e.preventDefault();
  if (confirm('Do you wish to delete all Items on your list')) {
    items = [];
    updateToDO();
  }
});

// onclick event
button.addEventListener('click', (e) => {
  e.preventDefault();
  if (!toDoText.value.replace(/\s/g, '').length) {
    alert('list item cannot be empty');
  } else {
    let item = new ToDo(toDoText.value, getKey());
    items.push(item);
  }
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
                <div class="container color1">
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

// themes
