const fs = require('fs');

let listadoTareas = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoTareas);

    fs.writeFile('db/data.json', data, (err) => {
      if (err) throw new Error('No se pudo almacenar la tarea', err);
      //console.log('Tarea almacenada exitosamente');
    });
}

const cargarDB = () => {

    try {
        //en caso de que el archivo data.json tenga datos
        listadoTareas = require('../db/data.json');
    } catch (e) {
        //caso contrario
        listadoTareas = [];
    } finally {

    }

}

const crear = (descripcion) => {

    //Cargamos el archivo data.json para poder agregar tareas nuevas en el
    cargarDB();

    let tareaPorHacer = {
        descripcion,
        completado : false
    }

    listadoTareas.push(tareaPorHacer);

    //guardamos las tareas
    guardarDB();

    //retornamos la tarea que acabamos de crear
    return tareaPorHacer;

}

const getTareas = () => {

    //Cargamos el archivo data.json
    cargarDB();

    //retornamos las tarea cargadas en elarreglo listadoTareas[]
    return listadoTareas;
}

const actualizar = (descripcion, completado=true) => {

    //Cargamos el archivo data.json
    cargarDB();

    //recorro el arreglo listadoTareas buscando el index
    //de la descripcion almacenada
    let index = listadoTareas.findIndex( tarea => tarea.descripcion === descripcion)

    //si existe el index de la descripcion en el arreglo actualizamos su estatus (completado a true)
    if (index>=0) {
        listadoTareas[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    //Cargamos el archivo data.json
    cargarDB();

    //crea un nuevo array con todos los elementos que cumplan la
    //*condición implementada por la función dada.
    //*la descripcion de la tarea almacenada debe ser diferente a la descripcion que recibimos por parametro
    let nuevoListado = listadoTareas.filter( tarea => tarea.descripcion !== descripcion )

    //si la longitud del arreglo (nuevoListado) es igual a la del arreglo (listadoTareas)
    //eso quiere decir que no se borro
    if (listadoTareas.length === nuevoListado.length){
        return false;
    //caso contrario si se borro
    } else {
        // listadoTareas es el arreglo que podemos guardar
        //por eso le asignamos el valor del arreglo nuevoListado
        listadoTareas = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getTareas,
    actualizar,
    borrar
}
