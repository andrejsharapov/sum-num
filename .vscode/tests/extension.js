const vscode = require('vscode');

let statusBarItem;
let updateTimeout;

function activate(context) {
    createStatusBarItem();
    vscode.window.onDidChangeTextEditorSelection(updateSumFromSelection);

    const calculateCommand = vscode.commands.registerCommand('sumSelected.calculate', () => {
        calculateAndShowSum(true);
    });

    context.subscriptions.push(calculateCommand, statusBarItem);

    setTimeout(() => updateSumFromSelection(), 500);
}

function createStatusBarItem() {
    statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        9999
    );

    statusBarItem.text = '$(calculator) Σ: 0';
    statusBarItem.tooltip = 'Sum of selected numbers';
    statusBarItem.command = 'sumSelected.calculate';
    statusBarItem.show();
}

function updateSumFromSelection() {
    if (updateTimeout) {
        clearTimeout(updateTimeout);
    }

    updateTimeout = setTimeout(() => {
        calculateAndShowSum(false);
    }, 100);
}

function calculateAndShowSum(showNotification = false) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        updateStatusBar(0, 0, false);
        return;
    }

    const selections = editor.selections;
    if (selections.length === 0 || selections.every(s => s.isEmpty)) {
        updateStatusBar(0, 0, false);
        return;
    }

    let total = 0;
    let count = 0;
    let hasNumbers = false;

    selections.forEach(selection => {
        const text = editor.document.getText(selection);
        if (!text) return;

        // ВСЕГДА используем улучшенный парсер с поддержкой разделителей тысяч
        const numbers = extractNumbersUniversal(text);
        if (numbers && numbers.length > 0) {
            hasNumbers = true;
            numbers.forEach(num => {
                const value = parseFloat(num);
                if (!isNaN(value)) {
                    total += value;
                    count++;
                }
            });
        }
    });

    updateStatusBar(total, count, hasNumbers);

    if (showNotification && hasNumbers) {
        vscode.window.showInformationMessage(
            `Sum: ${formatNumber(total)} (${count} numbers)`
        );
    }
}

function extractNumbersUniversal(text) {
    // ОБЪЕДИНЕННЫЙ ПАРСЕР ДЛЯ ВСЕХ СЛУЧАЕВ

    // Шаг 1: Проверяем, является ли текст таблицей Markdown
    const lines = text.split('\n');
    const hasTableMarkers = lines.some(line => line.includes('|'));

    // Для таблиц используем специальную логику
    if (hasTableMarkers) {
        return extractNumbersFromTableText(text);
    }

    // Шаг 2: Для обычного текста используем универсальный парсер
    return extractNumbersWithThousands(text);
}

function extractNumbersWithThousands(text) {
    // Этот парсер понимает разделители тысяч в ЛЮБОМ тексте

    const numbers = [];

    // Шаблон для поиска чисел с разделителями тысяч
    // Ищет: 1 424, 25 000.50, 1 424 567
    const thousandPattern = /\b\d{1,3}(?:[ \u00A0]\d{3})+(?:\.\d+)?\b/g;

    // Шаблон для обычных чисел (без разделителей тысяч)
    const normalPattern = /\b\d+(?:\.\d+)?\b/g;

    // 1. Сначала ищем числа с разделителями тысяч
    let match;
    let processedText = text;

    while ((match = thousandPattern.exec(text)) !== null) {
        const numberWithSpaces = match[0];
        const numberWithoutSpaces = numberWithSpaces.replace(/[ \u00A0]/g, '');

        if (/^\d+(?:\.\d+)?$/.test(numberWithoutSpaces)) {
            numbers.push(numberWithoutSpaces);
            // Удаляем найденное число из текста, чтобы не обрабатывать повторно
            processedText = processedText.replace(numberWithSpaces, ' ');
        }
    }

    // 2. В оставшемся тексте ищем обычные числа
    const remainingMatches = processedText.match(normalPattern);
    if (remainingMatches) {
        remainingMatches.forEach(match => {
            // Проверяем, что это не часть уже обработанного числа
            if (!numbers.includes(match.replace(/[ \u00A0]/g, ''))) {
                numbers.push(match);
            }
        });
    }

    return numbers;
}

function extractNumbersFromTableText(text) {
    const lines = text.split('\n');
    let allNumbers = [];

    lines.forEach(line => {
        const trimmedLine = line.trim();

        // Пропускаем разделительные строки (---) и пустые
        if (!trimmedLine || trimmedLine.match(/^[\s|:-]+$/)) {
            return;
        }

        // Убираем начальные и конечные | если есть
        let cleanLine = trimmedLine;
        if (cleanLine.startsWith('|')) cleanLine = cleanLine.substring(1);
        if (cleanLine.endsWith('|')) cleanLine = cleanLine.slice(0, -1);

        // Разбиваем на ячейки
        const cells = cleanLine.split(/\|/).map(cell => cell.trim());

        cells.forEach(cell => {
            if (!cell || cell === '—' || cell === '-' || cell === '–') {
                return;
            }

            // Для каждой ячейки используем универсальный парсер
            const cellNumbers = extractNumbersWithThousands(cell);
            allNumbers = allNumbers.concat(cellNumbers);
        });
    });

    return allNumbers;
}

function updateStatusBar(total, count, hasNumbers) {
    if (!statusBarItem) return;

    if (hasNumbers && count > 0) {
        statusBarItem.text = `$(calculator) Σ: ${formatNumber(total)}`;
        statusBarItem.tooltip = `Sum: ${formatNumber(total)} (${count} numbers)`;
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    } else {
        statusBarItem.text = '$(calculator) Σ: 0';
        statusBarItem.tooltip = 'Select numbers to see sum';
        statusBarItem.backgroundColor = undefined;
    }

    statusBarItem.show();
}

function formatNumber(num) {
    if (num % 1 === 0) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    } else {
        return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}

function deactivate() {
    if (updateTimeout) {
        clearTimeout(updateTimeout);
    }
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}

module.exports = { activate, deactivate };