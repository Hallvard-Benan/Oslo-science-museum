const cardContainer = document.querySelector(".card-container");
const newExhibitContainer = document.querySelector(".new-exhibit-container");

async function getPosts() {
  const url = "http://ocsm.x10.mx/wp/wp-json/wc/store/products";
  try {
    const response = await fetch(url);
    const results = await response.json();

    results.forEach(function (result) {
      cardContainer.innerHTML += `
      <a href="exhibit.html?id=${result.id}">
      <div class="card ${result.attributes[0].terms[0].name}">
          <img src="${result.images[0].src}" alt="thumbnail image for ${result.name}" class="card-image ${result.attributes[0].terms[0].name}-image">
          <div class="card-content">
              <h3 class="card-title">${result.name}</h3>
              ${result.short_description}
              <a href="exhibit.html?id=${result.id}" class="card-button">About exhibit</a>
          </div>
          </div>
          </a>
    `;
    });
    if (newExhibitContainer) {
      const newestExhibit = results[0];
      const summary = newestExhibit.description;
      const shorterSummary = summary.substring(0, 250);
      let summaryToUse;
      if (summary.length > 145) {
        summaryToUse = shorterSummary;
      } else {
        summaryToUse = summary;
      }
      newExhibitContainer.innerHTML = `
      <div class="text new-text">
        <h3>New ${newestExhibit.name} exhibit</h3>
        <div class="new-text-decription">
        <!-- description edited and partially created using open ai chat gpt https://chat.openai.com/ -->
          <p class="new-text-paragraph">${summaryToUse}...</p>
          <a href="exhibit.html?id=${newestExhibit.id}" class="button">read more</a>
        </div>
      </div>
      <div class="image new-image">
        <img src="${newestExhibit.images[1].src}" alt="man in wheelchair holding out prosthetic arm">
      </div>
      `;
    }
  } catch (error) {
    cardContainer.innerHTML = `<h2>Sorry, something went wrong</h2>
                                    <div>${error}</div>`;
  }
}

getPosts();
