
let searchResults = [];

function setSearchResults(results, paramText) {
    if (paramText === "") {
        searchResults = [];
    } else {
        searchResults = results;
    }
}

function getSearchResults() {
    return searchResults;
}

module.exports = {
    setSearchResults,
    getSearchResults
};
