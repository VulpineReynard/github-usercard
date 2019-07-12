/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
const followersArray = ['vulpinereynard', 'tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];
followersArray.forEach(username => {
  /* Step 1: using axios, send a GET request to the following URL 
  (replacing the palceholder with your Github name):
  https://api.github.com/users/<your name>
  */
  axios.get(`https://api.github.com/users/${username}`)
    .then(data => {
      /* Step 2: Inspect and study the data coming back, this is YOUR 
      github info! You will need to understand the structure of this 
      data in order to use it to build your component function 
      */
      console.log(data);
      console.log(data.data.followers_url);
      const cards = document.querySelector('.cards');
      // Step 4: Pass the data received from Github into your function, 
      // create a new component and add it to the DOM as a child of .cards
      cards.appendChild(createCard(data));
    })
    .catch(error => {
      console.log(error);
    })
});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/
function createCard(userObj) {
  const card = document.createElement('div');
  const userImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const personName = document.createElement('h3');
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const address = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');
  const repos = document.createElement('p');

  card.appendChild(userImg);
  card.appendChild(cardInfo);
  cardInfo.appendChild(personName);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.textContent = 'Profile: ';
  profile.appendChild(address);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(repos);
  cardInfo.appendChild(bio);
  
  card.classList.add('card');
  userImg.src = userObj.data.avatar_url;
  cardInfo.classList.add('card-info');
  personName.classList.add('name');
  personName.textContent = userObj.data.name;
  userName.classList.add('username');
  userName.textContent = userObj.data.login;
  location.textContent = `Location: ${userObj.data.location}`;
  address.href = userObj.data.html_url;
  address.textContent = userObj.data.html_url;
  followers.textContent = `Followers: ${userObj.data.followers}`;
  following.textContent = `Following: ${userObj.data.following}`;
  bio.textContent = `Bio: ${userObj.data.bio}`;
  repos.textContent = `Repositories: ${userObj.data.public_repos}`;


  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
// create input field to accept a user entered github username
const githubInput = document.createElement('input');

githubInput.classList.add('github-input');
githubInput.placeholder = 'Enter A Github Username';
githubInput.style.borderRadius = '5px';
githubInput.style.padding = '10px';
githubInput.style.boxShadow = '1px 1px 3px 1px black';
githubInput.style.border = '2px solid #ff99a8';
githubInput.style.background = '#ff6d85';
githubInput.style.color = 'white';
githubInput.style.outline = 'none';
githubInput.addEventListener('focus', (event) => {
  TweenMax.to(event.target, .2, {transform: 'scale(1.1)'});
});
githubInput.addEventListener('blur', (event) => {
  TweenMax.to(event.target, .2, {transform: 'scale(1.0)'});
});

// create a button to add a card of that user
const addCardButton = document.createElement('button');
addCardButton.classList.add('add-card-button');
addCardButton.style.width = '60px';
addCardButton.textContent = 'Submit';
addCardButton.style.borderRadius = '5px';
addCardButton.style.padding = '5px';
addCardButton.style.boxShadow = '1px 1px 3px 1px black';
addCardButton.style.border = '1px solid grey';
addCardButton.style.background = '#ff6d85';
addCardButton.style.color = 'white';
addCardButton.style.outline = 'none';
addCardButton.style.cursor = 'pointer';
addCardButton.addEventListener('mouseover', (event) => {
  TweenMax.to(event.target, .2, {transform: 'scale(1.1)'});

  addCardButton.addEventListener('mouseout', (event) => {
    TweenMax.to(event.target, .2, {transform: 'scale(1)'});
  })
});

// create and append and input field and button that will create cards given a username in the input
const header = document.querySelector('.header');
header.appendChild(githubInput);
header.appendChild(addCardButton);
const githubButton = document.querySelector('.add-card-button');

// when we click the submit button, get the value of the input field and use that as the username
githubButton.addEventListener('click', () => {
  const githubInputValue = githubInput.value;
  addGithubCard(githubInputValue);
});

function addGithubCard(githubUsername) {
  // function accepts a github username and send API request using that username
  axios.get(`https://api.github.com/users/${githubUsername}`)
  .then(data => {
    /* Step 2: Inspect and study the data coming back, this is YOUR 
    github info! You will need to understand the structure of this 
    data in order to use it to build your component function 
    */
    const cards = document.querySelector('.cards');
    // Step 4: Pass the data received from Github into your function, 
    // create a new component and add it to the DOM as a child of .cards
    cards.prepend(createCard(data));
  })
  .catch(error => {
    let githubInputValue = githubInput.value;
    if(githubInputValue == '') {
      alert('Error: Input field is empty. \n' + error);
    }
  })
}