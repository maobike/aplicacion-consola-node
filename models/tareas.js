const colors = require('colors');
const Tarea = require('./tarea');
require('./tarea');

class Tareas {
    _Listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._Listado).forEach( key => {
            const tarea = this._Listado[key];
            listado.push( tarea );
        });
        return listado;
    }

    constructor() {
        this._Listado = {};
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea( desc );
        this._Listado[tarea.id] = tarea;
    }

    borrarTarea( id = '' ) {
        if ( this._Listado[id] ) {
            delete this._Listado[id];
        }
    }

    cargarTareasFromArr( tareas = []) {
        tareas.forEach( tarea => {
            this._Listado[tarea.id] = tarea;
        });
    }

    listarTareasCompletas(){
        console.log();
        this.listadoArr.forEach( (tarea, index) => {
            const idx    = `${ index + 1  }`;
            const estado = (tarea.completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`   ${ (idx + '.').green } ${tarea.desc} :: ${estado}`);
        });
        
    }

    listarCompletadasPendientes( completadas = true){
        console.log();
        let idx = 1;
        this.listadoArr.forEach( tarea => {
            const { desc, completadoEn} = tarea;
            const estado = (tarea.completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            if (completadas) {
                if (tarea.completadoEn) {
                    console.log(`   ${ (idx + '.').green } ${desc} :: ${completadoEn.green}`);
                    idx++;
                }
            }else{
                if (!tarea.completadoEn) {
                    console.log(`   ${ (idx + '.').green } ${desc} :: ${estado}`);
                    idx++;
                }
            }
        });
        
    }

    ToggleTask( ids = [] ) {
        ids.forEach( id => {
            const tarea = this._Listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) {
                this._Listado[tarea.id].completadoEn = null;
            }
        })
    }

}

module.exports = Tareas;