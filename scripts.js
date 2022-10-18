const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

const db = firebase.initializeApp(firebaseConfig).firestore();

let form = document.querySelector('.form');
const table= document.querySelector('.table');

let search = document.getElementById('search');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (search.value == '') window.alert('input search is empty');
  else {
    p.innerText = search.value;
    document.body.appendChild(p);
    db.collection('DocumentSearch')
      .doc()
      .set({
        search: search.value,
      })
      .then(() => {
        swal('Success', 'Your search has been saved', 'success');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }
});

// Path: index.html
db.collection('DocumentSearch')
  .get()
  .then((d) => {
    d.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, ' => ', doc.data());
      appendSearch(doc.data().search);
    });
  });

// function for appending the search to the page
const appendSearch = (search) => {
  let p = document.createElement('p');
  let div = document.createElement('div');
  p.innerText = search;
  console.log(search);
  div.appendChild(p);
  document.body.appendChild(div);
};
appendSearch();
