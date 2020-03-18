const sumHeights = function(noticesToSum) {
  var sum = 0;
  noticesToSum.forEach(notice => {
    if (notice.height) {
      sum += notice.height + (notice.image ? 20 : 0);
    }
  });
  return sum;
};

export default sumHeights;
