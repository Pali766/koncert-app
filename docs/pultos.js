// docs/pultos.js
const supabase = window.supabaseClient;
if (!supabase) {
  console.error("Supabase kliens nem elérhető. Ellenőrizd a supabase.js és CDN betöltését.");
}

const orderListEl = document.getElementById("orderList");
let orderItems = [];

function renderOrder() {
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

document.getElementById("addToListBtn").onclick = addToList;
document.getElementById("sendOrderBtn").onclick = sendOrder;

