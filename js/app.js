//
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso);
    //eliminar un curso
    carrito.addEventListener('click', eliminarCurso);
    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click',vaciarCarrito);
}


//Funciones
function agregarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function leerDatosCurso(curso){
    //crea objeto con datos del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe){
        const cursos =articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id){
                curso.cantidad++;
            }
            return curso;
        })
        articulosCarrito = [...cursos]
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    //agrega el elemento al carrito
    

    carritoHtml(curso);
}


function carritoHtml(curso){

    //limpiar html
    limpiarHTML()
    //agrega el carrito al html
    articulosCarrito.forEach(curso =>{
        const row = document.createElement('tr');
        row.innerHTML= `
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                ${curso.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>
        `

        //agrega el elemento al tbody
        contenedorCarrito.appendChild(row);
    })    
}

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function eliminarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito.forEach((curso,index) => {
            if (curso.id === cursoId){
                if (curso.cantidad > 1){
                    curso.cantidad--;
                }else{
                    articulosCarrito.splice(index,1);
                }
            }
        })
        carritoHtml()
    }
}

function vaciarCarrito(e){
    e.preventDefault();
    articulosCarrito = [];
    limpiarHTML();
    
}