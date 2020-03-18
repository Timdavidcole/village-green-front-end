import sumHeights from "./sumHeights";

const sortByPage = function(noticesInColumns, noticesDims, noticeWidth) {
  let sortedByPage = [];
  let freePage = 0;
  const maxHeight = noticesDims.height - 100;
  const maxColumns = Math.floor(noticesDims.width / noticeWidth);

  noticesInColumns.forEach(noticeColumn => {
    if (!sortedByPage[freePage]) {
      console.log("make new page");
      sortedByPage.push([]);
    }
    if (sumHeights(noticeColumn) > maxHeight / 3) {
      if (sortedByPage[freePage].length < maxColumns) {
        sortedByPage[freePage].push(noticeColumn);
        console.log("push column to page");
      } else {
        console.log("page full, creating new one");
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
