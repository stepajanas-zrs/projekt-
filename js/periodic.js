class PeriodicTable {
    constructor() {
        this.elements = [
            {num: 1, symbol: 'H', name: 'Vodík', mass: 1.008},
            {num: 2, symbol: 'He', name: 'Helium', mass: 4.003},
            {num: 6, symbol: 'C', name: 'Uhlík', mass: 12.011},
            {num: 7, symbol: 'N', name: 'Dusík', mass: 14.007},
            {num: 8, symbol: 'O', name: 'Kyslík', mass: 15.999},
            {num: 11, symbol: 'Na', name: 'Sodík', mass: 22.990},
            {num: 12, symbol: 'Mg', name: 'Hořčík', mass: 24.305},
            {num: 17, symbol: 'Cl', name: 'Chlor', mass: 35.453},
            {num: 26, symbol: 'Fe', name: 'Železo', mass: 55.845},
            {num: 79, symbol: 'Au', name: 'Zlato', mass: 196.967},
            {num: 92, symbol: 'U', name: 'Uran', mass: 238.029}
        ];
    }

    showElement(element) {
        const info = document.getElementById('elementInfo');
        document.getElementById('elementTitle').textContent = `${element.symbol} - ${element.name}`;
        document.getElementById('elementDetails').textContent = 
            `Protonové číslo: ${element.num} | Molární hmotnost: ${element.mass} g/mol`;
        info.style.display = 'block';
    }

    render() {
        return `
            <div class="periodic-grid">
                ${this.elements.map(el => `
                    <div class="element" onclick="periodic.showElement(${JSON.stringify(el).replace(/"/g, '&quot;')})">
                        <div class="element-number">${el.num}</div>
                        <div class="element-symbol">${el.symbol}</div>
                        <div class="element-name">${el.name}</div>
                    </div>
                `).join('')}
            </div>
            <div id="elementInfo" style="margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 8px; display: none;">
                <h3 id="elementTitle"></h3>
                <p id="elementDetails"></p>
            </div>
        `;
    }
}

const periodic = new PeriodicTable();
