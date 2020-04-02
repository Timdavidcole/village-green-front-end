const throttle = (func, limit) => {
  const scrollThreshold = 80;
  let inThrottle = false;
  return function() {
    const args = arguments;
    const context = this;
    if (
      !inThrottle &&
      (args[0].deltaY > scrollThreshold || args[0].deltaY < -scrollThreshold)
    ) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    } else {
    }
  };
};

export default throttle;
