# Income Manager (ProtoType)

## Description

**Home Money Manager** is a personal finance tracking system that helps you manage monthly income, categorize expenses, and maintain a balanced budget. The application allows users to input their monthly salary and add detailed expenses, including items like groceries, utilities, fuel, and other home essentials. The system organizes these expenses into categories and provides detailed summaries, both as text and visual reports.

The project is built using **HTML**, **CSS**, and **JavaScript**, utilizing **localStorage** for data persistence.

## Features

- **Salary Input and Management**: Enter and track monthly salary with real-time updates on remaining balance based on entered expenses.
- **Expense Categorization**: Create and manage expense categories, such as "Food", "Fuel", and "Groceries", with subcategories for detailed tracking.
- **Detailed Expense Tracking**: Input items with details like quantity, cost, store name, and category. The system calculates total cost per item and overall expenses.
- **Summary and Reporting**: View monthly expenses in an easy-to-read summary with a detailed breakdown of categories and items.
- **PDF Export**: Generate and download a report of monthly expenses in PDF format using `jsPDF` and `autoTable` libraries.
- **Local Storage**: Saves all entered data (salary, categories, and expenses) using localStorage, ensuring persistence across browser sessions.
- **Data Reset**: Clear all stored data at the end of the month to reset for new entries.

## How to Use

1. **Enter Monthly Salary**:
   - Enter your salary in the input field and save it to start tracking.
   - The remaining balance will be updated automatically as expenses are added.

2. **Add Categories**:
   - Navigate to the "Categories" section and add new categories for better expense organization.
   - View or hide the list of categories, which can be selected when adding expenses.

3. **Add Expenses**:
   - Input expense details including item name, quantity, cost, and store, and select the appropriate category.
   - The system will calculate the total cost and display it in a summary table.
   - Individual expenses can be deleted from the summary table as needed.

4. **Generate PDF Report**:
   - View your expenses in the summary section and export them as a PDF for record-keeping or printing.

5. **Clear All Data**:
   - Use the "Clear All" button to reset the app, deleting all stored salary, categories, and expenses from localStorage.

## Technologies Used

- **HTML**: For structuring the web page and forms.
- **CSS**: For styling the user interface, focusing on clean, modern design with rounded edges and soft colors.
- **JavaScript**: Core functionality, including form handling, calculations, and interaction with localStorage.
- **localStorage**: For saving and persisting salary, categories, and expenses data.
- **jsPDF & autoTable**: For generating a downloadable PDF report of the expense summary.

## Dependencies

- **jsPDF**: For generating PDF files from the browser.
- **autoTable (jsPDF plugin)**: Used for generating tables inside the PDF reports.

These libraries are included via CDN, so no further installation is required.

## Future Enhancements

1. **Expense Analytics**: Add charts and graphs to visualize expense trends over time (e.g., pie charts for categories, bar charts for month comparisons).
2. **Expense History**: Track expense history across multiple months, enabling comparison and trend analysis.
3. **Search and Sort**: Implement search functionality and sorting options to filter expenses by item, store, category, or cost.
4. **User Interface Enhancements**: Improve the UI with more responsive design for better usability across devices.

## Acknowledgments

This project was assisted by **ChatGPT**, which helped in generating code and providing guidance throughout the development process.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use and modify the code as per the terms of the license.

---

Developed by **Ziad Masoud**. https://ziadmasoud.github.io/Home-Money-Manager/
