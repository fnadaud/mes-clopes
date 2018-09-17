const defaultState = {
  last7Days: [],
  years: [],
};

export default days = (state = defaultState, action) => {
  let nextState = {};
  switch (action.type) {
    case 'SET_LAST_7_DAYS':
      let last7Days = action.value;
      last7Days.forEach(day => {
        let found = false;
        const indexYear = state.years.findIndex(item => item.year === day.year);
        if (indexYear !== -1) {
          const indexMonth = state.years[indexYear].months.findIndex(item => item.month === day.month);
          if (indexMonth !== -1){
            for (let i = 0; i < state.years[indexYear].months[indexMonth].days.length; i++){
              let item = state.years[indexYear].months[indexMonth].days[i];
              if (item.day === day.day){
                day.counter = item.counter;
                found = true;
                break;
              }
            }
          }
        }
        if(!found)
          day.counter = 0;
      });
      nextState = { last7Days }
      return { ...state, ...nextState }

    case 'UPDATE_DAY': 
      const day = action.value;
      const indexYear = state.years.findIndex(item => item.year === day.year);

      if (indexYear !== -1) {
        const indexMonth = state.years[indexYear].months.findIndex(item => item.month === day.month);
        let newMonth;
        
        if (indexMonth !== -1){
          const indexDay = state.years[indexYear].months[indexMonth].days.findIndex(item => item.day === day.day);
          if(indexDay !== -1)
            state.years[indexYear].months[indexMonth].days.splice(indexDay, 1);
          if (day.counter === 0) {
            newMonth = {
              month: day.month,
              days: [...state.years[indexYear].months[indexMonth].days]
            };
          } else {
            newMonth = {
              month: day.month,
              days: [...state.years[indexYear].months[indexMonth].days, day]
            };
          }

          state.years[indexYear].months.splice(indexMonth, 1);
        } else {
          newMonth = {
            month: day.month,
            days: [day]
          };          
        }

        let newYear;
        if(newMonth.days.length === 0){
          newYear = {
            year: day.year,
            months: [...state.years[indexYear].months]
          };
        } else {
          newYear = {
            year: day.year,
            months: [...state.years[indexYear].months, newMonth]
          };
        }

        state.years.splice(indexYear, 1);

        if(newYear.months.length === 0){
          nextState = {
            years: [...state.years]
          }
        } else {
          nextState = {
            years: [...state.years, newYear]
          }
        }
      } else {
        const newYear = {
          year: day.year,
          months: [{
            month: day.month,
            days: [day]
          }]
        };

        nextState = {
          years: [...state.years, newYear]
        }
      }
      console.log("nextState", nextState);
      return { ...state, ...nextState }
    default:
      return state
  }
}