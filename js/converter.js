class Converter {
    constructor() {
        this.conversions = {
            length: {
                m: 1,
                km: 0.001,
                cm: 100,
                mm: 1000,
                inch: 39.3701,
                ft: 3.28084,
                mile: 0.000621371
            },
            mass: {
                kg: 1,
                g: 1000,
                mg: 1000000,
                oz: 35.274,
                lb: 2.20462,
                t: 0.001
            },
            temperature: {
                C: 1,
                F: 1.8,
                K: 1
            }
        };
    }

    convert(value, type, from, to) {
        if (isNaN(value)) return 0;

        if (type === 'temperature') {
            return this.convertTemperature(value, from, to);
        }

        const baseValue = value / this.conversions[type][from];
        return baseValue * this.conversions[type][to];
    }

    convertTemperature(value, from, to) {
        let celsius;

        if (from === 'C') celsius = value;
        else if (from === 'F') celsius = (value - 32) * 5/9;
        else if (from === 'K') celsius = value - 273.15;

        if (to === 'C') return celsius;
        else if (to === 'F') return celsius * 9/5 + 32;
        else if (to === 'K') return celsius + 273.15;
    }

    render() {
        return `
            <div class="converter-form">
                <div class="form-group">
                    <label>Typ konverze:</label>
                    <select id="converterType" onchange="converter.updateUnits()">
                        <option value="length">Délka</option>
                        <option value="mass">Hmotnost</option>
                        <option value="temperature">Teplota</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Hodnota:</label>
                    <input type="number" id="converterValue" placeholder="Zadej hodnotu" oninput="converter.convertValue()">
                </div>

                <div class="form-group">
                    <label>Z jednotky:</label>
                    <select id="fromUnit" onchange="converter.convertValue()">
                        <option value="m">Metr (m)</option>
                        <option value="km">Kilometr (km)</option>
                        <option value="cm">Centimetr (cm)</option>
                        <option value="mm">Milimetr (mm)</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Na jednotku:</label>
                    <select id="toUnit" onchange="converter.convertValue()">
                        <option value="m">Metr (m)</option>
                        <option value="km">Kilometr (km)</option>
                        <option value="cm">Centimetr (cm)</option>
                        <option value="mm">Milimetr (mm)</option>
                    </select>
                </div>

                <div class="converter-result" id="converterResult">0</div>
            </div>
        `;
    }

    convertValue() {
        const value = parseFloat(document.getElementById('converterValue').value);
        const type = document.getElementById('converterType').value;
        const from = document.getElementById('fromUnit').value;
        const to = document.getElementById('toUnit').value;

        const result = this.convert(value, type, from, to);
        document.getElementById('converterResult').textContent = 
            result.toFixed(6).replace(/\.?0+$/, '') + ' ' + to;
    }

    updateUnits() {
        // Dynamicky aktualizuj jednotky podle typu
        const type = document.getElementById('converterType').value;
        const units = Object.keys(this.conversions[type]);
        
        const fromSelect = document.getElementById('fromUnit');
        const toSelect = document.getElementById('toUnit');
        
        fromSelect.innerHTML = units.map(u => `<option value="${u}">${u}</option>`).join('');
        toSelect.innerHTML = units.map(u => `<option value="${u}">${u}</option>`).join('');
    }
}

const converter = new Converter();
