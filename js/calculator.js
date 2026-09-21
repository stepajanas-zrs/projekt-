class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = '';
        this.shouldResetDisplay = false;
        this.calculations = [];
    }

    appendNumber(num) {
        if (this.shouldResetDisplay) {
            this.currentValue = num;
            this.shouldResetDisplay = false;
        } else {
            if (this.currentValue === '0' && num !== '.') {
                this.currentValue = num;
            } else if (num === '.' && this.currentValue.includes('.')) {
                return;
            } else {
                this.currentValue += num;
            }
        }
        this.updateDisplay();
    }

    appendOperator(op) {
        if (this.operator !== '' && !this.shouldResetDisplay) {
            this.calculate();
        }
        this.previousValue = this.currentValue;
        this.operator = op;
        this.shouldResetDisplay = true;
    }

    appendFunction(func) {
        const num = parseFloat(this.currentValue);
        let result;

        switch(func) {
            case 'sqrt':
                result = Math.sqrt(num);
                break;
            case 'pow2':
                result = num * num;
                break;
            case 'pow3':
                result = num * num * num;
                break;
            case 'sin':
                result = Math.sin(num * Math.PI / 180);
                break;
            case 'cos':
                result = Math.cos(num * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan(num * Math.PI / 180);
                break;
            case 'log':
                result = Math.log10(num);
                break;
            case 'ln':
                result = Math.log(num);
                break;
            case 'exp':
                result = Math.exp(num);
                break;
        }

        this.currentValue = Math.round(result * 1000000000000) / 1000000000000;
        this.addToHistory(`${func}(${num}) = ${this.currentValue}`);
        this.updateDisplay();
    }

    insertConstant(value) {
        this.currentValue = value.toString();
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    calculate() {
        if (this.operator === '' || this.previousValue === '') return;

        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        let result;

        switch(this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current !== 0 ? prev / current : 0;
                break;
        }

        result = Math.round(result * 1000000000000) / 1000000000000;
        this.addToHistory(`${this.previousValue} ${this.operator} ${this.currentValue} = ${result}`);
        this.currentValue = result.toString();
        this.operator = '';
        this.previousValue = '';
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = '';
        this.shouldResetDisplay = false;
        this.updateDisplay();
    }

    deleteLast() {
        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        } else {
            this.currentValue = '0';
        }
        this.updateDisplay();
    }

    toggleSign() {
        const num = parseFloat(this.currentValue);
        this.currentValue = (-num).toString();
        this.updateDisplay();
    }

    updateDisplay() {
        const display = document.getElementById('calcDisplay');
        if (display) {
            display.textContent = this.currentValue;
        }
    }

    addToHistory(entry) {
        this.calculations.unshift(entry);
        if (this.calculations.length > 5) {
            this.calculations.pop();
        }
        const history = document.getElementById('calcHistory');
        if (history) {
            history.innerHTML = this.calculations.map(item => 
                `<div class="history-item">${item}</div>`
            ).join('');
        }
    }

    render() {
        return `
            <div class="display" id="calcDisplay">0</div>
            <div class="buttons-grid">
                <button class="btn-number" onclick="calc.appendNumber('7')">7</button>
                <button class="btn-number" onclick="calc.appendNumber('8')">8</button>
                <button class="btn-number" onclick="calc.appendNumber('9')">9</button>
                <button class="btn-operator" onclick="calc.appendOperator('/')">/</button>

                <button class="btn-number" onclick="calc.appendNumber('4')">4</button>
                <button class="btn-number" onclick="calc.appendNumber('5')">5</button>
                <button class="btn-number" onclick="calc.appendNumber('6')">6</button>
                <button class="btn-operator" onclick="calc.appendOperator('*')">×</button>

                <button class="btn-number" onclick="calc.appendNumber('1')">1</button>
                <button class="btn-number" onclick="calc.appendNumber('2')">2</button>
                <button class="btn-number" onclick="calc.appendNumber('3')">3</button>
                <button class="btn-operator" onclick="calc.appendOperator('-')">−</button>

                <button class="btn-number" onclick="calc.appendNumber('0')">0</button>
                <button class="btn-number" onclick="calc.appendNumber('.')">.</button>
                <button class="btn-operator" onclick="calc.appendOperator('+')">+</button>
                <button class="btn-operator" onclick="calc.toggleSign()">±</button>

                <button class="btn-clear" onclick="calc.clear()">C</button>
                <button class="btn-clear" onclick="calc.deleteLast()">⌫</button>
                <button class="btn-equals" onclick="calc.calculate()">=</button>
            </div>

            <div style="margin-top: 20px;">
                <h3>Vědecké funkce</h3>
                <div class="scientific-buttons">
                    <button class="btn-scientific" onclick="calc.appendFunction('sqrt')">√</button>
                    <button class="btn-scientific" onclick="calc.appendFunction('pow2')">x²</button>
                    <button class="btn-scientific" onclick="calc.appendFunction('pow3')">x³</button>
                    <button class="btn-scientific" onclick="calc.appendFunction('sin')">sin</button>
                    <button class="btn-scientific" onclick="calc.appendFunction('cos')">cos</button>
                    <button class="btn-scientific" onclick="calc.appendFunction('tan')">tan</button>
                    <button class="btn-scientific" onclick="calc.appendFunction('log')">log</button>
                    <button class="btn-scientific" onclick="calc.appendFunction('ln')">ln</button>
                    <button class="btn-scientific" onclick="calc.appendFunction('exp')">eˣ</button>
                </div>
            </div>

            <div style="margin-top: 20px;">
                <h3>Fyzikální konstanty</h3>
                <div class="scientific-buttons">
                    <button class="btn-scientific" onclick="calc.insertConstant(3.14159265359)">π</button>
                    <button class="btn-scientific" onclick="calc.insertConstant(2.71828182846)">e</button>
                    <button class="btn-scientific" onclick="calc.insertConstant(9.81)">g</button>
                    <button class="btn-scientific" onclick="calc.insertConstant(299792458)">c</button>
                    <button class="btn-scientific" onclick="calc.insertConstant(6.62607015e-34)">h</button>
                    <button class="btn-scientific" onclick="calc.insertConstant(1.602176634e-19)">eₚ</button>
                </div>
            </div>

            <div id="calcHistory" style="background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; margin-top: 15px; max-height: 100px; overflow-y: auto; font-size: 12px; color: #666;"></div>
        `;
    }
}

const calc = new Calculator();
