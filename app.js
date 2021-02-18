const { guardarDb, leerDb } = require('./helpers/guardarArchivo');
const { inquirerMenu, InquirerPausa, leerInput, listadoTareasBorrar, mostrarListadoCheckList, confirmar } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

require('colors');

const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();
    const tareasDb = leerDb();

    if ( tareasDb ) {
        // Carga el archivo guardado
        tareas.cargarTareasFromArr(tareasDb);
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                // Crear tarea
                const desc = await leerInput( 'Descripción: ' );
                tareas.crearTarea( desc );
            break;

            case '2':
                // Lista las tareas
                tareas.listarTareasCompletas();
            break;

            case '3':
                // Lista las tareas completadas
                tareas.listarCompletadasPendientes();
            break;

            case '4':
                // Lista las tareas pendientes
                tareas.listarCompletadasPendientes( false );
            break;

            case '5':
                // Completar tareas
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.ToggleTask(ids);
            break;

            case '6':
                // Borrar una tareas
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirmar('¿Está seguro de borrar el registro?');
                    if (ok) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
            break;
        }
        
        guardarDb( tareas.listadoArr );
        await InquirerPausa();

    } while ( opt != '0');

}


main();