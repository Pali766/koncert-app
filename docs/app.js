// Ideiglenes ital lista (később backendből jön)
const drinks = [
    "Coca-Cola",
    "Coca-Cola Zero",
    "Coca-Cola Zero Zero",
    "Fanta Narancs",
    "Sprite",
    "Vodka",
    "Whisky",
    "Sör",
    "Bor"
];

let selectedDrink = null;
let order = [];

document.getElementById("openSearchBtn").onclick = () => {
    document.getElementById("searchPopup").classList.remove("hidden");
    document.getElementById("searchInput").value = "";
    document.getElementById("searchResults").innerHTML = "";
};

function closeSearch() {
    document.getElementById("searchPopup").classList.add("hidden");
}

document.getElementById("searchInput").oninput = function () {
    const text = this.value.toLowerCase();
    const results = drinks.filter(d => d.toLowerCase().includes(text));

    const container = document.getElementById("searchResults");
    container.innerHTML = "";

    results.forEach(drink => {
        const btn = document.createElement("button");
        btn.textContent = drink;
        btn.onclick = () => selectDrink(drink);
        container.appendChild(btn);
    });
};

function selectDrink(drink) {
    selectedDrink = drink;
    document.getElementById("selectedDrinkName").textContent = drink;
    document.getElementById("quantityPopup").classList.remove("hidden");
}

function closeQuantity() {
    document.getElementById("quantityPopup").classList.add("hidden");
}

function addQuantity(qty) {
    order.push({ drink: selectedDrink, qty });
    updateOrderList();
    closeQuantity();
    closeSearch();
}

function customQuantity() {
    const qty = prompt("Add meg a mennyiséget:");
    if (qty && !isNaN(qty)) {
        addQuantity(Number(qty));
    }
}

function updateOrderList() {
    const list = document.getElementById("orderList");
    list.innerHTML = "";

    order.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.drink} (${item.qty})`;
        list.appendChild(li);
    });
}

document.getElementById("sendBtn").onclick = () => {
    alert("Rögzítve! (később backendre megy)");
    order = [];
    updateOrderList();
};
