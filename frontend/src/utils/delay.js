export const delay = (ms = 15000) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, ms);
});
