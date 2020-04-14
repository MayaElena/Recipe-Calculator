// BOILERPLATE
$(document).ready(function () {
    // API KEY
    var API_KEY = 'OvxhffEpFz6pKGUuHIfZW9MW8ZxJ2QcSmCtP1j1V';

    // BOILERPLATE

    // Begin space for javascript
    console.log('calculator Time');





    // Folate mcgs




    /**
     * Calculate the entire recipe
     */
    async function calcRecipe() {
        const foundIngredients = [];
        const ingredients = getIngredients()

        let calories = 0;

        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = await getIngredientData(ingredients[i].ingredient);
            console.log(ingredient)
            foundIngredients.push(ingredient);

            if (foundIngredients.length === ingredients.length) {
                //  console.log(foundIngredients)
                for (let j = 0; j < foundIngredients.length; j++) {
                    console.log(foundIngredients[j].foods)
                    let food = foundIngredients[j].foods[0]
                    console.log(food.foodNutrients
                        .filter(nutrient => nutrient.nutrientName === "Energy" && nutrient.unitName === "KCAL"))
                       
                }
            }
        }



        // allData


        // for(var i =)

        // calculateErrors
    }


    /**
     *  Checks errors against AZ Health zone guidlines
     */
    function calculateErrors() {
        //throw modal error per AZ health zone guidleines

        // highlight TWOs highest offendign ingredients
    }


    function getIngredients() {
        const rows = document.querySelectorAll(".ingredientRow")
        const ingredients = [];
        for (var i = 0; i < rows.length; i++) {
            const row = rows[i];
            const ingredient = row.querySelector(".ingredient").value;
            const quantity = row.querySelector(".quantity").value;
            const unit = row.querySelector(".unit").value;
            const fancy = {
                ingredient: ingredient,
                quantity: quantity,
                unit: unit
            }
            ingredients.push(fancy)
        }

        // console.log(ingredients)
        return ingredients;
    }

    function addRow() {
        const ingredientTable = $("#ingredientTable");
        const newRow = $(`    <tr class="ingredientRow">
        <td>
          <input class="ingredient" />
        </td>
        <td>
          <input class="quantity" />
        </td>
        <td>
          <input class="unit"/>
        </td>
      </tr>`);
        ingredientTable.append(newRow)

    }

    async function getIngredientData(ingredient) {
        const res = await $.ajax({
            method: "GET",
            url: "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + API_KEY + "&query=" + ingredient + "&dataType=Foundation,FoodPortion"
        })

        const detail = await $.ajax({
             method: "GET", 
             url: `https://api.nal.usda.gov/fdc/v1/food/${res.foods[0].fdcId}?api_key=${API_KEY}`
        })
        console.log(res,detail)
        // console.log(res)
        return res;
    }




















    $("#calcRecipe").on("click", function (event) {
        calcRecipe();

    })


    $("#addRow").on("click", event => {
        addRow();
    })


    addRow();











    // End Space for javascript
    // BOILERPLATE
});
// BOILERPLATE