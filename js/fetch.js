/*
fetch("https://jsonplaceholder.typicode.com/posts")
.then(response => response.json())
.then(data => {
    const posts = document.getElementById("listado");
    data.forEach(element => {
      const items = document.createElement("li");
      items.innerHTML = `<h5>${element.title}</h5>
                        <p>${element.body}</p>`

      posts.append(items);
    });

  }) */

/* fetch("https://jsonplaceholder.typicode.com/posts", {
  method: 'POST',
  body: JSON.stringify({
    title: "Prueba",
    body: "Probando la peticion",
    userId: 1
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
})
.then(response => response.json())
.then(data => console.log(data)); */

/* fetch("./js/data.json")
  .then(response => response.json())
  .then(data => {
    const posts = document.getElementById("listado");
    data.forEach(element => {
      const items = document.createElement("li");
      items.innerHTML = `<h5>${element.nombre}</h5>
                        <p>${element.id}</p>
                        <p>${element.precio}</p>
                        <p>${element.descripcion}</p>`

      posts.append(items);
    });

  }) */

  const traerDatos = async() => {
    const respuesta = await fetch("./js/data.json");
    const data = await respuesta.json();
    const posts = document.getElementById("listado");

    data.forEach(element => {
      const items = document.createElement("li");
      items.innerHTML = `<h5>${element.img}</h5>
      <img src="${element.img}">
      `

      posts.append(items);
    });
  }

  traerDatos();