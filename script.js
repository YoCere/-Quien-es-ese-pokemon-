const cartaContenedor = document.getElementById('carta-contenedor');
const generadorBoton = document.getElementById('generar-boton');
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonImagen = document.getElementById('pokemon-imagen');
const pokemonHabilidad = document.getElementById('pokemon-habilidad');
const pokemonTipos = document.getElementById('pokemon-tipos');
const pokemonAltura = document.getElementById('pokemon-altura');
const pokemonMovimientos = document.getElementById('pokemon-movimientos');
const pokemonEstadisticas = document.getElementById('pokemon-estadisticas');
const adivinanzaContenedor = document.getElementById('adivinanza');
const inputNombre = document.getElementById('input-nombre');
const adivinarBoton = document.getElementById('adivinar-boton');
const resultado = document.getElementById('resultado');

let nombrePokemonActual = '';

function generarID() {
    return Math.floor(Math.random() * 1025) + 1;
}

async function fetchPokemon() {
    const pokemonID = generarID();
    const response = await fetch(`${apiUrl}${pokemonID}`);
    if (!response.ok) {
        throw new Error('No se pudo obtener la información del Pokémon');
    }
    const data = await response.json();
    return data;
}

function mostrarInfoPokemon(pokemon) {
    nombrePokemonActual = pokemon.name;
    pokemonImagen.src = pokemon.sprites.front_default;
    pokemonImagen.style.display = 'block';
    
    // Mostrar los tipos del Pokémon
    const tipos = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    pokemonTipos.textContent = tipos;

    // Mostrar la altura del Pokémon
    const altura = pokemon.height / 10; // Convertir de decímetros a metros
    pokemonAltura.textContent = altura;

    // Mostrar los movimientos del Pokémon
    const movimientos = pokemon.moves.slice(0, 2).map(moveInfo => moveInfo.move.name).join(', ');
    pokemonMovimientos.textContent = movimientos;

    // Mostrar estadísticas como ataque y defensa
    const estadisticas = pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).slice(0, 2).join(', ');
    pokemonEstadisticas.textContent = estadisticas;

    // Mostrar la habilidad del Pokémon
    pokemonHabilidad.textContent = pokemon.abilities[0].ability.name;

    // Mostrar el input de adivinanza y la información del Pokémon
    adivinanzaContenedor.style.display = 'block';
}

function verificarAdivinanza() {
    const nombreIngresado = inputNombre.value.trim().toLowerCase();
    if (nombreIngresado === nombrePokemonActual.toLowerCase()) {
        resultado.textContent = '¡Correcto! Has adivinado el Pokémon.';
        inputNombre.value = ''; // Limpiar el input
        iniciarJuego(); // Cargar el siguiente Pokémon
    } else {
        resultado.textContent = 'Incorrecto, intenta de nuevo.';
    }
}

async function iniciarJuego() {
    try {
        const pokemonData = await fetchPokemon();
        mostrarInfoPokemon(pokemonData);
        resultado.textContent = ''; // Limpiar resultado anterior
    } catch (error) {
        console.error(error);
        alert('Hubo un problema al generar la carta del Pokémon. Inténtalo de nuevo más tarde.');
    }
}

// Evento para iniciar el juego al presionar el botón de generación
generadorBoton.addEventListener('click', iniciarJuego);

// Evento para verificar la adivinanza al presionar el botón de adivinanza
adivinarBoton.addEventListener('click', verificarAdivinanza);