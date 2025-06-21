const listEl = document.getElementById("groceryList");
const form = document.getElementById("itemForm");
const input = document.getElementById("itemInput");
const message = document.getElementById("message");

// Replace with actual logged-in user ID
const userId = localStorage.getItem("userId");

async function fetchItems() {
  try {
    const res = await fetch(`/api/list/${userId}`);
    const items = await res.json();
    listEl.innerHTML = '';
    items.forEach(item => renderItem(item));
  } catch (err) {
    message.textContent = "שגיאה בטעינת המצרכים.";
  }
}

function renderItem(item) {
  const li = document.createElement("li");
  li.textContent = item.text;
  
  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.onclick = () => {
    const newText = prompt("ערוך את הפריט:", item.text);
    if (newText) updateItem(item.id, newText);
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.onclick = () => deleteItem(item.id);

  li.append(" ", editBtn, deleteBtn);
  listEl.appendChild(li);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  try {
    const res = await fetch('/api/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, user_id: userId })
    });
    const data = await res.json();
    renderItem({ id: data.id, text });
    input.value = '';
  } catch {
    message.textContent = "שגיאה בהוספה.";
  }
});

async function updateItem(id, newText) {
  try {
    await fetch(`/api/list/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText })
    });
    fetchItems(); // Refresh the list
  } catch {
    message.textContent = "שגיאה בעדכון.";
  }
}

async function deleteItem(id) {
  try {
    await fetch(`/api/list/${id}`, { method: 'DELETE' });
    fetchItems();
  } catch {
    message.textContent = "שגיאה במחיקה.";
  }
}

fetchItems();