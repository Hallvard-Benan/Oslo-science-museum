const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const detailsContainer = document.querySelector(".details-container");
const detailsSection = document.querySelector(".details");

const url = `http://ocsm.x10.mx/wp/wp-json/wc/store/products/${id}`;

async function getDetails(details) {
  try {
    const response = await fetch(url);
    const result = await response.json();

    let detailImage = result.images[1]
      ? result.images[1].src
      : result.images[0].src;
    detailsSection.classList.remove("starry");
    detailsContainer.innerHTML = `
    <h1>${result.name}</h1>
        <div class="split-container">
        <!-- description edited and partially created using open ai chat gpt https://chat.openai.com/ -->
          <div class="vr-text">
                ${result.description}
          </div>
          <div class="exhibit-image">
            <img src="${detailImage}" alt="image from the exhibition" class="exhibit-image">
          </div>
        </div>
        `;
  } catch (error) {
    detailsContainer.innerHTML = `error: ${error}`;
  }
}

if (id) {
  getDetails();
}
