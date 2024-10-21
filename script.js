const apiURL = 'https://pokeapi.co/api/v2/pokemon/';
const speciesApiURL = 'https://pokeapi.co/api/v2/pokemon-species/';


// custom bootstrap validation/form handling
(() => {
    'use strict'
    
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        
        form.classList.add('was-validated')
        }, false)
    })
})()

// handle form submissions for regular pokedex
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const pokemonNameOrID = document.getElementById('pokemonNameOrID').value;

    if (pokemonNameOrID) {
        fetchPokemon(pokemonNameOrID);
    }
});


// handle form submissions for ultrapokedex
document.getElementById('ultraForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const pokemonNameOrID = document.getElementById('pokemonNameOrID').value;

    if (pokemonNameOrID) {
        fetchUltra(pokemonNameOrID);
    }
});



// Function that fetches the pokemon data from api for regular pokedex
    async function fetchPokemon(pokemonNameOrID) {
        try {
            // Simulating an API call using fetch
            let response = await fetch(apiURL + pokemonNameOrID);

            let pokemonData = await response.json();
            
            // Process the data into the console log
            console.log("Name: " + pokemonData.name, "\nID: " + pokemonData.id);

            // find the HTML element to append the data to
            let resultArea = document.getElementById('results');

            // append data to HTML element
            resultArea.innerHTML = `
            <h1 class="text-light text-capitalize">${pokemonData.name}</h1><br>
            <img src="${pokemonData.sprites.other["official-artwork"].front_default}">
            <p class="text-light fs-5 text-capitalize">
                <strong class="text-warning">ID:</strong> ${pokemonData.id}<br>
                <strong class="text-warning">Type:</strong> ${pokemonData.types[0].type.name} <br> 
                <strong class="text-warning">Height:</strong> ${pokemonData.height} Units <br>
                <strong class="text-warning">Weight:</strong> ${pokemonData.weight} Units <br> 
            </p>
            `;
                
        } catch (error) {
            // Handle any errors that occur during the async operation
            console.error('Fetch error:', error);

            // find the HTML element to append the data to
            let resultArea = document.getElementById('results');
        
            // append data to HTML element
            resultArea.innerHTML = `
            <h1 class="text-warning text-capitalize">Error!</h1> 
            <h2 class="text-light">Pokemon Unknown.</h2>
            <h3 class="text-light">Please try again</h3>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/201.png">
            `;  
        }
    };

// Function that fetches the pokemon data from api for ultra pokedex
async function fetchUltra(pokemonNameOrID) {

    try {
        // Simulating an API call using fetch
        let response = await fetch(speciesApiURL + pokemonNameOrID);
        let secondResponse = await fetch(apiURL + pokemonNameOrID);

        let speciesData = await response.json();
        let pokemonData = await secondResponse.json();

        let type2 = "This pokemon does not have a secondary type";
        let hiddenAbility = "This pokemon does not have a hidden ability";
        let evolvesFrom = "This is its base evolution";
        let habitat = "Unknown habitat";
        let flavor = "No flavor text available";

        if (pokemonData.types.length > 1) {
            type2 = pokemonData.types[1].type.name;
        }

        if (pokemonData.abilities.length > 1) {
            hiddenAbility = pokemonData.abilities[1].ability.name;
        }

        if (speciesData.evolves_from_species) {
            evolvesFrom = speciesData.evolves_from_species.name;
        }

        if (speciesData.habitat) {
            habitat = speciesData.habitat.name;
        }

        if (speciesData.flavor_text_entries) {
            flavor = speciesData.flavor_text_entries[0].flavor_text;
        }
        
        // Process the data into the console log
        console.log("Name: " + speciesData.name, "\nID: " + speciesData.id);

        // find the HTML element to append the data to
        let resultArea = document.getElementById('results');

        // append data to HTML element
        resultArea.innerHTML = `
        <h1 class="text-success text-capitalize">${pokemonData.name}</h1>
        <img src="${pokemonData.sprites.other["official-artwork"].front_default}">
        <ul class="text-light fs-5 list-group list-group-flus bg-dark">
            <li class="list-group-item bg-dark text-light"><strong class="text-warning">ID:</strong> ${speciesData.id}</li>
            <li class="list-group-item bg-dark text-light"><strong class="text-warning">Pokedex Entry:</strong> ${flavor}</li> 
            <li class="list-group-item bg-dark text-light"><strong class="text-warning">Capture Rate:</strong> ${speciesData.capture_rate}%</li>
            <li class="list-group-item bg-dark text-light"><strong class="text-warning">Evolves From:</strong> ${evolvesFrom}</li>
            <li class="list-group-item bg-dark text-light text-capitalize"><strong class="text-warning">Introduced:</strong> ${speciesData.generation.name}</li>
            <li class="list-group-item bg-dark text-light"><strong class="text-warning">Habitat:</strong> ${habitat}</li>
            <li class="list-group-item bg-dark text-light"><strong class="text-warning">Base Happiness:</strong> ${speciesData.base_happiness}</li>
            <li class="list-group-item bg-dark text-light"><strong class="text-warning">Ability:</strong> ${pokemonData.abilities[0].ability.name}</li>
            <li class="list-group-item bg-dark text-light"><strong class="text-warning">Hidden Ability:</strong> ${hiddenAbility}</li>
            <li class="list-group-item bg-dark text-light"><strong class="text-warning">Primary Type:</strong> ${pokemonData.types[0].type.name}</li>
            <li class="list-group-item bg-dark text-light"><strong class="text-warning">Secondary Type:</strong> ${type2}</li>
            <li class="list-group-item bg-dark text-light"><strong class="text-warning">Height:</strong> ${pokemonData.height} Units</li>
            <li class="list-group-item bg-dark text-light"><strong class="text-warning">Weight:</strong> ${pokemonData.weight} Units</li>
            <li class="list-group-item bg-dark text-light"><strong class="text-warning">Base Experience:</strong> ${pokemonData.base_experience}</li>

        </ul>
        `;
            
    } catch (error) {
        // Handle any errors that occur during the async operation
        console.error('Fetch error:', error);

        // find the HTML element to append the data to
        let resultArea = document.getElementById('results');
    
        // append data to HTML element
        resultArea.innerHTML = `
        <h1 class="text-warning text-capitalize">Error!</h1> 
        <h2 class="text-light">Pokemon Unknown.</h2>
        <h3 class="text-light">Please try again</h3>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/201.png">
        `;  
    }
};