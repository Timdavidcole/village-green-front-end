const sortByColumn = function(notices, noticesDims, loggedIn, newNotice) {
  let newNotices = [[]];
  let usedIndexes = [];
  const margin = notice => (notice.image ? 20 : 0);
  let columnWithRoom = 0;
  const noticesToSort = [...notices];
  let sortedNotices = [];
  let freePage = 0;
  const maxColumns = Math.floor(noticesDims.width / 250);
  const maxHeight = noticesDims.height - 100;



  if (newNotice) {
    var firstNotice = { ...notices[0] };
    firstNotice.order = columnWithRoom + 1;
    newNotices = [[firstNotice]];
  }

  function sumHeights(noticesToSum) {
    var sum = 0;
    noticesToSum.forEach(notice => {
      if (notice.height) {
        sum += notice.height + margin(notice);
      }
    });
    return sum;
  }

  function findColumnWithSpace(notice1, column, index1) {
    var nextColumn;
    if (usedIndexes.includes(index1)) {
      return true;
    }
    if (columnRemainder(column) - (notice1.height + margin(notice1)) > 0) {
      notice1.order = column + 1;

      newNotices[column].push(notice1);
      usedIndexes.push(index1);
    } else if (!findNoticeThatFits(column)) {
      notice1.order = column + 2;
      newNotices.push([notice1]);
      usedIndexes.push(index1);
      nextColumn = column;
      columnWithRoom++;
    } else {
      nextColumn = column + 1;
      findColumnWithSpace(notice1, nextColumn);
    }
  }

  function findNoticeThatFits(column) {
    notices.some((notice2, index2) => {
      if (
        columnRemainder(column) - (notice2.height + margin(notice2)) > 0 &&
        !usedIndexes.includes(index2)
      ) {
        notice2.order = column + 1;
        newNotices[column].push(notice2);
        usedIndexes.push(index2);
        return true;
      }
      return false;
    });
  }

  function columnRemainder(column) {
    return maxHeight - sumHeights(newNotices[column]);
  }

  noticesToSort.forEach((notice, index) => {
    if (newNotice && index === 0) {
      return null;
    } else {
      findColumnWithSpace(notice, columnWithRoom, index);
    }
  });
  console.log(maxHeight)

  const sortByPage = function(noticesInColumns) {
    noticesInColumns.forEach(noticeColumn => {
      if (!sortedNotices[freePage]) {
        sortedNotices.push([]);
      }
      if (sumHeights(noticeColumn) > (maxHeight) / 3) {
        if (sortedNotices[freePage].length < maxColumns) {
          sortedNotices[freePage].push(noticeColumn);
        } else {
          sortedNotices.push([]);
          freePage++;
          sortedNotices[freePage].push(noticeColumn);
        }
      }
    });

    sortedNotices = sortedNotices.map(page => {
      return page.flat();
    });
  };

  sortByPage(newNotices);
  return sortedNotices;
};

export default sortByColumn;
