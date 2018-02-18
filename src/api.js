

const baseUrl = 'http://api.yummly.com/v1/api/';

const appId = '9150e041';
const appKey = '1f2e969ec0645a8e7d83dec872d18971';

const option = {
    method: 'GET',
    headers: new Headers({
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=31536000',
        'X-Yummly-App-ID':  appId,
        'X-Yummly-App-Key': appKey
    })
}

export function getRecipes(query) {
    const url = `${baseUrl}recipes?q=${encodeURI(query)}&maxResult=50`

    return fetch(url, option).then(response => response.json());
}

export function getRecipe(id) {
    const url = `${baseUrl}recipe/${encodeURI(id)}`;

    return fetch(url, option).then(response => response.json());
}

export function getRecipeWithControlledIngredients(allowed = true, ...ingredients) {
    let url = `${baseUrl}recipes?`;
    let ingredientCriteria = allowed ? '&allowedIngredient[]' : '&excludedIngredient[]';
    
    if (ingredients.length > 0) {
        ingredients.reduce((accumulator, ingredient) => {
            url += `${ingredientCriteria}=${ingredient}`;

            return url;
        }, url)
    }

    return fetch(url, option).then(response => response.json());
}