export function setSearchBtnEvent() {
  document.getElementById('form').onsubmit = updateUser;
}

async function updateUser() {
  event.preventDefault();

  const input = document.getElementById('search-input');
  const inputValue = input.value;
  if (!inputValue) return;

  input.value = '';

  try {
    const userData = await fetchUserData(inputValue);
    setUserData(userData);
  } catch (err) {
    console.log('ooops an error occured:');
    console.log(err);
  }
}

async function fetchUserData(userName) {
  const response = await fetch(`https://api.github.com/users/${userName}`);
  const data = await response.json();
  return data;
}

function setUserData(userData) {
  const infoElements = document.querySelectorAll('[data-user]');

  infoElements.forEach((element) => {
    element.innerHTML = userData[element.dataset.user] || 'not provided';
    console.log(element.dataset.user);

    // fix number 0 triggering 'not provided'
    if (userData[element.dataset.user] === 0) element.innerHTML = 0;

    // copy login to name in case of no name
    if (element.dataset.user === 'name' && !userData['name'])
      element.innerHTML = userData['login'];

    // handle specific complex cases
    switch (element.dataset.user) {
      case 'avatar_url':
        element.src = userData['avatar_url'];
        break;

      case 'login':
        element.href = userData['html_url'];
        break;

      case 'blog':
        element.href = userData['blog'];
        break;

      case 'created_at':
        const date = new Date(userData['created_at']);
        element.innerHTML =
          'Joined ' +
          date.getUTCDate() +
          ' ' +
          getMonthName(date.getUTCMonth()) +
          ' ' +
          date.getUTCFullYear();
        break;
    }
  });

  function getMonthName(monthNumber) {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return monthNames[monthNumber];
  }
}
