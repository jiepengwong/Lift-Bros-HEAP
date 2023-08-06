let globalTimerId = null;

export const startGlobalTimer = (callback, delay) => {
    console.log("in global timer", delay)
  globalTimerId = setTimeout(callback, delay);
};

export const clearGlobalTimer = () => {
  if (globalTimerId !== null) {
    clearTimeout(globalTimerId);
    globalTimerId = null;
  }
};
