// docs/poharas.js
const supabase = window.supabaseClient || null;

const messagesList = document.getElementById("messagesList");

function showNotice(msg) {
  const n = document.getElementById("poharasNotice");
  if (n) n.textContent = msg;
}

async function loadMessages() {
  if (!messagesList) return;
  messagesList.innerHTML = "<li>Betöltés...</li>";

  if (!supabase) {
    messagesList.innerHTML = "<li>Supabase kliens nem elérhető. Üzenetek nem tölthetők be.</li>";
    showNotice("Valós idejű üzenetek nem elérhetők.");
    return;
  }

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(50);

  if (error) {
    console.error(error);
    messagesList.innerHTML = "<li>Hiba a betöltéskor.</li>";
    return;
  }

  messagesList.innerHTML = "";
  data.forEach(m => {
    const li = document.createElement("li");
    li.textContent = `[${new Date(m.timestamp).toLocaleTimeString()}] ${m.sender_role}: ${m.text}`;
    messagesList.appendChild(li);
  });
}

async function bevitel() {
  if (!supabase) {
    alert("Supabase kliens nem elérhető. Nem lehet menteni.");
    return;
  }

  const name = document.getElementById("bevDrink").value.trim();
  const qty = parseInt(document.getElementById("bevQty").value, 10) || 1;
  if (!name) {
    alert("Adj meg egy italt!");
    return;
  }

  const { error } = await supabase.from("stock_movements").insert([{
    drink_name: name,
    quantity: qty,
    user_role: "poharas",
    timestamp: new Date().toISOString()
  }]);

  if (error) {
    console.error(error);
    alert("Hiba a mentéskor.");
    return;
  }

  document.getElementById("bevDrink").value = "";
  alert("Bevitel rögzítve.");
  await loadMessages();
}

document.addEventListener("DOMContentLoaded", () => {
  const bevBtn = document.getElementById("bevBtn");
  if (bevBtn) bevBtn.addEventListener("click", bevitel);

  if (!supabase) showNotice("Supabase kliens nem elérhető. Bevitel és üzenetek nem működnek.");
  loadMessages();
});
