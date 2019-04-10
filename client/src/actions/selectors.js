import { createSelector } from 'reselect';

const getAllExpenses = state => state.expensesApp.expenses;
const getFilters = state => state.expensesApp.filters;

export const getExpenses = createSelector(
  [getAllExpenses, getFilters],
  (expenses, filters) => {
    const order = filters.order;
    const from = filters.from.getTime();
    const to = filters.to.getTime();
    const FilteredExpenses = expenses.filter(expense => {
      return from <= expense.date.getTime() && expense.date.getTime() <= to;
    });
    switch (order) {
      case 'NEW_FIRST':
        return FilteredExpenses.sort(
          (a, b) => b.date.getTime() - a.date.getTime()
        );
      default:
        return FilteredExpenses;
    }
  }
);

export const groupByDate = expenses =>
  expenses.reduce((acc, expense) => {
    const date = expense.date.toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(expense);
    return acc;
  }, {});
