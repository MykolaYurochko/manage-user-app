const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');

window.addEventListener('load', createUsersWrapper(appContainer));

const mainForm = document.querySelector('#rendering-block');
const addUser = document.querySelector('#add-user');

window.addEventListener('load', () => {
  getUsers(baseUrl, response => {
    parseUsers(mainForm, response);
  });
});

addUser.addEventListener('click', () => {
  postUsers(baseUrl, newUser());
  getUsers(baseUrl, response => {
    parseUsers(mainForm, response);
  });
});

function getUsers(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${url}/users`);
  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });
  xhr.addEventListener('error', () => {
    console.log('error');
  });
  xhr.send();
}

function postUsers(url, body) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${url}/users`);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  xhr.addEventListener('error', () => {
    console.log('error');
  });
  xhr.send(JSON.stringify(body));
}

function putUsers(url, body, id) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `${url}/users/${id}`);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  xhr.addEventListener('error', () => {
    console.log('error');
  });
  xhr.send(JSON.stringify(body));
}

function deleteUsers(url, id) {
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', `${url}/users/${id}`);
  xhr.setRequestHeader('Authorization', 'admin');
  xhr.addEventListener('error', () => {
    console.log('error');
  });
  xhr.send();
}

function newUser() {
  const name = document.querySelector('#name-for-saving').value;
  const username = document.querySelector('#full-name-for-saving').value;
  return { name, username };
}

function updateUser(id) {
  const name = document.querySelector(`#user-${id}`).value;
  const username = document.querySelector(`#user-name-${id}`).value;
  return { name, username };
}

function parseUsers(parent, usersArr) {
  parent.innerHTML = '';
  usersArr.forEach(userObj => parent.appendChild(createUser(userObj)));
}

function createUsersWrapper(parent) {
  const header = document.createElement('h1');
  const creatingBlock = document.createElement('div');
  const name = document.createElement('input');
  const fullName = document.createElement('input');
  const addNewUser = document.createElement('button');
  const dataHeading = document.createElement('div');
  const userIdHeading = document.createElement('span');
  const nameHeading = document.createElement('span');
  const userNameHeading = document.createElement('span');
  const actionsHeading = document.createElement('span');
  const mainForm = document.createElement('div');

  header.innerText = 'Manage User APP';
  name.type = 'text';
  name.placeholder = 'Name';
  name.id = 'name-for-saving';
  fullName.type = 'text';
  fullName.placeholder = 'Full Name';
  fullName.id = 'full-name-for-saving';
  addNewUser.id = 'add-user';
  addNewUser.innerText = 'Add New User';

  userIdHeading.className = 'data-heading id-heading';
  userIdHeading.innerText = 'ID';
  nameHeading.className = 'data-heading';
  nameHeading.innerText = 'Name';
  userNameHeading.className = 'data-heading';
  userNameHeading.innerText = 'User Name';
  actionsHeading.className = 'data-heading';
  actionsHeading.innerText = 'Actions';
  dataHeading.className = 'data-heading-block';
  creatingBlock.className = 'creating-block';
  mainForm.id = 'rendering-block';

  creatingBlock.appendChild(name);
  creatingBlock.appendChild(fullName);
  creatingBlock.appendChild(addNewUser);
  dataHeading.appendChild(userIdHeading);
  dataHeading.appendChild(nameHeading);
  dataHeading.appendChild(userNameHeading);
  dataHeading.appendChild(actionsHeading);
  parent.appendChild(header);
  parent.appendChild(creatingBlock);
  parent.appendChild(dataHeading);
  parent.appendChild(mainForm);
}

function createUser(userObj) {
  const userWrapper = document.createElement('div');
  const userId = document.createElement('span');
  const name = document.createElement('input');
  const userName = document.createElement('input');
  const updateUserBtn = document.createElement('button');
  const deleteUserBtn = document.createElement('button');

  userId.className = 'user-id';
  userId.innerText = userObj.id;
  name.id = `user-${userObj.id}`;
  name.className = `user`;
  name.value = userObj.name;
  userName.id = `user-name-${userObj.id}`;
  userName.className = 'user-name';
  userName.value = userObj.username;

  updateUserBtn.className = 'update-user';
  updateUserBtn.innerText = 'Update';
  updateUserBtn.type = 'button';
  updateUserBtn.addEventListener('click', () => {
    putUsers(baseUrl, updateUser(userObj.id), userObj.id);
  });

  deleteUserBtn.className = 'delete-user';
  deleteUserBtn.innerText = 'Delete';
  deleteUserBtn.type = 'button';
  deleteUserBtn.addEventListener('click', () => {
    deleteUsers(baseUrl, userObj.id);
    getUsers(baseUrl, response => {
      parseUsers(mainForm, response);
    });
  });

  userWrapper.id = userObj.id;
  userWrapper.className = 'single-user';

  userWrapper.appendChild(userId);
  userWrapper.appendChild(name);
  userWrapper.appendChild(userName);
  userWrapper.appendChild(updateUserBtn);
  userWrapper.appendChild(deleteUserBtn);
  return userWrapper;
}