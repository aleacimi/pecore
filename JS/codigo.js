//                                     ****************COMPRAR*****************
const productosVenta = document.getElementById("cards");
let carrito = [];
const catalogo = "../api.json";

$.get(catalogo, function (respuesta, estado) {
    if (estado === 'success') {
        let data = respuesta;
        for (let elemento of data) {

            productosVenta.innerHTML += `<div class="col-12 mb-2 col-md-4">
            <div class="card">
                <img class="card img-top" src="${elemento.thumbnailUrl}" alt="">
                <div class="card-body">
                    <h5>${elemento.title}</h5>
                    <p>${elemento.precio}</p>
                    <button class="btn btn-dark" id="agregar${elemento.id}">Agregar al carrito</button>
                </div>
            </div>
        </div>`
        }
    /*Agregar productos al carrito y que se registren en el storage*/
    for (let elemento of data) {
        let boton = $("#agregar" + (elemento.id));

        boton.on('click', () => {
            console.log($("#agregar" + (elemento.id)));
            $("#carrito").append(`<tr class="elementoCarrito">
            <th class="espaciado">${elemento.title}</th>
            <th class="espaciado">${elemento.precio}$</th>
            </tr>
            </div>`);

            const producto = {
                id: elemento.id,
                nombre: elemento.title,
                precio: elemento.precio
            }
            
            carrito.push(producto);
            localStorage.setItem('carrito', JSON.stringify(carrito));
        })
        
    }
    }
})

//                                           ****************GALERIA*****************
const btnCierra = document.querySelector('#btn-cierra')
const btnRetrocede = document.querySelector('#btn-retrocede')
const btnAdelanta = document.querySelector('#btn-adelanta')
const imagenes = document.querySelectorAll('#galeria img')
const lightbox = document.querySelector('#containerDos')
const imagenActiva = document.querySelector('#imagen-activa')
let indiceImagen = 0;

//abre lightbox
const abreLightbox = (event) =>{
    imagenActiva.src= event.target.src
    lightbox.style.display='flex'
    indiceImagen = Array.from(imagenes).indexOf(event.target);
}

imagenes.forEach((imagen) => {
    imagen.addEventListener('click', abreLightbox);
})

//cierra ventana
btnCierra.addEventListener('click', ()=>{
    lightbox.style.display = 'none';
})

//siguiente imagen
const adelantaImagen = () =>{
    if(indiceImagen === imagenes.lenght -1){
        indiceImagen = -1;
    }
    imagenActiva.src = imagenes[indiceImagen + 1].src
    indiceImagen++;
}

btnAdelanta.addEventListener('click', adelantaImagen);
//retrocede imagen
const retrocedeImagen = () =>{
    if(indiceImagen===0){
        indiceImagen= imagenes.lenght;
    }
    imagenActiva.src = imagenes[indiceImagen - 1].src
    indiceImagen--;
}

btnRetrocede.addEventListener('click', retrocedeImagen);