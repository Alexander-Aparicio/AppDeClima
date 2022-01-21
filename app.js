require('colors')
const { menuPrincipal, search, goBack } = require('./helpers/inquirer');
const Busquedas = require('./models/search');

const App = async ()=>{

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
                await busqueda.ciudad(lugar)
                // Lista de lugares encontrados

                // Datos del clima del lugar
                console.log('\n :: Información de ciudad :::\n'.green)
                console.log('\n :: Ciudad :\n'.grey)
                console.log('\n :: Lat :\n'.grey)
                console.log('\n :: Lng :\n'.grey)
                console.log('\n :: Temperatura :\n'.grey)
                console.log('\n :: Mínima:\n'.grey)
                console.log('\n :: Máxima:\n'.grey)

                // regresar
                await goBack()

            break;

            case 2:
                console.log('\n:::¡PERÚ!\n:::¡ECUADOR!\n:::¡CHILE!\n:::¡ESPAÑA!\n'.green)
                await goBack()
                       
            break;
    
        }

    } while (option != 0 );

    console.clear()

}

App()
