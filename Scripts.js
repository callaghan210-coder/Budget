document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('budget-form');
    const budgetTableBody = document.getElementById('budget-table-body');
    const totalIncomeDisplay = document.getElementById('total-income');
    const totalExpensesDisplay = document.getElementById('total-expenses');
    const balanceDisplay = document.getElementById('balance');

    let totalIncome = 0;
    let totalExpenses = 0;

    const sampleData = [
        { item: 'Salary', amount: 3000, category: 'income' },
        { item: 'Groceries', amount: 150, category: 'expense' },
        { item: 'Utilities', amount: 100, category: 'expense' },
        { item: 'Freelance', amount: 500, category: 'income' }
    ];

    function addRowToTable(item, amount, category) {
        const row = document.createElement('tr');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');

        deleteButton.addEventListener('click', function () {
            if (category === 'income') {
                totalIncome -= amount;
            } else {
                totalExpenses -= amount;
            }
            budgetTableBody.removeChild(row);
            updateTotals();
        });

        row.innerHTML = `
            <td>${item}</td>
            <td>$${amount.toFixed(2)}</td>
            <td>${category}</td>
            <td></td>
        `;
        row.children[3].appendChild(deleteButton);
        budgetTableBody.appendChild(row);

        if (category === 'income') {
            totalIncome += amount;
        } else {
            totalExpenses += amount;
        }

        updateTotals();
    }

    function updateTotals() {
        totalIncomeDisplay.textContent = `Total Income: $${totalIncome.toFixed(2)}`;
        totalExpensesDisplay.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
        const balance = totalIncome - totalExpenses;
        balanceDisplay.textContent = `Balance: $${balance.toFixed(2)}`;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const item = document.getElementById('item').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;

        addRowToTable(item, amount, category);
        form.reset();
    });

    sampleData.forEach(data => addRowToTable(data.item, data.amount, data.category));
    updateTotals();
});
