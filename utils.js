const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getViewportGrid = (cellSize) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const height = Math.floor(viewportHeight / cellSize);
  const width = Math.floor(viewportWidth / cellSize);

  return { height, width };
};

const debounce = (func, wait, immediate) => {
  let timeout;
  return () => {
    const context = this,
      args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
