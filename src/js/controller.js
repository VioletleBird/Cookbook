import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

const controlRecipe = async function() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    //update resultsView to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    recipeView.renderSpinner();
    //loading recipe
    await model.loadRecipe(id);
    //rendering recipe
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
    resultsView.render(model.getSearchResultsPage());
    //render pagination
    paginationView.render(model.state.search);
  }
  catch (err) {
    console.log(err);
  }
};

const controlPagination = function(goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update recipe servings
  model.updateServings(newServings);

  //update the recipe view
  recipeView.update(model.state.recipe);
};

const init = function() {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
