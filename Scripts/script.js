
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

const displayCategories = (categories) => {
    // console.log(categories);
    let categoriesSection = document.getElementById("categories-section");
    categoriesSection.innerHTML = "";
    categories.forEach(category => {
        let categoryElement = document.createElement('div');
        categoryElement.innerHTML = `
            <button class="categoryBtns btn btn-soft bg-base-100 shadow-none w-full border-none justify-start" id="categoryBtn-${category.id}" onclick="loadCategoryItems('${category.id}')">${category.category_name}</button>
        `
        categoriesSection.appendChild(categoryElement);
    });
}

const loadCategoryItems = (category_id) => {
    categorySwitch(category_id)
    const url = `https://openapi.programming-hero.com/api/category/${category_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategoryItems(data.plants))
}

const categorySwitch = (category_id) => {
    const allcategoryBtn = document.getElementsByClassName("categoryBtns");
    for (const btn of allcategoryBtn) {
        btn.classList.replace("bg-theme-primary", "btn-soft");
        btn.classList.contains("text-white") ?
        btn.classList.replace("text-white","text-neutral-800")
        : btn.classList.add("text-neutral-800")
    }
    const categoryBtn = document.getElementById(`categoryBtn-${category_id}`);
    categoryBtn.classList.replace("btn-soft", "bg-theme-primary");
    categoryBtn.classList.replace("text-neutral-800","text-white");
}

const displayCategoryItems = (plants) => {
    let plantsContainer = document.getElementById('plants-container');
    plantsContainer.classList.replace("grid-cols-1", "grid-cols-3")
    plantsContainer.innerHTML = "";
    plants.forEach(plant=> {
        let plantDiv = document.createElement('div');
        plantDiv.innerHTML = `
            <div class="card bg-base-100 column">
                    <figure class="p-4">
                        <img src="${plant.image}"
                            alt="${plant.name}" class="rounded-lg" />
                    </figure>
                    <div class="card-body pt-0 space-y-2">
                        <h2 class="card-title">${plant.name}</h2>
                        <p>${plant.description}
                        </p>
                        <div class="items-center flex justify-between">
                            <span class="badge bg-success/20 text-theme-primary">${plant.category}</span>
                            <p class="text-lg font-semibold text-end">৳${plant.price}</p>
                        </div>
                        <div class="card-actions">
                            <button class="btn bg-theme-primary w-full rounded-full text-neutral-100">Add To Cart</button>
                        </div>
                    </div>
                </div>
        `
        plantsContainer.appendChild(plantDiv);
    })
}

loadCategories()