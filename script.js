let userInputEl = document.getElementById("searchInput");
let resultsEl = document.getElementById("searchResults");
let headingEl = document.getElementById("heading");
let spinnerEl = document.getElementById("spinner");


function updateResultsInUI(book) {
    spinnerEl.classList.add("d-none");
    
    let booksContainerEl = document.createElement("div");
    booksContainerEl.classList.add("d-flex", "flex-row", "justify-content-center", "align-items-center", "p-2", "col-6", "col-sm-4", "col-md-3", "col-lg-2");
    resultsEl.appendChild(booksContainerEl);


    let bookDetailsEl = document.createElement("div");
    booksContainerEl.appendChild(bookDetailsEl);

    let bookImgEl = document.createElement("img");
    bookImgEl.setAttribute("src", book.imageLink);
    bookImgEl.classList.add("book-img");
    bookDetailsEl.appendChild(bookImgEl);

    let bookAuthorEl = document.createElement("p");
    bookAuthorEl.textContent = book.author;
    bookAuthorEl.classList.add("text-center", "p-2", "author");
    bookDetailsEl.appendChild(bookAuthorEl);

}

function matchedResults(results) {
    spinnerEl.classList.remove("d-none");
    
    for (let book of results) {
        if (book.imageLink === "") {

        } else {
            spinnerEl.classList.add("d-none");
            headingEl.classList.remove("d-none");
            updateResultsInUI(book);
        }
    }
}

function sendTheRequest() {
    resultsEl.textContent = "";
    let requserUrl = `https://apis.ccbp.in/book-store?title=${userInputEl.value}`;
    let options = {
        method: "GET"
    };
    fetch(requserUrl, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(results) {
            matchedResults(results.search_results);
            console.log(results.search_results);
        });
}

userInputEl.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        spinnerEl.classList.remove("d-none");
        headingEl.classList.add("d-none");
        sendTheRequest();
    }
});