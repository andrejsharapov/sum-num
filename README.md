# Sum Num

<p align="center">
    <a href="https://github.com/andrejsharapov/sum-num">
        <img src="https://github.com/andrejsharapov/sum-num/blob/main/icon.png?raw=true" alt="Sum Num">
    </a>
</p>

<p align="center">
    <a href="https://marketplace.visualstudio.com/items?itemName=andrejsharapov.sum-num">
        <img src="https://img.shields.io/visual-studio-marketplace/v/andrejsharapov.sum-num?style=for-the-badge&colorA=263238&colorB=4CAF50&label=VERSION" alt="Current Version">
    </a>
    <a href="https://marketplace.visualstudio.com/items?itemName=andrejsharapov.sum-num">
        <img src="https://img.shields.io/visual-studio-marketplace/i/andrejsharapov.sum-num?style=for-the-badge&colorA=263238&colorB=43A047" alt="Installations">
    </a>
    <a href="https://marketplace.visualstudio.com/items?itemName=andrejsharapov.sum-num">
        <img src="https://img.shields.io/visual-studio-marketplace/r/andrejsharapov.sum-num?style=for-the-badge&colorA=263238&colorB=43A047" alt="Rating">
    </a>
</p>

VSCode extension: Calculates the sum of selected numbers in rows or random columns and displays them in the status bar.

## Features

Automatically calculates and displays the sum of selected numbers directly in the status bar. Perfect for data analysis, financial calculations, and working with tables.

- Real-time Calculation: Automatically calculates sum of numbers in selected text
- Smart Parsing: Intelligently handles different number formats
- Status Bar Display: Shows sum in VS Code status bar (bottom right)
- Auto-update: Updates calculation every 100ms when text is selected
- One-click Details: Click status bar item to see detailed summary

## Smart Number Recognition

- Thousand separators with spaces: 1 424 → 1424
- Plain numbers: 100, 5762, 37742
- Decimal numbers: 25.50, 1 424.75
- Negative numbers: -50, -1 500
- Numbers within text: Price: 100 USD → 100
- Markdown tables: Automatically parses table cells

**Intelligently ignores:**

- Text characters around numbers
- Multiple spaces between numbers
- Markdown table formatting (|, ---)
- Dash symbols (—, -, –)

## Examples

| Level | XP    | Total XP |
| ----- | ----- | -------- |
| 1     | 100   | 0        |
| 10    | 352   | 1 678    |
| 20    | 1 424 | 8 825    |
| 30    | 5762  | 37742    |

Automatically displays the result of calculating the current sum of the selected numbers.

**Example 1:** Single Row Selection

| Level | XP      | Total XP |
| ----- | ------- | -------- |
| 1     | **100** | **0**    |

**Shows in status bar**: Σ 100

**Example 2**: Multi-Column Selection (use Alt)

| Level | XP        | Total XP |
| ----- | --------- | -------- |
| 10    | **352**   | 1 638    |
| 20    | **1 424** | 8 825    |

**Shows in status bar**: Σ 1 776

**Example 3:** Mixed Number Formats (use Alt)

| Level | XP        | Total XP  |
| ----- | --------- | --------- |
| 20    | **1 424** | 8 825     |
| 30    | 5762      | **37742** |

**Shows in status bar**: Σ 39 166

**Example 4:** Complex Multi-Selection

| Level | XP      | Total XP  |
| ----- | ------- | --------- |
| 1     | **100** | 0         |
| 10    | **352** | **1 638** |

**Shows in status bar**: Σ 2 090

## Use Cases

- Financial analysis: Quick sum of prices, amounts
- Data validation: Verify totals in spreadsheets
- Game development: Calculate experience points, scores
- Accounting: Sum columns of numbers
- Research: Statistical data analysis

## Quick Start

- Select numbers in your editor (any format)
- Look at status bar (bottom right) to see the sum
- Click the sum in status bar for detailed breakdown

## Update Logic

- **Real-time**: Updates as you select text
- **Debounced**: Prevents excessive calculations (100ms delay)
- **Efficient**: Only recalculates when selection changes
- **Persistent**: Remains in status bar until cleared

## Status Bar Display

- **Default**: Σ 0 (no selection)
- **With numbers**: Σ 1 424 (formatted with thousand separators)
- **Color coded**: Yellow background when numbers detected
- **Interactive**: Click for popup with details

---

## Contributing

Found a bug? Have a feature request? Please open an [issue][i].

## License

This project is licensed under the MIT License - see the [LICENSE][l] file for details.

<!-- links -->

[i]: https://github.com/andrejsharapov/sum-num/issues/new
[l]: https://github.com/andrejsharapov/sum-num/blob/main/LICENSE

<!-- badges -->

[mp]: https://marketplace.visualstudio.com/items?itemName=andrejsharapov.sum-num
[mp-v]: https://img.shields.io/visual-studio-marketplace/v/andrejsharapov.sum-num
[mp-d]: https://img.shields.io/visual-studio-marketplace/d/andrejsharapov.sum-num
[mp-r]: https://img.shields.io/visual-studio-marketplace/r/andrejsharapov.sum-num