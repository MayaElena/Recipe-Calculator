// BOILERPLATE
$(document).ready(function () {
    // API KEY
    var API_KEY = 'OvxhffEpFz6pKGUuHIfZW9MW8ZxJ2QcSmCtP1j1V';

    // BOILERPLATE

    // Begin space for javascript
    console.log ('calculator Time');

    var searchTerm = "cheddar cheese";

    $.ajax({
        method:"GET",
        url: "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + API_KEY + "&query=" + searchTerm + "&dataType=Foundation"
    }).then(function(res){
        console.log(res);
    });





    // Folate mcgs




    var ingredients = [
        {
            name: "Bell Pepper",

        }
    ];



    /**
     * This function takes in 
     */
    function calculateInformation(){

    }














































    // End Space for javascript
    // BOILERPLATE
});
// BOILERPLATE