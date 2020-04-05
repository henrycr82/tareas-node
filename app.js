//requieres
const argv = require('./config/yargs').argv;
const tareas = require('./tareas/tareas');
const colors = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let porHacer = tareas.crear(argv.descripcion);
        console.log(porHacer);
    break;
    case 'listar':
        let tareasConEstatus = tareas.getTareas();
        for (tarea of tareasConEstatus) {
            console.log('========Por Hacer========'.green);
            console.log(tarea.descripcion);
            console.log('Estado: ',    tarea.completado);
            console.log('========================='.green);
        }
    break;
    case 'actualizar':
        let actualizado = tareas.actualizar(argv.descripcion,argv.completado);
        console.log(actualizado);
    break;
    case 'borrar' :
        let borrado = tareas.borrar(argv.descripcion);
        console.log(borrado);
    break;
    default:
        console.log('Comando no reconocido');
}
