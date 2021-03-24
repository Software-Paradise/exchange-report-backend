const mailTemplates = {
    test: ()=>(
        `<div>
            <h1>Correo de Prueba</h1>
            <br/>
            <h3>Hola estimado: {{name}}</h3> 
            <a href='{{url}}'>Haga Clic en este enlace para recibir un saludos</a>   
        </div>
        `
    )
}

module.exports = mailTemplates;