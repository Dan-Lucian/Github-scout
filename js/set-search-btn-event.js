export function setSearchBtnEvent() {
  document.getElementById('form').onsubmit = updateUser;
}

async function updateUser() {
  event.preventDefault();

  const input = document.getElementById('search-input');
  const inputValue = input.value;
  input.value = '';

  const userData = await fetchUserData(inputValue);
  setUserData(userData);

  // const profileImg = document.getElementById('profile-img');
  // const userName = document.getElementById('user-name');
  // const profileLink = document.getElementById('profile-link');
  // const dateJoined = document.getElementById('date-joined');
  // const bio = document.getElementById('bio');

  console.log(userData);
}

async function fetchUserData(userName) {
  const response = await fetch(`https://api.github.com/users/${userName}`);
  const data = response.json();
  return data;
}

function setUserData(userData) {
  const infoElements = document.querySelectorAll('[data-user]');
  console.log(infoElements);

  infoElements.forEach(element => {
    element.innerHTML = userData[element.dataset.user];
  });
}
