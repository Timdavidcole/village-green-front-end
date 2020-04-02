const throttle = (func, limit) => {
  const scrollThreshold = 80;
  let inThrottle = false;
  console.log("CREATE THROTTLE")
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
    }
  };
};

export default throttle;
