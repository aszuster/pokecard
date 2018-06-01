/*  

TRABAJO PRACTICO FINAL: POKECARD

En el siguiente trabajo practico utilizaremos la api de pekocards para traer información de cartas pokemon.

Consignas:

HEADER:
- La página debe contar con un header con una imagen que al clickearla nos recargue la página.

BODY
- Debemos contar con un select box que constará con las siguientes opciones:

	mazo 1 -> value "base1"
	mazo 2 -> value "base2"
	mazo 3 -> value "base3"
	mazo 4 -> value "base4"
	mazo 5 -> value "base5"
	mazo 6 -> value "base6"

1) Al cambiar de opcion, se mostraran por pantalla las imagenes de cada una de las cartas pertenecientes a ese mazo.
2) Al clickear en cada una de las cartas, mostraremos en la pantalla la siguiente información:
 - Imagen
 - Nombre
 - numero de la carta
 - vida (hp)
 - ataques (cada uno con su descripcion y daño)


FOOTER
- En el footer debemos tener informacion relevante con respecto al Alumno, año, links a redes sociales
- El footer tambien debe contar con un ancla que nos lleve hacia arriba de todo de la página.

BONUS: Si clickeamos en una imagen de un libro deberemos abrir un "cuadro de dialogo" con la imagen
grande dentro (Construirlo Manualmente)

URLS de ejemplo para hacer Ajax Requests:

https://api.pokemontcg.io/v1/cards?setCode=base1
https://api.pokemontcg.io/v1/cards?setCode=base2
https://api.pokemontcg.io/v1/cards?setCode=base3
https://api.pokemontcg.io/v1/cards/base1-43
https://api.pokemontcg.io/v1/cards/base1-45
https://api.pokemontcg.io/v1/cards/base2-45
https://api.pokemontcg.io/v1/cards/base2-45
https://api.pokemontcg.io/v1/cards/base3-25
https://api.pokemontcg.io/v1/cards/base3-26

*/


//- La página debe contar con un header con una imagen que al clickearla nos recargue la página.

//1) Al cambiar de opcion, se mostraran por pantalla las imagenes de cada una de las cartas pertenecientes a ese mazo.

'use strict'

$("#mazos").change(function(){
var mazo = ($(this).val());
$('#overlayCarga').show();
$('#loading').show();
$( ".container" ).html('');

   $.ajax({
	type: 'GET',
	dataType: 'json',
	url: 'https://api.pokemontcg.io/v1/cards?setCode=' + mazo,
	success: function (data) {

		
		renderizarCartas(data);
		$('#overlayCarga').hide();
		$('#loading').hide();

	},
	error: function (data) {
	
	}
});

});




function renderizarCartas(data){

	data.cards.map(function(element, index) {
		
		var selectedImage = element.imageUrl;
		var selectedName = element.name;
		var selectedNumber = element.number;
		var selectedHp = element.hp;
		var selectedAttacks = element.attacks;
		var mazo = element.setCode;

		var images = $('<img src="' + selectedImage + '"/>');

		images.click(function(event){
			console.log(selectedNumber);
			   $.ajax({
				type: 'GET',
				dataType: 'json',
				url: 'https://api.pokemontcg.io/v1/cards/' + mazo + '-' + selectedNumber,
				success: function (data) {
					renderizarInfo(data);

				},
				error: function (data) {
	
				}
		});
		})
		$( ".container" ).append( images );
		


	})
		//$( ".container" ).find( "img" ).click(function(event){
		//console.log(this);
	//})
}

function renderizarInfo(data){
	$( "#modalContent" ).html('');
	$('#overlay').show();
	$('#containerInfo').show();
	var selectedImage = data.card.imageUrl;
	var selectedName = data.card.name;
	var selectedNumber = data.card.number;
	var selectedHp = data.card.hp;
	var selectedAttacks = data.card.attacks;
	var images = $('<img src="' + selectedImage + '"/>');
	var name = $('<h2>' + selectedName + '</h2>');
	var number = $('<p>número de carta: ' + selectedNumber + '</p>');
	var hp = $('<p>vida de la carta: ' + selectedHp + '</p>');
	$( "#modalContent" ).append( images );
	$( "#modalContent" ).append( name );
	$( "#modalContent" ).append( number );
	$( "#modalContent" ).append( hp );

	data.card.attacks.map(function(element, index) {
		var attackName = element.name;
		var attackDesc = element.text;
		if (element.damage === ""){
			var ataque = $('<p>Ataque: ' + attackName + '</p>');
			var desc = $('<p>descripción: ' + attackDesc + '</p>');
			var damage = $('<p>No realiza daño</p>');

		} else {
			var attackDamage = element.damage
			var ataque = $('<p>Ataque: ' + attackName + '</p>');
			var desc = $('<p>descripción: ' + attackDesc + '</p>');
			var damage = $('<p>Daño: ' + attackDamage + '</p>')
		}
		$( "#modalContent" ).append( ataque );
		$( "#modalContent" ).append( desc );
		$( "#modalContent" ).append( damage );
	})

	$('#close').click(function() {
		$('#overlay').hide();
		$('#containerInfo').hide();
	})
	$('#containerInfo').click(function(event){
		event.stopPropagation();		
	})
	$( "#overlay" ).click(function( event ) {
  		$('#overlay').hide();
  		$('#contentInfo').hide();
	});
}



//	value = $(this).attr('option');
//})

/*
$('li').click(function(event){
	html = $(this).attr('data-attr');
	
$.ajax({
	type: 'GET',
	dataType: 'html',
	url: 'includes/' + html,
	success: function (data) {

	renderizar(data);

	},
	error: function (data) {
	
	}

})

function renderizar (data){

	descripcion = data;
	$('.descripcion').html(descripcion);//.html lo que hace es pisar lo que ya estaba	
}

})*/