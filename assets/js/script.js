// BOILERPLATE
$(document).ready(function () {
    const WARNING_DV_THRESHOLD = 100;
    const ERROR_DV_THRESHOLD = 150;
    let fuzzy;
    let count = 0;
    const ingredients = {};

    const BASE_URL = "https://agile-shore-16925.herokuapp.com/"

    function loadIngredients(cb) {
        showLoader()
        $.ajax({
            method: "GET",
            url: BASE_URL + "api/ingredients"
        }).then(ingredientsData => {
            ingredientsData.forEach(ingredient => {
                ingredients[ingredient.fullname] = ingredient
            })
            console.log(ingredients)
            fuzzy = FuzzySet(getIngredientKeys(), true, 1, 2);

            cb();
        })
    }


    loadIngredients(initialLoad);


    // API KEY
    var API_KEY = 'OvxhffEpFz6pKGUuHIfZW9MW8ZxJ2QcSmCtP1j1V';

    // BOILERPLATE




    function showEnglish() {
        $("#ingredientHeaderText").text("Ingredient");
        $("#ingredientQuantityHeaderText").text("Qty.");
        $("#ingredientQuantityUnitText").text("Unit");
        $("#addRow").text("Add Ingredient to Recipe");
        $("#calcRecipe").text("Calculate Recipe");

        $("#toolsPanelHeadingText").text("Tools");
        $("#recipePanelHeading").text("Recipe");
        $("#languagePanelHeading").text("Language");

        $(".nutrition-facts__title").text("Nutrition Facts");
        $("#nutrition-facts__serving_size_text").text("Serving Size");
        $("#nutrition-facts__serving_per_text").text("Servings Per Recipe");
        $("#nutrition-facts__amount_per_text").text("Amount Per Serving");
        $("#nutrition-facts__calories_text").text("Calories");
        $("#nutrition-facts__fat_calories_text").text("Calories from Fat");


        $("#nutrition-facts__daily_value_text").text("% Daily Value*");
        $("#nutrition-facts__total_fat_text").text("Total Fat");
        $("#nutrition-facts__sat_fat_text").text("Saturated Fat");
        $("#nutrition-facts__trans_fat_text").text("Trans Fat");
        $("#nutrition-facts__cholesterol_text").text("Cholesterol");
        $("#nutrition-facts__sodium_text").text("Sodium");

        $("#nutrition-facts__total_carb_text").text("Total Carbohydrate");
        $("#nutrition-facts__sugars_text").text("Sugars");
        $("#nutrition-facts__fiber_text").text("Dietary Fiber");
        $("#nutrition-facts__proteins_text").text("Proteins");



        $("#nutrition-facts___vitamin_A_text").text("Vitamin A");
        $("#nutrition-facts___vitamin_B_6_text").text("Vitamin B 6");
        $("#nutrition-facts___vitamin_B_12_text").text("Vitamin B 6");
        $("#nutrition-facts___vitamin_C_text").text("Vitamin C");
        $("#nutrition-facts___vitamin_D_text").text("Vitamin D");
        $("#nutrition-facts___vitamin_K_text").text("Vitamin K");


        $("#nutrition-facts___folic_acid_text").text("Folic Acid");
        $("#nutrition-facts___iron_text").text("Iron");
        $("#nutrition-facts___magnesium_text").text("Magnesium");
        $("#nutrition-facts___manganese_text").text("Manganese");
        $("#nutrition-facts___niacin_text").text("Niacin");
        $("#nutrition-facts___potassium_text").text("Potassium");
        $("#nutrition-facts___total_folate_text").text("Total Folate");
        $("#nutrition-facts___zinc_text").text("Zinc");


        $("#dv-disclaimer").text(`* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be
        higher or lower depending on your calorie needs:`);
        $("#recipePanelHeading").text("Recipe");
        $("#languagePanelHeading").text("Language");

    }


    function showSpanish() {
        $("#ingredientHeaderText").text("Ingrediente");
        $("#ingredientQuantityHeaderText").text("Cifra");
        $("#ingredientQuantityUnitText").text("Unidad");
        $("#addRow").text("Agregar Ingrediente a la Receta");
        $("#calcRecipe").text("Calcular Receta");
    }
    
    $("#english").on("click", function (event) {
        showEnglish();
    })

    $("#spanish").on("click", function (event) {
        showSpanish();
    })
    showEnglish();
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
            if (data.ingredient !== "" && data.ingredient !== undefined && data.ingredient !== null &&
                data.amount !== "" && data.amount !== undefined && data.amount !== null &&
                data.conversion !== "" && data.conversion !== undefined && data.conversion !== null) {
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
                niacin: 16,
                potassium: 4700,
                total_folate: 400,
                vitamin_a: 900,
                vitamin_b_6: 2.4,
                vitamin_b_12: 1.7,
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

        if (totalcaloriesDV > WARNING_DV_THRESHOLD) {
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
                    $(`#row-${problem.id}`).after(generateNutrientWarningMessage(problem.name, "total fat", totalFatDV, ERROR_DV_THRESHOLD))
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
                    $(`#row-${problem.id}`).after(generateNutrientWarningMessage(problem.name, "saturated fat", satFatDV, ERROR_DV_THRESHOLD))
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
                    $(`#row-${problem.id}`).after(generateNutrientWarningMessage(problem.name, "cholesterol", cholDV, ERROR_DV_THRESHOLD))
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
                    $(`#row-${problem.id}`).after(generateNutrientWarningMessage(problem.name, "sodium", sodiumDV, ERROR_DV_THRESHOLD))
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
                    $(`#row-${problem.id}`).after(generateNutrientWarningMessage(problem.name, "carbohydrates", totalCarbDV, ERROR_DV_THRESHOLD))
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
                  $(`#row-${problem.id}`).after(generateNutrientWarningMessage(problem.name, "fiber", dietaryFiberDV,ERROR_DV_THRESHOLD))
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

    function generateNutrientWarningMessage(problem, valueName, value, valueThreshold){
        return $(`<tr class='error'><td colspan="3" class="alert alert-dismissible alert-${value > valueThreshold ? 'warning' : 'danger'}">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="ua-brand-x"></i></span></button>
                    <h4><span class="text-capitalize">${problem}</span> is/are ${value > valueThreshold ? 'very' : 'extremely'} high in ${valueName}, part of a healthy diet is monitoring our ${valueName}! Consider a different ingredient or amount of <span class="text-capitalize">${problem}</span>.</h4>

                  </td></tr>`)
    }

    function showLoader() {
        $(".loader").css("display", "block")
    }

    function hideLoader() {
        $(".loader").css("display", "none");
    }

    function addRow() {
        count++;
        const ingredientTable = $("#ingredientTable");
        const newRow = $(`  <tr class="ingredientRow" id="row-${count}" data-id="${count}">
        <td>
          <input type="text" list="ingredients-list" name="ingredient_name" class="ingredient_name form-control" id="row-${count}-ingredient" data-id="${count}"/>
          <datalist class="ingredients-list">
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

    function initialLoad() {
        addRow();
        hideLoader()
    }



    function getIngredientKeys() {
        return Object.keys(ingredients);
    }

    function getIngredients() {
        return Object.entries(ingredients)
    }


    function generateIngredientLists() {
        $("#ingredients-list").empty();
        getIngredientKeys().sort().map((value, key) => {
            $('#ingredients-list').append($(`<option value="${value}">${value}</option>`));
        })
    }




    $(document).on("click", ".delete_row", function (event) {
        event.preventDefault();
        const button = $(this)
        const rowId = button.attr("data-id");
        const row = $(`#row-${rowId}`);
        row.remove();
    })



    $(document).on("change", ".ingredient_name", function (event) {
        showLoader();
        const row = $(this)
        const rowId = row.attr("data-id");
        const ingredientName = $(this).val()
        if (ingredientName === "") {
            clearAndDisableRow(rowId)
            let ingredientInput = document.getElementById(`row-${rowId}-ingredient`)
            alert(`Row ${rowId}: No Ingredient Inputted, Please Enter an Ingredient`)
            hideLoader()
        }
        else if (getIngredientKeys().find(element => element.toLowerCase() === ingredientName.toLowerCase())) {
            enableAndPopulateRow(rowId, ingredientName)
            hideLoader()
        }
        else if (ingredients[ingredientName] === null || ingredients[ingredientName] === undefined) {
            let useFuzzy = false;
            let useHard = false;
            const found = fuzzy.get(ingredientName.toLowerCase());
            if (found && found.length > 0) {
                const newFind = found[0][1];
                useFuzzy = confirm(`Did you mean '${newFind}'?`)
                if (useFuzzy) {
                    $(this).val(newFind)
                    enableAndPopulateRow(rowId, newFind)
                    hideLoader()
                }
            }
            let hardFind = getIngredientKeys().find(element => element.includes(ingredientName.toLowerCase()))
            if (hardFind !== undefined && !useFuzzy) {
                useHard = confirm(`Did you mean '${hardFind}'?`)
                if (useHard) {
                    $(this).val(hardFind)
                    enableAndPopulateRow(rowId, hardFind)
                    hideLoader()
                }
            }
            if (!useFuzzy && !useHard) {
                $.ajax({
                    method: "POST",
                    url: BASE_URL + "api/generateFood",
                    data: {
                        query: `1 ${ingredientName}`
                    },
                    timeout: 5000
                }).then((foods) => {
                    if (foods[0] && foods[0].fullname) {
                        const useGenerated = confirm(`Did you mean '${foods[0].fullname}'?`)
                        loadIngredients(generateIngredientLists)
                        let id = rowId
                        let foundFood = foods[0].fullname;
                        if (useGenerated) {
                            setTimeout(function () {
                                row.val(foundFood)
                                enableAndPopulateRow(id, foundFood)
                                hideLoader()
                            }, 2000);
                        }
                    }
                    else {
                        clearAndDisableRow(rowId)
                        alert(`Row ${rowId}: Sorry, we couldn't find nutritional information for '${ingredientName}'`)
                        hideLoader()
                    }
                    console.log(foods)

                }).fail(err => {
                    clearAndDisableRow(rowId)
                    alert(`Row ${rowId}: Sorry, we couldn't find nutritional information for '${ingredientName}'`)
                })
            }
        }
        else {
            alert(`Row ${rowId}: An Unspecified Error Occurred! Sorry!`)
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