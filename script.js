document.addEventListener("DOMContentLoaded", () => {
  // Save salary to local storage
  document.getElementById("save-salary").addEventListener("click", function () {
    let salary = document.getElementById("salary-input").value;
    localStorage.setItem("monthlySalary", salary);
    document.getElementById("salary-input").value = "";
    updateRemainingBalance();
  });

  // Reset salary
  document.getElementById("rest-salary").addEventListener("click", function () {
    let salary = 0;
    localStorage.setItem("monthlySalary", salary);
    document.getElementById("salary-input").value = "";
    document.getElementById("remaining-balance").textContent =
      "Remaining Balance: 0";
  });
  /* =================================================================================== */
  // Add a new category to the list and store it in localStorage
  document
    .getElementById("add-category")
    .addEventListener("click", function () {
      let category = document.getElementById("category-input").value;
      if (category) {
        let categories = JSON.parse(localStorage.getItem("categories")) || [];
        categories.push(category);
        localStorage.setItem("categories", JSON.stringify(categories));
        displayCategories();
        document.getElementById("category-input").value = "";
      } else {
        alert("Please enter a category.");
      }
    });

  // Show/Hide category table
  document
    .getElementById("toggle-category-table")
    .addEventListener("click", function () {
      let categoryContainer = document.getElementById("category-container");
      if (categoryContainer.style.display === "none") {
        categoryContainer.style.display = "block";
        this.textContent = "Hide Categories";
      } else {
        categoryContainer.style.display = "none";
        this.textContent = "Show Categories";
      }
    });

  // Function to display categories in the table and dropdown
  function displayCategories() {
    let categoryTableBody = document.getElementById("category-table-body");
    categoryTableBody.innerHTML = ""; // Clear existing rows

    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    let transactions = JSON.parse(localStorage.getItem("expenses")) || [];

    categories.forEach((cat, index) => {
      let row = document.createElement("tr");

      // Add category name to the row
      let categoryCell = document.createElement("td");
      categoryCell.textContent = cat;
      row.appendChild(categoryCell);

      // Calculate and display total cost per category
      let totalCostCell = document.createElement("td");
      let totalCostData = transactions.reduce((acc, transaction) => {
        return transaction.category === cat
          ? acc + transaction.total_cost
          : acc;
      }, 0);
      totalCostCell.textContent = totalCostData.toFixed(2);
      row.appendChild(totalCostCell);

      // Add delete button to the row
      let actionCell = document.createElement("td");
      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-category");
      deleteBtn.setAttribute("data-index", index);
      actionCell.appendChild(deleteBtn);
      row.appendChild(actionCell);

      categoryTableBody.appendChild(row);
    });

let categorySelect = document.getElementById("item-category");
categorySelect.innerText = "";

categories.forEach((cat) => {  
  let option = document.createElement("option");
  option.value = cat;            // تم تصحيح مفتاح value
  option.text = cat;           
  categorySelect.appendChild(option); 
});
    // Attach event listeners to delete buttons
    document.querySelectorAll(".delete-category").forEach((button) => {
      button.addEventListener("click", function () {
        let index = this.getAttribute("data-index");
        deleteCategory(index);
      });
    });
  }

  // Function to delete a category by index
  function deleteCategory(index) {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    categories.splice(index, 1); // Remove the category at the given index
    localStorage.setItem("categories", JSON.stringify(categories)); // Update local storage
    displayCategories(); // Refresh the category table and dropdown
  }
  /* =================================================================================== */
  // Update the remaining balance after calculating total expenses
  function updateRemainingBalance() {
    let salary = localStorage.getItem("monthlySalary") || 0;
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let totalExpenses = expenses.reduce((acc, exp) => acc + exp.total_cost, 0);
    let remainingBalance = salary - totalExpenses;
    document.getElementById(
      "remaining-balance"
    ).textContent = `Remaining Balance: ${remainingBalance.toFixed(2)}`;
  }

  // Add a new expense and save it to local storage
  document.getElementById("add-expense").addEventListener("click", function () {
    let itemName = document.getElementById("item-name").value;
    let itemQuantity = document.getElementById("item-quantity").value;
    let itemCost = document.getElementById("item-cost").value;
    let itemCategory = document.getElementById("item-category").value;

    if (itemName && itemQuantity && itemCost && itemCategory) {
      // Calculate total cost for the item
      let totalCost = itemQuantity * itemCost;

      // Create expense object
      let expense = {
        name: itemName,
        quantity: itemQuantity,
        cost_per_unit: itemCost,
        total_cost: totalCost,
        category: itemCategory,
        store: document.getElementById("item-store").value || "Unknown", // Use store input
      };

      // Save expense to local storage
      let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      expenses.push(expense);
      localStorage.setItem("expenses", JSON.stringify(expenses));

      // Clear input fields
      document.getElementById("item-name").value = "";
      document.getElementById("item-quantity").value = "";
      document.getElementById("item-cost").value = "";
      document.getElementById("item-store").value = "";
      document.getElementById("item-category").value = "";

      // Update expense summary display
      displayExpenses();
      updateRemainingBalance();
    } else {
      alert("Please fill in all fields.");
    }
  });
  /* =================================================================================== */
  // Display the list of expenses
  function displayExpenses() {
    let expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = ""; // Clear existing table rows
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let totalCostElement = document.getElementById("total-cost");

    let totalCost = 0; // Initialize total cost accumulator
    expenses.forEach((exp, index) => {
      let row = document.createElement("tr");

      let totalExpenseCost = exp.total_cost;
      totalCost += totalExpenseCost;

      // Create cells for each piece of data
      row.innerHTML = `
          <td>${new Date().toLocaleDateString()}</td>
          <td>${exp.name}</td>
          <td>${exp.quantity}</td>
          <td>${exp.cost_per_unit}</td>
          <td>${exp.total_cost.toFixed(2)}</td>
          <td>${exp.category}</td>
          <td>${exp.store}</td>
          <td><button class="delete" data-index="${index}">Delete</button></td>
        `;

      expenseList.appendChild(row);
    });
    totalCostElement.textContent = totalCost.toFixed(2);

    // Attach event listeners to all delete buttons
    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", function () {
        let index = this.getAttribute("data-index"); // Get the index of the expense
        deleteExpense(index);
      });
    });
  }
  /* =================================================================================== */
  // Function to delete an expense from local storage and refresh the UI
  function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.splice(index, 1); // Remove the expense at the given index
    localStorage.setItem("expenses", JSON.stringify(expenses)); // Update local storage
    displayExpenses(); // Refresh the expense list
    updateRemainingBalance(); // Update the balance after deletion
  }
  /* =================================================================================== */
  // PDF Generation Code
  document
    .getElementById("print-expenses")
    .addEventListener("click", function () {
      const { jsPDF } = window.jspdf;

      // Create a new instance of jsPDF
      const pdf = new jsPDF();

      // Add title and date
      pdf.text("Monthly Expenses Report", 10, 10);
      const date = new Date();
      pdf.text(`Date: ${date.toLocaleDateString()}`, 10, 20);

      // Get the table data
      const tableData = [];
      const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      expenses.forEach((exp) => {
        const row = [
          `${date.toLocaleDateString()}`,
          exp.name,
          exp.quantity,
          exp.cost_per_unit,
          exp.total_cost,
          exp.category,
          exp.store,
        ];
        tableData.push(row);
      });

      // Add the table to the PDF
      pdf.autoTable({
        head: [
          [
            "Date",
            "Item",
            "Quantity",
            "Cost per Unit",
            "Total Cost",
            "Category",
            "Store",
          ],
        ],
        body: tableData,
        startY: 30,
      });

      // Save the PDF
      pdf.save(`monthly_expenses_reportU_${date.toLocaleDateString()}.pdf`);
    });
  /* =================================================================================== */
  // Clear all expenses and reset the form
  document
    .getElementById("clear-expenses")
    .addEventListener("click", function () {
      localStorage.removeItem("expenses");
      localStorage.removeItem("monthlySalary");

      document.getElementById("salary-input").value = "";
      document.getElementById("item-name").value = "";
      document.getElementById("item-quantity").value = "";
      document.getElementById("item-cost").value = "";
      document.getElementById("item-store").value = "";
      document.getElementById("expense-list").innerHTML = "";
      document.getElementById("remaining-balance").textContent =
        "Remaining Balance: 0";

      displayCategories();
      displayExpenses(); // Refresh the expense list after clearing
    });
  /* =================================================================================== */

  // Initialize data on page load
  window.onload = function () {
    displayCategories();
    displayExpenses(); // Display expenses on load
    updateRemainingBalance(); // Update remaining balance on load
  };
});
