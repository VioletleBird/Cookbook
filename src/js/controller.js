import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

//from parcel
if(module.hot) {
  module.hot.accept();
};

const controlRecipe = async function() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    await model.loadRecipe(id);
    
    recipeView.render(model.state.recipe);
  }
  catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();
    //get query
    const query = searchView.getQuery();
    if(!query) return;
    //load search
    await model.loadSearchResults(query);
    //render results
    resultsView.render(model.state.search.results);
  }
  catch (err) {
    
  }
};

const init = function() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
