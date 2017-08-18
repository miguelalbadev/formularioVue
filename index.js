

Vue.component('personas', {
  props: ['todo'],
  template: '<li><a @href.prevent="" v-on:click="selectPersona(todo.id)">{{ todo.nombre }} {{ todo.apellidos }} </a></li>',
  methods:{
  	selectPersona:function(id){
  		debugger;
  		app2.seen = true;
  		$.ajax({

		  url:"http://10.60.23.21:64509/api/Personas/"+id,
		    type : 'GET',

		    // el tipo de información que se espera de respuesta
		    dataType : 'json',
		 
		    // código a ejecutar si la petición es satisfactoria;
		    // la respuesta es pasada como argumento a la función
		    success : function(data){
		    	debugger;
		    	app2.Name = data.Nombre;
		    	app2.LastName = data.Apellidos;
		    	app2.Age = data.Edad;
		    	app2.Id = data.Id;
		    },
		 	error: function(xhr, status){
		 		debugger;
		 	},
		    // código a ejecutar sin importar si la petición falló o no
		    complete : function(xhr, status) {
		        //alert('Petición realizada');
		    }
		});
  	}
  }
})






var app = new Vue({
  el: '#app',
  data: {
    personasList: []
  },
  mounted:function(){
  	this.cargaListado();
  },
  methods:{
  	cargaListado(){
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
		        //alert('Petición realizada');
		    }
		});
  	}
  }
})

var app2 = new Vue({
  el: '#app2',
  data: {
    personasList: [],
    Id:'',
    seen:false,
    Name: '',
    LastName: '',
    Age: ''  
	},
	methods:{
		guardar: function(){
			$.ajax({

			  url:"http://10.60.23.21:64509/api/Personas/",
			    type : 'POST',

			    // el tipo de información que se espera de respuesta
			    dataType : 'json',

			    data : { Nombre: app2.Name, Apellidos: app2.LastName, Edad:app2.Age} ,
			 
			    // código a ejecutar si la petición es satisfactoria;
			    // la respuesta es pasada como argumento a la función
			    success : function(data){
			    	debugger;
			    	alert('La función POST funcionó correctamente');	
			    	var persona = {};
		        	persona.id = app2.Id;
		        	persona.nombre = app2.Name;
		        	persona.apellidos = app2.LastName;
		        	persona.edad = app2.Age;
		        	app.personasList.length=0;		
		        	app.cargaListado();    	
			    },
			 	error: function(xhr, status){
			 		debugger;
			 		alert('Disculpe, existió un problema con la función POST');
			 	},
			    // código a ejecutar sin importar si la petición falló o no
			    complete : function(xhr, status) {
			        //alert('Petición realizada');
			    }
			});

		},
		nuevo:function(){
			app2.Name='';
			app2.LastName='';
			app2.Age='';
		},
		eliminar:function(){
			alert('borrando persona....');
		}
	}
})


	






