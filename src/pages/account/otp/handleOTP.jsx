export function handleOTP(state, action) {
  const { event, id, ref } = action;
  switch (action.type) {
    case "onChange":
      return handleChange(event, id, state, ref);
    case "onBackspace":
      return handleKeyBack(event, id, state, ref);
    case "onPaste":
      return handlePaste(event, state, ref);
    default:
      return state;
  }
}

function handleChange(event, id, state, ref) {
  const target = event.target;
  if (!/[A-Za-z0-9]/.test(target.value)) return state;

  const update = state.map((item) =>
    item.index === id ? { ...item, value: target.value } : item
  );
  if (target.value && id < state.length - 1) {
    ref.current[id + 1]?.focus();
  }
  return update;
}

function handleKeyBack(event, id, state, ref) {
  if (event.key === "Backspace") {
    if (state[id].value) {
      return state.map((item) =>
        item.index === id ? { ...item, value: "" } : item
      );
    } else if (id > 0) {
      ref.current[id - 1].focus();
    }
  }
  return state;
}

function handlePaste(event, state, ref) {
  const data = event.clipboardData.getData("text/plain");
  if (!/[A-Za-z0-9]/.test(data)) return state;

  // Split into three
  let numArr = [];
  for (let i = 0; i < data.length; i++) {
    if (i >= 6) break;
    numArr.push(data[i]);
  }

  // Updating state
  const update = state.map((item, index) => ({
    ...item,
    value: numArr[index] || "",
  }));

  // run this function then switch to event loop
  setTimeout(() => {
    const nextIndex = numArr.length === 6 ? numArr.length - 1 : numArr.length;
    ref.current[nextIndex]?.focus();
  }, 0);

  // Return new State
  return update;
}
