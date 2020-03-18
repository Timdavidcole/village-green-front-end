import sumHeights from "./sumHeights";

const sortByPage = function(noticesInColumns, noticesDims, noticeWidth) {
  let sortedByPage = [];
  let freePage = 0;
  const maxHeight = noticesDims.height - 100;
  const maxColumns = Math.floor(noticesDims.width / noticeWidth);

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

  sortedByPage = sortedByPage.map(page => {
    return page.flat();
  });

  return sortedByPage;
};

export default sortByPage;
