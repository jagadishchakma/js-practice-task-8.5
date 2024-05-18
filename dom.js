
let searchElement = document.querySelector('.search-box');

searchElement.addEventListener('keyup', function(e){
    if(e.keyCode === 13){
        loaddbMeals(e.target.value);
    }
});

function loaddbMeals(value){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch(err => displayMeals([]))
}


function displayMeals(data){
    console.log(data);
    let container = document.querySelector('.product-display');
    container.innerHTML = '';
    if(data.length > 0){
        data.forEach((meal) => {
            
            let div = document.createElement('div');
            div.classList.add("meals");
            div.innerHTML = `
                <img src=${meal.strMealThumb} width="100%"/>
                <h2>${meal.strMeal}</h2>
            `;
            div.setAttribute("onclick",`detailsMeals(${meal.idMeal})`)
            container.appendChild(div);
        })
    }else{
        container.innerHTML = `
            <h2 class="alert alert-warning">OOPs! Sorry Meals Not Found. Search another name..</h2>
        `;
    }
}

function detailsMeals(id){
    let container = document.querySelector(".product-box");
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res=>res.json())
        .then(data => {
            let meal = data.meals[0]
            console.log(meal);
            container.innerHTML = `
                <div class="product-details">
                    <img src=${meal.strMealThumb} width="90%"/>
                    <h2>${meal.strMeal}</h2>
                    <ul>
                        <li>Ingredient1: ${meal.strIngredient1}</li>
                        <li>Ingredient2: ${meal.strIngredient2}</li>
                        <li>Ingredient3: ${meal.strIngredient3}</li>
                        <li>Ingredient4: ${meal.strIngredient4}</li>
                        <li>Ingredient6: ${meal.strIngredient6}</li>
                        <li>Ingredient7: ${meal.strIngredient7}</li>
                    </ul>
                </di>
            `;
        })
}