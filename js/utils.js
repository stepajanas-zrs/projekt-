// Globální funkce
function openModal(modalId) {
    document.getElementById(modalId).classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
}

// LocalStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
