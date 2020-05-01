// BOILERPLATE
$(document).ready(function () {
    let fuzzy;
    let count = 0;
    const ingredients = {};
    $.ajax({
        method: "GET",
        url: "https://agile-shore-16925.herokuapp.com/api/ingredients"
    }).then(ingredientsData => {
        ingredientsData.forEach(ingredient => {
            ingredients[ingredient.fullname] = ingredient
        })
        console.log(ingredients)
        fuzzy = FuzzySet(getIngredientKeys(), true, 1, 4);
        addRow();
    })
    // Standard of nutrients is 100g
    // const ingredients = {
    //     "tomatoes": {
    //         fullname: "Raw Tomatoes, Sliced",
    //         nutrients: {
    //             calories: 22.14,
    //             total_fat: .25,
    //             saturated_fat: .03,
    //             cholesterol: 0,
    //             sodium: 6.15,
    //             total_carbohydrates: 4.78,
    //             dietary_fiber: 1.48,
    //             sugars: 3.23,
    //             protein: 1.08,
    //             potassium: 291.51
    //         },
    //         servingSize: 123,
    //         measures: [
    //             {
    //                 unit: 'Tomato(es)',
    //                 conversion: 123
    //             },
    //             {
    //                 unit: "Cups, Chopped or Sliced",
    //                 conversion: 180
    //             },
    //             {
    //                 unit: "grams",
    //                 conversion: 1
    //             }, 
    //             {
    //                 unit: "oz",
    //                 conversion: 28.3495
    //             }]
    //     },
    //     "sweet onion": {
    //         fullname: "Sweet Onion",
    //         nutrients: {
    //             calories: 105.92,
    //             total_fat: .26,
    //             saturated_fat: .00,
    //             cholesterol: 0,
    //             sodium: 26.48,
    //             total_carbohydrates: 24.99,
    //             dietary_fiber: 2.98,
    //             sugars: 16.62,
    //             protein: 2.65,
    //             potassium: 393.89
    //         },
    //         servingSize: 331,
    //         measures: [
    //             {
    //                 unit: 'Onion(s)',
    //                 conversion: 331
    //             },
    //             {
    //                 unit: "Cups, Chopped or Sliced",
    //                 conversion: 180
    //             },
    //             {
    //                 unit: "grams",
    //                 conversion: 1
    //             }, 
    //             {
    //                 unit: "oz",
    //                 conversion: 28.3495
    //             }]
    //     },
    // }


    // API KEY
    var API_KEY = 'OvxhffEpFz6pKGUuHIfZW9MW8ZxJ2QcSmCtP1j1V';

    // BOILERPLATE

    // Begin space for javascript
    //console.log('calculator Time');





    // Folate mcgs




    /**
     * Calculate the entire recipe
     */
    async function calcRecipe() {


        const rows = $(".ingredientRow");
        console.log(rows);
        const configuredData = [];
        rows.map((index, row) => {
            console.log(row)
            let id = $(row).attr("data-id")
            console.log(id)
            let data =  {
                ingredient: ingredients[$(`#row-${id}-ingredient`).val()],
                amount: $(`#row-${id}-quantity`).val(),
                conversion: $(`#row-${id}-unit`).val()
            }
            configuredData.push(data)
        })
        console.log(configuredData);
        // allData


        const finalCalc = {
            calories: 0,
            total_fat: 0,
            saturated_fat: 0,
            cholesterol: 0,
            sodium: 0,
            total_carbohydrates: 0,
            dietary_fiber: 0,
            sugars: 0,
            protein: 0,
            potassium: 0,
            folic_acid: 0,
            fructose: 0,
            iron: 0, 
            magnesium: 0, 
            manganese: 0, 
            niacin: 0, 
            total_folate: 0, 
            vitamin_a: 0,
            vitamin_b_6: 0,
            vitamin_b_12: 0,
            vitamin_c: 0,
            vitamin_k: 0,
            vitamin_d: 0,
            zinc: 0,
        }


        configuredData.forEach(datapoint => {

            let totalAmount = datapoint.ingredient.servingSize * datapoint.amount / datapoint.conversion
            console.log(totalAmount, datapoint.ingredient)
            const { calories, cholesterol, dietary_fiber, folic_acid, fructose, iron, magnesium, manganese, niacin, potassium, protein, saturated_fat, sodium, sugars, total_carbohydrates, total_fat, total_folate, vitamin_a, vitamin_b_6, vitamin_b_12, vitamin_c, vitamin_d, vitamin_k, zinc} = datapoint.ingredient.nutrients
            finalCalc.calories += calories * totalAmount;
            finalCalc.total_fat += total_fat * totalAmount;
            finalCalc.saturated_fat += saturated_fat * totalAmount;
            finalCalc.cholesterol += cholesterol * totalAmount;
            finalCalc.sodium += sodium * totalAmount;
            finalCalc.total_carbohydrates += total_carbohydrates * totalAmount;
            finalCalc.dietary_fiber += dietary_fiber * totalAmount;
            finalCalc.sugars+= sugars * totalAmount;
            finalCalc.protein+= protein * totalAmount;
            finalCalc.potassium+= potassium * totalAmount;
            finalCalc.folic_acid += folic_acid * totalAmount;
            finalCalc.fructose += fructose * totalAmount;
            finalCalc.iron += iron * totalAmount;
            finalCalc.magnesium += magnesium * totalAmount;
            finalCalc.manganese += manganese *  totalAmount;
            finalCalc.niacin += niacin * totalAmount;
            finalCalc.total_folate += total_folate * totalAmount;
            finalCalc.vitamin_a += vitamin_a * totalAmount;
            finalCalc.vitamin_b_6 += vitamin_b_6 * totalAmount;
            finalCalc.vitamin_b_12 += vitamin_b_12* totalAmount;
            finalCalc.vitamin_c += vitamin_c* totalAmount;
            finalCalc.vitamin_d += vitamin_d* totalAmount;
            finalCalc.vitamin_k += vitamin_k* totalAmount;
            finalCalc.zinc += zinc * totalAmount;
        })


        finalCalc.calories_from_fat = finalCalc.total_fat * 9
        console.log(finalCalc)
        // for(var i =)

        // calculateErrors





        $("#nutrition-facts__calories").text(Number(finalCalc.calories).toFixed(0))
        $("#nutrition-facts__fat_calories").text(Number(finalCalc.total_fat * 9).toFixed(0))


        $("#nutrition-facts__total_fat").text(Number(finalCalc.total_fat).toFixed(1))
        $("#nutrition-facts__sat_fat").text(Number(finalCalc.saturated_fat).toFixed(1))
        $("#nutrition-facts__cholesterol").text(Number(finalCalc.cholesterol).toFixed(2))
        $("#nutrition-facts__sodium").text(Number(finalCalc.sodium).toFixed(0));
        $("#nutrition-facts__total_carb").text(Number(finalCalc.total_carbohydrates).toFixed(1));
        $("#nutrition-facts__fiber").text(Number(finalCalc.dietary_fiber).toFixed(0));
        $("#nutrition-facts__sugars").text(Number(finalCalc.sugars).toFixed(1));
        $("#nutrition-facts__proteins").text(Number(finalCalc.protein).toFixed(1));



        // $("#nutrition-facts__total_fat").text(finalCalc.potassium)
        
    }


    /**
     *  Checks errors against AZ Health zone guidlines
     */
    function calculateErrors() {
        //throw modal error per AZ health zone guidleines

        // highlight TWOs highest offendign ingredients
    }


    // function CalcIngredients() {
    //     const rows = document.querySelectorAll(".ingredientRow")
    //     const ingredients = [];
    //     for (var i = 0; i < rows.length; i++) {
    //         const row = rows[i];
    //         const ingredient = row.querySelector(".ingredient").value;
    //         const quantity = row.querySelector(".quantity").value;
    //         const unit = row.querySelector(".unit").value;
    //         const fancy = {
    //             ingredient: ingredient,
    //             quantity: quantity,
    //             unit: unit
    //         }
    //         ingredients.push(fancy)
    //     }

    //     // console.log(ingredients)
    //     return ingredients;
    // }

    function addRow() {
        count++;
        const ingredientTable = $("#ingredientTable");
        const newRow = $(`  <tr class="ingredientRow" id="row-${count}" data-id="${count}">
        <td>
          <input type="text" list="ingredients" name="ingredient_name" class="ingredient_name form-control" id="row-${count}-ingredient" data-id="${count}"/>
          <datalist id="ingredients">
            ${getIngredientKeys().sort().map((value, key) => {
            return `<option value="${value}">${value}</option>`
        })}
        </td>
        <td>
          <input type="number" step=.25 min=0 class="quantity form-control" id="row-${count}-quantity" data-id="${count}" disabled/>
        </td>
        <td>
          <select list="row-${count}-unit-choices" class="unit form-control" id="row-${count}-unit" data-id="${count}" disabled/>
        </td>
        <td>
        <button type="button" class="btn btn-default delete_row" data-id="${count}"><i class="btn-icon ua-brand-x">&nbsp;</i></button>
        </td>
      </tr>`);
        ingredientTable.append(newRow)

    }

    // async function getIngredientData(ingredient) {
    //     const res = await $.ajax({
    //         method: "GET",
    //         url: "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + API_KEY + "&query=" + ingredient + "&dataType=Foundation,SR Legacy"
    //     })

    //     const detail = await $.ajax({
    //         method: "GET",
    //         url: `https://api.nal.usda.gov/fdc/v1/food/${res.foods[0].fdcId}?api_key=${API_KEY}`
    //     })
    //     console.log(res)
    //     console.log(detail)
    //     // console.log(res)
    //     return res;
    // }



    async function processNutritionalData(recipe) {
        const response = await $.ajax({

        })
    }


    function clearAndDisableRow(id) {
        $(`#row-${id}-quantity`).val("").attr("disabled", true)
        $(`#row-${id}-unit`).val("").attr("disabled", true)
        $(`.row-${id}-unit-option`).remove()
    }

    function enableAndPopulateRow(id,ingredientName) {
        $(`#row-${id}-quantity`).val("").attr("disabled", false)
        $(`#row-${id}-unit`).val("").attr("disabled", false)
        $(`.row-${id}-unit-option`).remove()
        const ingredient = ingredients[ingredientName];
        ingredient.measures.forEach(measure => {
            $(`#row-${id}-unit`).append($(`<option class="row-${id}-unit-option" value="${measure.conversion}">${measure.unit}</option>`))
        })
    }



    function getIngredientKeys() {
        return Object.keys(ingredients);
    }

    function getIngredients() {
        return Object.entries(ingredients)
    }







    $(document).on("click", ".delete_row", function(event){
        event.preventDefault();
        const button = $(this)
        const rowId = button.attr("data-id");
        const row = $(`#row-${rowId}`);
        row.remove();
    })



    $(document).on("change", ".ingredient_name", function (event) {
        const row = $(this)
        const rowId = row.attr("data-id");
        const ingredientName = $(this).val()
        if (ingredientName === "") {
            clearAndDisableRow(rowId)
            let ingredientInput = document.getElementById(`row-${rowId}-ingredient`)
            ingredientInput.setCustomValidity("No Ingredient Inputted")
            alert(`Row ${rowId}: No Ingredient Selected`)
        }
        else if (ingredients[ingredientName] === null || ingredients[ingredientName] === undefined) {
            const found = fuzzy.get(ingredientName);
            if(found && found.length > 0){
                const newFind =  found[0][1];
                $(this).val(newFind)
                enableAndPopulateRow(rowId, newFind)
            }
            else{
                const hardFind = getIngredientKeys().find(element => element.includes(ingredientName))
                if(hardFind){
                    $(this).val(hardFind)
                    enableAndPopulateRow(rowId, hardFind)
                }
                else{
                    clearAndDisableRow(rowId)
                    alert(`Row ${rowId}: Invalid Ingredient Selected`)
                }

            }

        }
        else {
            enableAndPopulateRow(rowId, ingredientName)
            console.log(ingredientName)
        }

    });


    $("#getData").on("click", function (event) {
        event.preventDefault();
        getIngredientData($("#ingredientInput").val())
    })

    $("#calcRecipe").on("click", function (event) {
        calcRecipe();

    })


    $("#addRow").on("click", event => {
        addRow();
    })
   









    // End Space for javascript
    // BOILERPLATE
});
// BOILERPLATE