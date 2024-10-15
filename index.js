let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
  let { title, link, description } = result;
  //1. div Element -- result-item
  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");
  searchResultsEl.appendChild(resultItemEl);

  //2. title Element -- result-title
  let resultTitleEl = document.createElement("a");
  resultTitleEl.classList.add("result-title");
  resultTitleEl.textContent = title;
  resultTitleEl.href = link;
  resultTitleEl.target = "_blank";

  resultItemEl.appendChild(resultTitleEl);
  //3. title break
  let lineBreakEl1 = document.createElement("br");
  resultItemEl.appendChild(lineBreakEl1);
  //4. Url Element -- result-url
  let urlEl = document.createElement("a");
  urlEl.classList.add("result-url");
  urlEl.textContent = link;
  urlEl.href = link;
  urlEl.target = "_blank";
  resultItemEl.appendChild(urlEl);

  //5. url break
  let lineBreakEl2 = document.createElement("br");
  resultItemEl.appendChild(lineBreakEl2);

  //6. paragraph Element -- line-Description
  let descriptionEl = document.createElement("p");
  descriptionEl.classList.add("link-description");
  descriptionEl.textContent = description;

  resultItemEl.appendChild(descriptionEl);
}

function displayResults(searchResults) {
  spinnerEl.classList.toggle("d-none");
  for (let result of searchResults) {
    createAndAppendSearchResult(result);
    console.log(result);
  }
}

function searchWikipedia(event) {
  if (event.key === "Enter") {
    spinnerEl.classList.toggle("d-none");
    searchResultsEl.textContent = "";
    let searchInput = searchInputEl.value;
    let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

    let options = {
      method: "GET",
    };
    fetch(url, options)
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        let { search_results } = data;
        displayResults(search_results);
      });
  }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
