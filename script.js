// Declaration of accessKey variable
const accessKey = "aK-nPjA3fcBEvko1rtQM-xIN5nsSOMAGmcHz9-JVLXk";

// Declaration of HTML variables
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

// Function for fetching and displaying images
async function searchImages() {
    try {
        // Get the input value and construct the API URL
        inputData = inputEl.value;
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

        // Fetch data from the Unsplash API
        const response = await fetch(url);
        const data = await response.json();

        // Extract results from the API response
        const results = data.results;

        // Clear previous results if it's the first page
        if (page === 1) {
            searchResults.innerHTML = "";
        }

        // Map and display the results
        results.forEach((result) => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        // Show the "Show More" button after the first page
        if (page > 1) {
            showMore.style.display = "block";
        }

        // Increment the page number for the next request
        page++;
    } catch (error) {
        console.error("Error fetching images:", error.message);
    }
}

// Event listener for the form submission
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1; // Reset page number for new searches
    searchImages();
});

// Event listener for the "Show More" button
showMore.addEventListener("click", () => {
    searchImages();
});
