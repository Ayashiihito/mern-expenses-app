import { createSelector } from 'reselect';
//Import reselect for memoizing selects
//TODO: spend more time on it, probably it isn't needed in this case

const getAllExpenses = state => state.expensesApp.expenses;
const getFilters = state => state.expensesApp.filters;

export const getExpenses = createSelector(
  [getAllExpenses, getFilters],
  (expenses, filters) => {
    const order = filters.order;
    //get numeric representation of dates for comparison
    //TODO: check other ways to do it
    const from = filters.from.getTime();
    const to = filters.to.getTime();

    const FilteredExpenses = expenses.filter(expense => {
      return from <= expense.date.getTime() && expense.date.getTime() <= to;
    });

    switch (order) {
      //can implement "old first" in future
      case 'NEW_FIRST':
        return FilteredExpenses.sort(
          (a, b) => b.date.getTime() - a.date.getTime()
        );
      default:
        return FilteredExpenses;
    }
  }
);

// A helper function for grouping expenses by date
// Used for separating expenses in different "paper" elements in history
export const groupByDate = expenses =>
  expenses.reduce((acc, expense) => {
    const date = expense.date.toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(expense);
    return acc;
  }, {});
