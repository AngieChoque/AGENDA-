  const firebaseConfig = {
    apiKey: "AIzaSyCEiDumlg5SSRsK1jxY5DJR07AK0y2ZkVg",
    authDomain: "quinto-2e2ef.firebaseapp.com",
    projectId: "quinto-2e2ef",
    storageBucket: "quinto-2e2ef.appspot.com",
    messagingSenderId: "309706655210",
    appId: "1:309706655210:web:4ade94c23ba7f55e611e93"
  };
 
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  let nombre = document.getElementById("name");
  let cel = document.getElementById("celphone");
  let correo =document.getElementById("email");
  let save_btn = document.getElementById("save-btn");
  let lista = document.getElementById("lista");
  save_btn.addEventListener("click", () => {
    let data = {
      nombre: nombre.value,
      celular: cel.value,
      correo:correo.value,
    };
    save_data_firebase(data);
  });
  
  const save_data_firebase = (d) => {
    db.collection("contactos")
      .add(d)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        get_data_firebase();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  
  let contactos_arr = [];
  
  const get_data_firebase = () => {
    contactos_arr = [];
    db.collection("contactos")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          contactos_arr.push(doc.data());
        });
        buildList();
      });
  };
  
  const buildList = () => {
    lista.innerHTML = "";
    contactos_arr.forEach((e) => {
      lista.insertAdjacentHTML(
        "beforeend",
        `
       <li>${e.nombre} - ${e.celular}- ${e.correo}</li>
      `
      );
    });
  };
  
  get_data_firebase();