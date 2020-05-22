import sumHeights from "./sumHeights";

const sortByPage = function(noticesInColumns, windowDims, noticeWidth) {
  let sortedByPage = [];
  let freePage = 0;
  const maxHeight = windowDims.height - 90;
  const maxColumns = Math.floor(windowDims.width / noticeWidth);

  noticesInColumns.forEach(noticeColumn => {
    if (!sortedByPage[freePage]) {
      sortedByPage.push([]);
    }
    if (sumHeights(noticeColumn) > maxHeight / 3) {
      if (sortedByPage[freePage].length < maxColumns) {
        sortedByPage[freePage].push(noticeColumn);
      } else {
        sortedByPage.push([]);
        freePage++;
        sortedByPage[freePage].push(noticeColumn);
      }
    }
  });

  function flatten(array) {
    return array.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
      );
    }, []);
  }

  sortedByPage = sortedByPage.map(page => {
    return flatten(page);
  });

  return sortedByPage;
};

export default sortByPage;
