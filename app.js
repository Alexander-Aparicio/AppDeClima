require('dotenv').config()
require('colors')
const { menuPrincipal, search, goBack, listadoDeBusqueda } = require('./helpers/inquirer');
const Busquedas = require('./models/search');



const App = async ()=>{

    console.clear()
    const busqueda = new Busquedas()

    // Se determina el variable que determina las acciones del menú
    let option

    // Se usa el ciclo loop 'do while' para retornar a la interfaz inicial
    // del menú después de realizar una acción 
    do {

        console.clear()

        let menu =await menuPrincipal()

        option = menu.menu

        switch (option) {

            case 0:
                console.log('::::::¡HASTA LUEGO! :)'.green)
                
            break;

            case 1:
                // Mostrar msj de ingreso de búqueda
                const lugar = await search()
                const res =await busqueda.ciudad(lugar)
                const id = await listadoDeBusqueda(res)
                if(id==='0') continue

                const lugarSelec = res.find( l => l.id === id)
                
                busqueda.agregarHistorial(lugarSelec.nombre)

                const resClima = await busqueda.clima(lugarSelec.lat,lugarSelec.lng) 
                // Lista de lugares encontrados

                // Datos del clima del lugar
                console.log('\n :: Información de ciudad :::\n'.green)
                console.log('\n :: Ciudad :'.grey, lugarSelec.nombre)
                console.log('\n :: Lat :'.grey, lugarSelec.lat)
                console.log('\n :: Lng :'.grey, lugarSelec.lng)
                console.log('\n :: Temperatura :'.grey,resClima.temp,'°C')
                console.log('\n :: Mínima:'.grey, resClima.min)
                console.log('\n :: Máxima:'.grey, resClima.max)
                console.log('\n :: Descripción:'.grey, resClima.desc)
                console.log('\n:::APP DE CLIMA'.grey)

                // regresar
                await goBack()

            break;

            case 2:

                busqueda.readDB()

                busqueda.historialCapitalizado.forEach((lugar, i)=>{

                    const idx = `${i+1}`

                    console.log(`\n:${idx} ${lugar}\n`)

                })
                
                await goBack()
                       
            break;
    
        }

    } while (option != 0 );

    console.clear()

}

App()
