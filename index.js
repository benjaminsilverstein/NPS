const apiKey = 'TmB6R9IMHf0SmvOJv2OSQQaMdd6X4oTodo2ZMWVV'
const searchURL = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}
function getParks(query, maxResults=50) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResults,}

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

function displayResults(responseJson) {
    $('.results').empty;
    let renderResults = function (object) {
    $('.results').append(`<div class="park"><h3>${object.fullName}</h3><p>${object.description}<p class="link"><a href="${object.url}">Visit the site</a></p></div>`)
        }
        responseJson.data.forEach(renderResults);
        $('.results').removeClass('hide')
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchState = $('#js-search-state').val().split(/[ ,]+/).join(',');
      const maxResults = $('#js-max-results').val();
      console.log(searchState)
      $('.results').empty();
      getParks(searchState, maxResults);
    });
  }
  
  $(watchForm);