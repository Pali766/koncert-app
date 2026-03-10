// docs/admin.js
const supabase = window.supabaseClient;
if (!supabase) {
  console.error("Supabase kliens nem elérhető. Ellenőrizd a supabase.js és CDN betöltését.");
}

async function loadDrinks() {
  const tbody = document.getElementById("drinksTableBody");
  tbody.innerHTML = "<tr><td colspan='3'>Betöltés...</td></tr>";

  const { data, error } = await supabase
    .from("drinks")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error(error);
    tbody.innerHTML = "<tr><td colspan='3'>Hiba történt a betöltéskor.</td></tr>";
    return;
  }

  if (!data || data.length === 0) {
    tbody.innerHTML = "<tr><td colspan='3'>Nincs találat.</td></tr>";
    return;
  }

  tbody.innerHTML = "";
  data.forEach(drink => {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = drink.name || "";

    const activeTd = document.createElement("td");
    activeTd.textContent = drink.active ? "Igen" : "Nem";

    const actionsTd = document.createElement("td");

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = drink.active ? "Inaktiválás" : "Aktiválás";
    toggleBtn.onclick = () => toggleActive(drink.id, !drink.active);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Törlés";
    deleteBtn.onclick = () => deleteDrink(drink.id);

    actionsTd.appendChild(toggleBtn);
    actionsTd.appendChild(deleteBtn);

    tr.appendChild(nameTd);
    tr.appendChild(activeTd);
    tr.appendChild(actionsTd);

    tbody.appendChild(tr);
  });
}

async function addDrink() {
  const nameInput = document.getElementById("drinkName");
  const name = nameInput.value.trim();
  if (!name) {
    alert("Adj meg egy nevet!");
    return;
  }

  const { error } = await supabase.from("drinks").insert([{ name, active: true }]);
  if (error) {
    console.error(error);
    alert("Hiba történt az ital mentésekor.");
    return;
  }

  nameInput.value = "";
  await loadDrinks();
}

async function toggleActive(id, newState) {
  const { error } = await supabase.from("drinks").update({ active: newState }).eq("id", id);
  if (error) {
    console.error(error);
    alert("Hiba történt az állapot módosításakor.");
    return;
  }
  await loadDrinks();
}

async function deleteDrink(id) {
  if (!confirm("Biztosan törlöd ezt az italt?")) return;
  const { error } = await supabase.from("drinks").delete().eq("id", id);
  if (error) {
    console.error(error);
    alert("Hiba történt a törléskor.");
    return;
  }
  await loadDrinks();
}

document.getElementById("addDrinkBtn").onclick = addDrink;

window.addEventListener("load", () => {
  loadDrinks();
});

