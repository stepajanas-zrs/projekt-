document.addEventListener('DOMContentLoaded', () => {
    // Vytvoř menu
    const menuGrid = document.getElementById('menuGrid');
    const menuItems = [
        {
            icon: '🧮',
            title: 'Kalkulačka',
            description: 'Vědecká a fyzikální výpočty',
            modal: 'calculatorModal',
            class: 'calc'
        },
        {
            icon: '🔄',
            title: 'Konvertor',
            description: 'Převody jednotek',
            modal: 'converterModal',
            class: 'converter'
        },
        {
            icon: '⚛️',
            title: 'Periodická tabulka',
            description: 'Prvky a jejich vlastnosti',
            modal: 'periodicModal',
            class: 'periodic'
        }
    ];

    menuGrid.innerHTML = menuItems.map(item => `
        <div class="menu-card ${item.class}" onclick="openMenu('${item.modal}')">
            <div class="menu-icon">${item.icon}</div>
            <div class="menu-title">${item.title}</div>
            <div class="menu-description">${item.description}</div>
        </div>
    `).join('');

    // Inicializuj modaly
    document.getElementById('calculatorBody').innerHTML = calc.render();
    document.getElementById('converterBody').innerHTML = converter.render();
    document.getElementById('periodicBody').innerHTML = periodic.render();
});

function openMenu(modalId) {
    openModal(modalId);
}

// Klávesnicové zkratky
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') calc.appendNumber(e.key);
    if (e.key === '.') calc.appendNumber('.');
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        calc.appendOperator(e.key);
    }
    if (e.key === 'Enter') {
        e.preventDefault();
        calc.calculate();
    }
    if (e.key === 'Backspace') {
        e.preventDefault();
        calc.deleteLast();
