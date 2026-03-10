// docs/poharas.js
const supabase = window.supabaseClient;
if (!supabase) {
  console.error("Supabase kliens nem elérhető. Ellenőrizd a supabase.js és CDN betöltését.");
}

const messagesList = document.getElementById("messagesList");

async function loadMessages() {
  messagesList.innerHTML = "<li>Betöltés...</li>";
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

document.getElementById("bevBtn").onclick = bevitel;

window.addEventListener("load", () => {
  loadMessages();
});

