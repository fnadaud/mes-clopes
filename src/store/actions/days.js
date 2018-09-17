const update = (day) => {
  const action = { type: "UPDATE_DAY", value: day }
  return action;
};

const setLast7Days = (last7days) => {
  const action = { type: "SET_LAST_7_DAYS", value: last7days }
  return action;
};

export default { update, setLast7Days };