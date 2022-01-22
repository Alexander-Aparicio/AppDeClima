require('colors')
const inquirer = require('inquirer')
// const Tarea = require('../modules/Tarea')

const menuPrincipal = async ()=>{

    // console.clear()
    console.log('================================='.green)
    console.log(':::::::::: BIENVENIDO :::::::::::'.white)
    console.log('==================================\n'.green)

  const questions = [
    {
      name:'1) Buscar ciudad',
      value:1
    },
    {
      name:'2) Historial',
      value:2
    },
    {
      name:'3) Salir',
      value:0
    }

  ]

  let opcion = inquirer
  .prompt([
    {
      type: 'list',
      name: 'menu',
      message: 'APP DE CLIMA',
      choices: questions
    }
  ])

  return opcion

}

const search = async (mensaje='Ciudad:')=>{

  let opcion = await inquirer
  .prompt([
    {
      type: 'input',
      name: 'ciudad',
      message: `${mensaje}`,
      validate(value){
        if(value.length === 0){
          return 'Debe ingresar una ciudad'
        }
        return true
      }
    }
  ])

  return opcion

}

const goBack = async()=>{

  const questions = [
    {
      type:'list',
      name:':::',
      choices:[': <<< REGRESAR'.bold]
    }
  ]

  const opcion = await inquirer.prompt(questions)

  return opcion
}

const listadoDeBusqueda = async (lugares = [])=>{

 const choices = lugares.map( (lugar, i) => {

  const idx = `${i+1}`

  return {

    value: lugar.id,
    name:  `${idx} ${lugar.nombre}`.green

  }

 })

 choices.unshift({
   value:'0',
   name:'0.'.green + 'Cancelar'
 })
 
 const questions = [
   {
     type:'list',
     name:'id',
     message:'Seleccione lugar:',
     choices,
   }
 ]

 const {id} = await inquirer.prompt(questions)

 return id

}

const confirmar = async(message)=>{

  const questions = [
    {
      type:'confirm',
      name:'ok',
      message
    }
  ]

  const {ok} = await inquirer.prompt(questions)

  return ok

}

const completarTareas = async (tareas = [])=>{

  const choices = tareas.map( (tarea, i) => {
 
   const idx = `${i+1}`
 
   return {
 
     value: tarea.id,
     name:  `${idx} ${tarea.desc}`.green,
      checked: (tarea.completadoEn) ? true : false
   }
 
  })
  
  const question = [
    {
      type:'checkbox',
      name:'ids',
      message:'Selecciones',
      choices,
    }
  ]
 
  const {ids} = await inquirer.prompt(question)
 
  return ids
 
}


module.exports ={
  menuPrincipal,
  search,
  goBack,
  listadoDeBusqueda,
  // confirmar,
  // completarTareas
}



