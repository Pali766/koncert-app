// docs/pultos.js
const supabase = window.supabaseClient || null;

const orderListEl = document.getElementById("orderList");
let orderItems = [];

function showNotice(msg) {
  const n = document.getElementById("pultosNotice");
  if (n) n.textContent = msg;
}

function renderOrder() {
  if (!orderListEl) return;
  orderListEl.innerHTML = "";
  orderItems.forEach((it, idx) => {
    const li = document.createElement("li");
    li.textContent = `${it.name} × ${it.qty}`;
    const remove = document.createElement("button");
    remove.textContent = "×";
    remove.onclick = () => {
      orderItems.splice(idx, 1);
      renderOrder();
    };
    li.appendChild(remove);
    orderListEl.appendChild(li);
  });
}

function addToList() {
  const name = document.getElementById("searchDrink").value.trim();
  const qty = parseInt(document.getElementById("qty").value, 10) || 1;
  if (!name) {
    alert("Adj meg egy italt!");
    return;
  }
  orderItems.push({ name, qty });
  renderOrder();
  document.getElementById("searchDrink").value = "";
}

async function sendOrder() {
  if (!supabase) {
    alert("Supabase kliens nem elérhető. Nem lehet üzenetet küldeni.");
    return;
  }

  if (orderItems.length === 0) {
    alert("Nincs tétel a listán.");
    return;
  }

  const text = orderItems.map(i => `${i.name}×${i.qty}`).join(", ");
  const { error } = await supabase.from("messages").insert([{
    sender_role: "pultos",
    receiver_role: "poharas",
    text,
    timestamp: new Date().toISOString()
  }]);

  if (error) {
    console.error(error);
    alert("Hiba történt a küldéskor.");
    return;
  }

  orderItems = [];
  renderOrder();
  alert("Üzenet elküldve.");
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addToListBtn");
  const sendBtn = document.getElementById("sendOrderBtn");
  if (addBtn) addBtn.addEventListener("click", addToList);
  if (sendBtn) sendBtn.addEventListener("click", sendOrder);

  if (!supabase) showNotice("Supabase kliens nem elérhető. Üzenetküldés nem működik.");
});
