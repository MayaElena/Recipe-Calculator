// BOILERPLATE
$(document).ready(function () {
    const WARNING_DV_THRESHOLD = 100;
    const ERROR_DV_THRESHOLD = 150;
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

    /**
     * Calculate the entire recipe
     */
    async function calcRecipe() {
        const rows = $(".ingredientRow");
        //console.log(rows);
        const configuredData = [];
        rows.map((index, row) => {
            //console.log(row)
            let id = $(row).attr("data-id")
            //console.log(id)
            let data = {
                ingredient: ingredients[$(`#row-${id}-ingredient`).val()],
                amount: $(`#row-${id}-quantity`).val(),
                conversion: $(`#row-${id}-unit`).val(),
                id: id
            }
            if(data.ingredient !== "" && data.ingredient !== undefined && data.ingredient !== null &&
            data.amount !== "" && data.amount !== undefined && data.amount !== null &&
            data.conversion !== "" && data.conversion !== undefined && data.conversion !== null){
                configuredData.push(data)
            }

        })
        //console.log(configuredData);
        // allData
        const servings = parseInt($("#nutrition-facts__serving_per").val());

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
            total_weight: 0
        }


        configuredData.forEach(datapoint => {

            let conversionFactor = datapoint.amount * (datapoint.conversion / datapoint.ingredient.servingSize)
            if (datapoint.conversion == 100) {
                conversionFactor = conversionFactor / 100;
            }
            //console.log(conversionFactor, datapoint)
            const { calories, cholesterol, dietary_fiber, folic_acid, fructose, iron, magnesium, manganese, niacin, potassium, protein, saturated_fat, sodium, sugars, total_carbohydrates, total_fat, total_folate, vitamin_a, vitamin_b_6, vitamin_b_12, vitamin_c, vitamin_d, vitamin_k, zinc } = datapoint.ingredient.nutrients
            finalCalc.calories += calories * conversionFactor;
            finalCalc.total_fat += total_fat * conversionFactor;
            finalCalc.saturated_fat += saturated_fat * conversionFactor;
            finalCalc.cholesterol += cholesterol * conversionFactor;
            finalCalc.sodium += sodium * conversionFactor;
            finalCalc.total_carbohydrates += total_carbohydrates * conversionFactor;
            finalCalc.dietary_fiber += dietary_fiber * conversionFactor;
            finalCalc.sugars += sugars * conversionFactor;
            finalCalc.protein += protein * conversionFactor;
            finalCalc.potassium += potassium * conversionFactor;
            finalCalc.folic_acid += folic_acid * conversionFactor;
            finalCalc.fructose += fructose * conversionFactor;
            finalCalc.iron += iron * conversionFactor;
            finalCalc.magnesium += magnesium * conversionFactor;
            finalCalc.manganese += manganese * conversionFactor;
            finalCalc.niacin += niacin * conversionFactor;
            finalCalc.total_folate += total_folate * conversionFactor;
            finalCalc.vitamin_a += vitamin_a * conversionFactor;
            finalCalc.vitamin_b_6 += vitamin_b_6 * conversionFactor;
            finalCalc.vitamin_b_12 += vitamin_b_12 * conversionFactor;
            finalCalc.vitamin_c += vitamin_c * conversionFactor;
            finalCalc.vitamin_d += vitamin_d * conversionFactor;
            finalCalc.vitamin_k += vitamin_k * conversionFactor;
            finalCalc.zinc += zinc * conversionFactor;

            finalCalc.total_weight += (datapoint.ingredient.servingSize * conversionFactor)
        })


        finalCalc.calories_from_fat = finalCalc.total_fat * 9
        //console.log(finalCalc)
        // for(var i =)

        // calculateErrors

        for (const key in finalCalc) {
            finalCalc[key] = finalCalc[key] / servings
        }


        $("#nutrition-facts__calories").text(Number(finalCalc.calories).toFixed(0))
        $("#nutrition-facts__serving_size").text(Number(finalCalc.total_weight).toFixed(0))
        $("#nutrition-facts__fat_calories").text(Number(finalCalc.total_fat * 9).toFixed(0))


        $("#nutrition-facts__total_fat").text(Number(finalCalc.total_fat).toFixed(1))
        $("#nutrition-facts__sat_fat").text(Number(finalCalc.saturated_fat).toFixed(1))
        $("#nutrition-facts__cholesterol").text(Number(finalCalc.cholesterol).toFixed(2))
        $("#nutrition-facts__sodium").text(Number(finalCalc.sodium).toFixed(0));
        $("#nutrition-facts__total_carb").text(Number(finalCalc.total_carbohydrates).toFixed(1));
        $("#nutrition-facts__fiber").text(Number(finalCalc.dietary_fiber).toFixed(0));
        $("#nutrition-facts__sugars").text(Number(finalCalc.sugars).toFixed(1));
        $("#nutrition-facts__proteins").text(Number(finalCalc.protein).toFixed(1));

        let is2000 = true;
        let DVs;
        if (is2000) {
            DVs = {
                total_calories: 2000,
                total_fat: 65,
                saturated_fat: 20,
                cholesterol: 300,
                sodium: 2400,
                total_carbohydrates: 300,
                dietary_fiber: 25,
                folic_acid: 400,
                iron: 18,
                magnesium: 420,
                manganese: 2.3,
                niacin : 16,
                potassium: 4700, 
                total_folate: 400,
                vitamin_a: 900,
                vitamin_b_6: 2.4,
                vitamin_b_12 : 1.7,
                vitamin_c: 90,
                vitamin_d: 20,
                vitamin_e: 15,
                vitamin_k: 120,
                zinc: 11,

            }
        }


        let totalcaloriesDV = Number(finalCalc.calories) / DVs.total_calories * 100;
        let totalFatDV = Number(finalCalc.total_fat) / DVs.total_fat * 100;
        let satFatDV = Number(finalCalc.saturated_fat) / DVs.saturated_fat * 100;
        let cholDV = Number(finalCalc.cholesterol) / DVs.cholesterol * 100;
        let sodiumDV = Number(finalCalc.sodium) / DVs.sodium * 100;
        let totalCarbDV = Number(finalCalc.total_carbohydrates) / DVs.total_carbohydrates * 100;
        let dietaryFiberDV = Number(finalCalc.dietary_fiber) / DVs.dietary_fiber * 100;

        //console.log(totalFatDV)

        $(".dv_warning").empty();

        if (totalcaloriesDV > WARNING_DV_THRESHOLD ) {
            $("#nutrition-facts__fat_calories").append($(`<span class='dv_warning'>Total Calories are over the recommended daily value!</span>`))
        }


        $("#nutrition-facts__total_fat_percent").text(totalFatDV.toFixed(0))
        if (totalFatDV > WARNING_DV_THRESHOLD) {
            $("#nutrition-facts__total_fat_percent").append($(`<span class='dv_warning'>Total Fat is over the recommended daily value!</span>`))
        }
        $("#nutrition-facts__sat_fat_percent").text(satFatDV.toFixed(0))
        if (satFatDV > WARNING_DV_THRESHOLD) {
            $("#nutrition-facts__sat_fat_percent").prepend($(`<span class='dv_warning'>Saturated Fat is over the recommended daily value!</span>`))
        }
        $("#nutrition-facts__cholesterol_percent").text(cholDV.toFixed(0))
        if (cholDV > WARNING_DV_THRESHOLD) {
            $("#nutrition-facts__cholesterol_percent").append($(`<span class='dv_warning'>Cholesterol is over the recommended daily value!</span>`))
        }
        $("#nutrition-facts__sodium_percent").text(sodiumDV.toFixed(0))
        if (sodiumDV > WARNING_DV_THRESHOLD) {
            $("#nutrition-facts__sodium_percent").append($(`<span class='dv_warning'>Sodium is over the recommended daily value!</span>`))
        }
        $("#nutrition-facts__total_carb_percent").text(totalCarbDV.toFixed(0))
        if (totalCarbDV > WARNING_DV_THRESHOLD) {
            $("#nutrition-facts__total_carb_percent").append($(`<span class='dv_warning'>Total Carbs are over the recommended daily value!</span>`))
        }
        $("#nutrition-facts__fiber_percent").text(dietaryFiberDV.toFixed(0))
        if (dietaryFiberDV > WARNING_DV_THRESHOLD) {
            $("#nutrition-facts__fiber_percent").append($(`<span class='dv_warning'>Fiber is over the recommended daily value!</span>`))
        }
        $(".error").empty();

        if (totalFatDV > WARNING_DV_THRESHOLD) {
            let problems = configuredData.map(datapoint => {
                let conversionFactor = datapoint.amount * (datapoint.conversion / datapoint.ingredient.servingSize)
                if (datapoint.conversion == 100) {
                    conversionFactor = conversionFactor / 100;
                }
                return {
                    fat: datapoint.ingredient.nutrients.total_fat * conversionFactor,
                    name: datapoint.ingredient.fullname,
                    id: datapoint.id
                }
            }).sort((a, b) => b.fat - a.fat)
            //console.log(problems)
            let erroredProblems = []
            problems.forEach((problem, index) => {
                if (index < 2 && erroredProblems.indexOf(problem.fullname) == -1) {
                    $(`#row-${problem.id}`).after($(`<row class='error'><div class="alert alert-dismissible alert-${totalFatDV > ERROR_DV_THRESHOLD ? 'warning' : 'danger'}">                   
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="ua-brand-x"></i></span></button>
                    <h4>${problem.name} is ${totalFatDV > ERROR_DV_THRESHOLD ? 'very' : 'extremely'} high in fat, part of a healthy diet is monitoring our fat! Consider a different ingredient or amount of ${problem.name}.</h4>
 
                  </div></row>`))
                }
                erroredProblems.push(problem.fullname)
            })

        }

        if (satFatDV > WARNING_DV_THRESHOLD) {
            let problems = configuredData.map(datapoint => {
                let conversionFactor = datapoint.amount * (datapoint.conversion / datapoint.ingredient.servingSize)
                if (datapoint.conversion == 100) {
                    conversionFactor = conversionFactor / 100;
                }
                return {
                    satfat: datapoint.ingredient.nutrients.saturated_fat * conversionFactor,
                    name: datapoint.ingredient.fullname,
                    id: datapoint.id
                }
            }).sort((a, b) => b.satfat - a.satfat)
            //console.log(problems)
            let erroredProblems = []
            problems.forEach((problem, index) => {
                if (index < 2 && erroredProblems.indexOf(problem.fullname) == -1) {
                    $(`#row-${problem.id}`).after($(`<row class='error'><div class="alert alert-dismissible alert-${satFatDV > ERROR_DV_THRESHOLD ? 'warning' : 'danger'}">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="ua-brand-x"></i></span></button>
                    <h4>${problem.name} is/are ${satFatDV > ERROR_DV_THRESHOLD ? 'very' : 'extremely'} high in saturated fat, part of a healthy diet is monitoring our saturated fat!  Consider a different ingredient or amount of ${problem.name}.</h4>
   
                  </div></row>`))
                }
                erroredProblems.push(problem.fullname)
            })

        }

        if (cholDV > WARNING_DV_THRESHOLD) {
            let problems = configuredData.map(datapoint => {
                let conversionFactor = datapoint.amount * (datapoint.conversion / datapoint.ingredient.servingSize)
                if (datapoint.conversion == 100) {
                    conversionFactor = conversionFactor / 100;
                }
                return {
                    chol: datapoint.ingredient.nutrients.cholesterol * conversionFactor,
                    name: datapoint.ingredient.fullname,
                    id: datapoint.id
                }
            }).sort((a, b) => b.chol - a.chol)
            //console.log(problems)
            let erroredProblems = []
            problems.forEach((problem, index) => {
                if (index < 2 && erroredProblems.indexOf(problem.fullname) == -1) {
                    $(`#row-${problem.id}`).after($(`<row class='error'><div class="alert alert-dismissible alert-${cholDV > ERROR_DV_THRESHOLD ? 'warning' : 'danger'}">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="ua-brand-x"></i></span></button>
                    <h4>${problem.name} is/are ${cholDV > ERROR_DV_THRESHOLD ? 'very' : 'extremely'} high in cholesterol, part of a healthy diet is monitoring our cholesterol! Consider a different ingredient or amount of ${problem.name}.</h4>

                  </div></row>`))
                }
                erroredProblems.push(problem.fullname)
            })

        }

        if (sodiumDV > WARNING_DV_THRESHOLD) {
            let problems = configuredData.map(datapoint => {
                let conversionFactor = datapoint.amount * (datapoint.conversion / datapoint.ingredient.servingSize)
                if (datapoint.conversion == 100) {
                    conversionFactor = conversionFactor / 100;
                }
                return {
                    sodium: datapoint.ingredient.nutrients.sodium * conversionFactor,
                    name: datapoint.ingredient.fullname,
                    id: datapoint.id
                }
            }).sort((a, b) => b.sodium - a.sodium)
            //console.log(problems)
            let erroredProblems = []
            problems.forEach((problem, index) => {
                if (index < 2 && erroredProblems.indexOf(problem.fullname) == -1) {
                    $(`#row-${problem.id}`).after($(`<row class='error'><div class="alert alert-dismissible alert-${sodiumDV > ERROR_DV_THRESHOLD ? 'warning' : 'danger'}">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="ua-brand-x"></i></span></button>
                    <h4>${problem.name} is/are ${sodiumDV > ERROR_DV_THRESHOLD ? 'very' : 'extremely'} high in sodium, part of a healthy diet is monitoring our sodium! Consider a different ingredient or amount of ${problem.name}.</h4>

                  </div></row>`))
                }
                erroredProblems.push(problem.fullname)
            })

        }

        if (totalCarbDV > WARNING_DV_THRESHOLD) {
            let problems = configuredData.map(datapoint => {
                let conversionFactor = datapoint.amount * (datapoint.conversion / datapoint.ingredient.servingSize)
                if (datapoint.conversion == 100) {
                    conversionFactor = conversionFactor / 100;
                }
                return {
                    carbs: datapoint.ingredient.nutrients.total_carbohydrates * conversionFactor,
                    name: datapoint.ingredient.fullname,
                    id: datapoint.id
                }
            }).sort((a, b) => b.carbs - a.carbs)
            //console.log(problems)
            let erroredProblems = []
            problems.forEach((problem, index) => {
                if (index < 2 && erroredProblems.indexOf(problem.fullname) == -1) {
                    $(`#row-${problem.id}`).after($(`<row class='error'><div class="alert alert-dismissible alert-${totalCarbDV > ERROR_DV_THRESHOLD ? 'warning' : 'danger'}">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="ua-brand-x"></i></span></button>
                    <h4>${problem.name} is/are ${totalCarbDV > ERROR_DV_THRESHOLD ? 'very' : 'extremely'} high in carbohydrates, part of a healthy diet is monitoring our carbohydrates! Consider a different ingredient or amount of ${problem.name}.</h4>

                  </div></row>`))
                }
                erroredProblems.push(problem.fullname)
            })

        }

        if (dietaryFiberDV > WARNING_DV_THRESHOLD) {
            let problems = configuredData.map(datapoint => {
                let conversionFactor = datapoint.amount * (datapoint.conversion / datapoint.ingredient.servingSize)
                if (datapoint.conversion == 100) {
                    conversionFactor = conversionFactor / 100;
                }
                return {
                    fiber: datapoint.ingredient.nutrients.dietary_fiber * conversionFactor,
                    name: datapoint.ingredient.fullname,
                    id: datapoint.id
                }
            }).sort((a, b) => b.fiber - a.fiber)
            //console.log(problems)
            let erroredProblems = []
            problems.forEach((problem, index) => {
                if (index < 2 && erroredProblems.indexOf(problem.fullname) == -1) {
                    $(`#row-${problem.id}`).after($(`<row class='error'><div class="alert alert-dismissible alert-${dietaryFiberDV > ERROR_DV_THRESHOLD ? 'warning' : 'danger'}">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="ua-brand-x"></i></span></button>
                    <h4>${problem.name} is/are ${dietaryFiberDV > ERROR_DV_THRESHOLD ? 'very' : 'extremely'} high in fiber, part of a healthy diet is monitoring our fiber! Consider a different ingredient or amount of ${problem.name}.</h4>

                  </div></row>`))
                }
                erroredProblems.push(problem.fullname)
            })

        }




        let vitaminADV = Number(finalCalc.vitamin_a) / DVs.vitamin_a * 100;
        let vitamin_b_6DV = Number(finalCalc.vitamin_b_6) / DVs.vitamin_b_6 * 100;
        let vitamin_b_12DV = Number(finalCalc.vitamin_b_12) / DVs.vitamin_b_12 * 100;
        let vitamin_cDV = Number(finalCalc.vitamin_c) / DVs.vitamin_c * 100;
        let vitamin_dDV = Number(finalCalc.vitamin_d) / DVs.vitamin_d * 100;
        let vitamin_kDV = Number(finalCalc.vitamin_k) / DVs.vitamin_k * 100;
        $("#nutrition-facts___vitamin_A").text(vitaminADV.toFixed(0))
        $("#nutrition-facts___vitamin_B_6").text(vitamin_b_6DV.toFixed(0))
        $("#nutrition-facts___vitamin_B_12").text(vitamin_b_12DV.toFixed(0))
        $("#nutrition-facts___vitamin_C").text(vitamin_cDV.toFixed(0))
        $("#nutrition-facts___vitamin_D").text(vitamin_dDV.toFixed(0))
        $("#nutrition-facts___vitamin_K").text(vitamin_kDV.toFixed(0))


        let folic_acidADV = Number(finalCalc.folic_acid) / DVs.folic_acid * 100;
        let ironDV = Number(finalCalc.iron) / DVs.iron * 100;
        let magnesiumDV = Number(finalCalc.magnesium) / DVs.magnesium * 100;
        let manganeseDV = Number(finalCalc.manganese) / DVs.manganese * 100;
        let niacinDV = Number(finalCalc.niacin) / DVs.niacin * 100;
        let potassiumDV = Number(finalCalc.potassium) / DVs.potassium * 100;
        let total_folateDV = Number(finalCalc.total_folate) / DVs.total_folate * 100;
        let zincDV = Number(finalCalc.zinc) / DVs.zinc * 100;
        $("#nutrition-facts___folic_acid").text(folic_acidADV.toFixed(0))
        $("#nutrition-facts___iron").text(ironDV.toFixed(0))
        $("#nutrition-facts___magnesium").text(magnesiumDV.toFixed(0))
        $("#nutrition-facts___manganese").text(manganeseDV.toFixed(0))
        $("#nutrition-facts___niacin").text(niacinDV.toFixed(0))
        $("#nutrition-facts___potassium").text(potassiumDV.toFixed(0))
        $("#nutrition-facts___total_folate").text(total_folateDV.toFixed(0))
        $("#nutrition-facts___zinc").text(zincDV.toFixed(0))

    }


    /**
     *  Checks errors against AZ Health zone guidlines
     */
    function calculateErrors() {
        //throw modal error per AZ health zone guidleines

        // highlight TWOs highest offendign ingredients
    }


    function generateDVPercent(is2000 = true, finalCalc) {


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

    function enableAndPopulateRow(id, ingredientName) {
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







    $(document).on("click", ".delete_row", function (event) {
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
            if (found && found.length > 0) {
                const newFind = found[0][1];
                $(this).val(newFind)
                enableAndPopulateRow(rowId, newFind)
            }
            else {
                const hardFind = getIngredientKeys().find(element => element.includes(ingredientName))
                if (hardFind) {
                    $(this).val(hardFind)
                    enableAndPopulateRow(rowId, hardFind)
                }
                else {
                    clearAndDisableRow(rowId)
                    alert(`Row ${rowId}: Invalid Ingredient Selected`)
                }

            }

        }
        else {
            enableAndPopulateRow(rowId, ingredientName)
            //console.log(ingredientName)
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