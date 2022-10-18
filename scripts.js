const firebaseConfig = {
  apiKey: 'AIzaSyBvQqfAlXssffV1ywtxgdYS67i3tB0WuyA',
  authDomain: 'fab-web-site.firebaseapp.com',
  projectId: 'fab-web-site',
  storageBucket: 'fab-web-site.appspot.com',
  messagingSenderId: '283650575875',
  appId: '1:283650575875:web:2bd8aed1b6f44ef32f8836',
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
