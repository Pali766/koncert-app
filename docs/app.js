// --- Ital lista (később adminból jön majd) ---
const drinks = [
    "Coca-Cola",
    "Coca-Cola Zero",
    "Coca-Cola Zero Zero",
    "Fanta Narancs",
    "Sprite",
    "Vodka",
    "Whiskey",
    "Sör",
    "Bor"
];

let order = [];
let selectedDrink = null;

// --- Kereső popup ---
document.getElementById("openSearchBtn").onclick = () => {
    document.getElementById("searchPopup").classList.remove("hidden");
    document.getElementById("searchInput").value = "";
    document.getElementById("searchResults").innerHTML = "";
};

function closeSearch() {
    document.getElementById("searchPopup").classList.add("hidden");
}

document.getElementById("searchInput").oninput = () => {
    const text = document.getElementById("searchInput").value.toLowerCase();
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

// --- Mennyiség ---
function addQuantity(qty) {
    order.push({ drink: selectedDrink, qty });
    closeQuantity();
    closeSearch();
    updateOrderList();
}

function customQuantity() {
    const qty = parseInt(prompt("Add meg a mennyiséget:"), 10);
    if (!isNaN(qty) && qty > 0) {
        addQuantity(qty);
    }
}

// --- Lista frissítése ---
function updateOrderList() {
    const list = document.getElementById("orderList");
    list.innerHTML = "";

    order.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.drink} (${item.qty})`;
        list.appendChild(li);
    });
}

// --- Küldés Supabase-be ---
document.getElementById("sendBtn").onclick = async () => {
    if (order.length === 0) {
        alert("Nincs mit küldeni.");
        return;
    }

    const rows = order.map(o => ({
        drink: o.drink,
        qty: o.qty
    }));

    const { error } = await supabase.from("orders").insert(rows);

    if (error) {
        console.error(error);
        alert("Hiba történt a mentés közben.");
        return;
    }

    alert("Rendelés elküldve!");
    order = [];
    updateOrderList();
};
