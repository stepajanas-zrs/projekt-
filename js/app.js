class App {
    constructor() {
        this.init();
    }

    init() {
        // Vytvoř body obsah
        this.createHTML();
        this.renderMenu();
        this.renderModals();
        this.attachEventListeners();
    }

    createHTML() {
        document.body.innerHTML = `
            <div class="container">
                <h1>🔬 Vědecký portál</h1>
                <p class="subtitle">Kalkulačka, konvertory, tabulky a více</p>
                <div class="menu-grid" id="menuGrid"></div>
                <div class="footer">
                    <p>© 2024 Vědecký portál | Vytvořeno s ❤️</p>
                </div>
            </div>

            <div id="calculatorModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>🧮 Vědecká kalkulačka</h2>
                        <button class="close-btn" onclick="app.closeModal('calculatorModal')">&times;</button>
                    </div>
                    <div class="modal-body" id="calculatorBody"></div>
                </div>
            </div>

            <div id="converterModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>🔄 Konvertor jednotek</h2>
                        <button class="close-btn" onclick="app.closeModal('converterModal')">&times;</button>
                    </div>
                    <div class="modal-body" id="converterBody"></div>
                </div>
            </div>

            <div id="periodicModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>⚛️ Periodická tabulka prvků</h2>
                        <button class="close-btn" onclick="app.closeModal('periodicModal')">&times;</button>
                    </div>
                    <div class="modal-body" id="periodicBody"></div>
                </div>
            </div>
        `;
    }

    renderMenu() {
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
            <div class="menu-card ${item.class}" onclick="app.openModal('${item.modal}')">
                <div class="menu-icon">${item.icon}</div>
                <div class="menu-title">${item.title}</div>
                <div class="menu-description">${item.description}</div>
            </div>
        `).join('');
    }

    renderModals() {
        document.getElementById('calculatorBody').innerHTML = calc.render();
        document.getElementById('converterBody').innerHTML = converter.render();
        document.getElementById('periodicBody').innerHTML = periodic.render();
    }

    openModal(modalId) {
        document.getElementById(modalId).classList.add('show');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('show');
    }

    attachEventListeners() {
        window.onclick = (event) => {
            if (event.target.classList.contains('modal')) {
                event.target.classList.remove('show');
            }
        }

        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') calc.appendNumber(e.key);
            if (e.key === '.') calc.appendNumber('.');
            if (['+', '-', '*', '/'].includes(e.key)) {
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
            }
            if (e.key === 'Escape') {
                calc.clear();
            }
        });
    }
}

// Spusť aplikaci
const app = new App();
