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
    console.log(userData);
  } catch (err) {
    console.log('ooops an error occured during data fetching');
    console.log('error message: ' + err.message);
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

    //fix number 0 triggering 'not provided'
    if (userData[element.dataset.user] === 0) element.innerHTML = 0;

    // handle complex individual cases
    if (element.dataset.user === 'login') element.href = userData['html_url'];
    if (element.dataset.user === 'avatar_url')
      element.src = userData['avatar_url'];
    if (element.dataset.user === 'created_at') {
      const date = new Date(userData['created_at']);
      element.innerHTML =
        'Joined ' +
        date.getUTCDate() +
        ' ' +
        getMonthName(date.getUTCMonth()) +
        ' ' +
        date.getUTCFullYear();
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

  //2010-07-30T14:31:35Z
}
