window.addEventListener('load', () => {
  filteredUsers(people.results);
  //users();
});

async function users() {
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const result = await res.json();
  filteredUsers(result.results);
};


const filteredUsers = (data) => {
  const arrayUsers = data.map(({ name, dob, gender, picture }) => {
    return {
      name: name.first,
      last: name.last,
      age: dob.age,
      gender: gender,
      picture: picture.thumbnail,
      fullInfo: `${name.first} ${name.last} ${dob.age}`,
    };
  });

  filteredUserList(arrayUsers);
};

const filteredUserList = (data) => {
  const inputUsers = document.getElementById('input-users');
  const buttonSearch = document.getElementById('search');

  inputUsers.addEventListener("keyup", function () {
    var nameInput = inputUsers.value;
    if (nameInput != "") {
      buttonSearch.removeAttribute("disabled");
    } else {
      buttonSearch.setAttribute("disabled", null);
    }
  });

  const userSubmit = (e) => {

    var child = resultUsers.lastElementChild;
    var stats = resultStats.lastElementChild;

    while (child) {
      resultUsers.removeChild(child);
      child = resultUsers.lastElementChild;
      while (stats) {
        resultStats.removeChild(stats);
        stats = resultStats.lastElementChild;
      }
    }

    for (let i = 0; i < e.target.length; i++) {
      val = e.target[0];
    }

    var ageSum = [];
    var accumSex = [];

    for (let i = 0; i < data.length; i++) {
      const valLowerCase = val.value.toLowerCase();
      const fullInfoLowerCase = data[i].fullInfo.toLowerCase();

      if (fullInfoLowerCase.includes(valLowerCase) === true) {
        const pFilteredUsers = document.createElement('p');
        pFilteredUsers.setAttribute('id', 'filtered-users');
        const userImage = document.createElement('img');
        userImage.setAttribute('src', `${data[i].picture}`);
        pFilteredUsers.appendChild(userImage);
        let content = document.createTextNode(`${data[i].name} ${data[i].last}, ${data[i].age}`);
        pFilteredUsers.appendChild(content);
        resultUsers.appendChild(pFilteredUsers);
        ageSum.push(data[i].age);
        accumSex.push(data[i].gender);
      }
    }

    const ageUmLen = ageSum.length;

    ageSum = ageSum.reduce((accum, curr) => accum + curr);
    ageAvg = Math.round(ageSum / ageUmLen);

    var accumSexM = accumSex.filter((value) => value === 'male').length;
    var accumSexF = accumSex.filter((value) => value === 'female').length;


    for (let i = 0; i < 4; i++) {
      const pFilteredStats = document.createElement('p');
      pFilteredStats.setAttribute('id', 'statistics');
      if (i === 0) {
        var c = document.createTextNode(`Male amount: ${accumSexM}`);
      } else if (i === 1) {
        var c = document.createTextNode(`Female amount: ${accumSexF}`);
      } else if (i === 2) {
        var c = document.createTextNode(`Sum of ages: ${ageSum}`);
      } else if (i === 3) {
        var c = document.createTextNode(`Average ages: ${ageAvg}`);
      }
      pFilteredStats.appendChild(c);
      resultStats.appendChild(pFilteredStats);
    }

    e.preventDefault();
  };

  const form = document.getElementById('form');
  const resultUsers = document.querySelector('.result-users');
  const resultStats = document.querySelector('.result-stats');
  form.addEventListener('submit', userSubmit);
};