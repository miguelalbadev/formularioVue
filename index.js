

Vue.component('personas', {
  props: ['todo'],
  template: '<li><a href="">{{ todo.nombre }} {{ todo.apellidos }} </a></li>'
})


$.ajax({

      url:"http://10.60.23.21:64509/api/Personas/",
        type : 'GET',
 
        // el tipo de información que se espera de respuesta
        dataType : 'json',
     
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(data){
        	debugger;
        	for(i=0;i<data.length;i++){
        		var persona = {};
	        	persona.id = data[i].Id;
	        	persona.nombre = data[i].Nombre;
	        	persona.apellidos = data[i].Apellidos;
	        	persona.edad = data[i].Edad;
	        	app.personasList.push(persona);
        	}
        	
        },
     	error: function(xhr, status){
     		debugger;
     	},
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            alert('Petición realizada');
        }
});


var app = new Vue({
  el: '#app',
  data: {
    personasList: []
  }
})
	






