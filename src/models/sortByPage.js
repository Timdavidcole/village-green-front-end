import sumHeights from "./sumHeights";

const sortByPage = function(noticesInColumns, noticesDims, noticeWidth) {
  let sortedByPage = [];
  let freePage = 0;
  const maxHeight = noticesDims.height - 90;
  const maxColumns = Math.floor(noticesDims.width / noticeWidth);
  console.log(noticesInColumns)
  noticesInColumns.forEach(noticeColumn => {
    if (!sortedByPage[freePage]) {
      console.log('push new array')
      sortedByPage.push([]);
    }
    if (sumHeights(noticeColumn) > maxHeight / 3) {
      if (sortedByPage[freePage].length < maxColumns) {
        console.log(sortedByPage)
        console.log(noticeColumn)
        sortedByPage[freePage].push(noticeColumn);
        console.log(sortedByPage)
      } else {
        sortedByPage.push([]);
        freePage++;
        sortedByPage[freePage].push(noticeColumn);
        console.log(sortedByPage)
      }
    }
  });

  console.log(sortedByPage)
  sortedByPage = sortedByPage.map(page => {
    console.log(page)
    return page.flat();
  });

  return sortedByPage;
};

export default sortByPage;
