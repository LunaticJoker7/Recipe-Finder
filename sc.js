const apiKey = 'YOUR_SPOONACULAR_API_KEY';

async function findRecipes() {
    const ingredients = document.getElementById('ingredients').value;
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${apiKey}`);
    const data = await response.json();
    displayRecipes(data);
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>${recipe.usedIngredientCount} used ingredients, ${recipe.missedIngredientCount} missed ingredients</p>
            <button onclick="getRecipeDetails(${recipe.id})">View Recipe</button>
        `;
        recipesContainer.appendChild(recipeDiv);
    });
}

async function getRecipeDetails(id) {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
    const recipe = await response.json();
    alert(`Title: ${recipe.title}\n\nInstructions: ${recipe.instructions}`);
}
