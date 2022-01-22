const fs = require('fs')
const axios = require('axios').default

class Busquedas {

    historial = []
    dbPath = './db/database.json';

    constructor(){

    }

    get paramsMapbox(){
        return{
            'limit':4,
            'language':'es',
            'access_token': process.env.MAPBOX_KEY,
        }
    }

    async ciudad( lugar ){

        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar.ciudad}.json`

        // ¿Quieres usar async/await? Añade la palabra reservada `async` a tu función/método externo.

        const respuesta = await axios.get(url, {
            params: this.paramsMapbox
        })
        
        return respuesta.data.features.map( x => ({
            id:x.id,
            nombre: x.place_name,
            lng:x.center[0],
            lat:x.center[1]
        }))

    }

    get paramsWeather(){
        return{
            'appid':process.env.OPENWEATHER_KEY,
            'units':'metric',
            'lang':'es'
        }
    }

    async clima(lat, lon){

        const url = `https://api.openweathermap.org/data/2.5/weather`

        try {

            const respuesta= await axios.get(url,{
                params: {...this.paramsWeather, lat, lon}
            })

            const { weather, main } = respuesta.data

            return {
                desc: weather[0].description,
                min:main.temp_min,
                max:main.temp_max,
                temp:main.temp
            }

            
        } catch (error) {

            console.log(error)
            
        }

    }

    agregarHistorial(lugar){

        if( this.historial.includes(lugar.toLocaleLowerCase())){
            return
        }

        this.historial.unshift(lugar.toLocaleLowerCase())

        this.guardarBD()
    }

    guardarBD(){

        const payload = {
            historial:this.historial
        }

        fs.writeFileSync( this.dbPath, JSON.stringify(payload))

    }

}

module.exports = Busquedas