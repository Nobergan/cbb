const randomMinMax = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min);
};

export { randomMinMax };
