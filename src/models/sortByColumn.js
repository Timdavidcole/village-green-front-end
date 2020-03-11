const sortByColumn = function(notices, noticesDims, loggedIn) {
  var newNotices;
  console.log("SORT BY COLUMN");
  console.log(noticesDims)

  loggedIn ? (newNotices = [[{ height: 250 }]]) : (newNotices = [[]]);

  var usedIndexes = [];
  const margin = 20;
  var columnWithRoom = 0;

  function sumHeights(noticesToSum) {
    var sum = 0;
    noticesToSum.forEach(notice => {
      if (notice.height) {
        sum += notice.height + margin;
      }
    });
    return sum;
  }

  function findColumnWithSpace(notice1, column, index1) {
    var nextColumn;
    if (usedIndexes.includes(index1)) {
      return true;
    }

    if (columnRemainder(column) - (notice1.height + margin) > 0) {
      notice1.order = column + 1;
      newNotices[column].push(notice1);
      usedIndexes.push(index1);
    } else if (!findNoticeThatFits(column)) {
      notice1.order = column + 2;
      newNotices.push([notice1]);
      usedIndexes.push(index1);
      nextColumn = column + 1;
      columnWithRoom++;
    } else {
      nextColumn = column + 1;
      findColumnWithSpace(notice1, nextColumn);
    }
  }

  function findNoticeThatFits(column) {
    notices.some((notice2, index2) => {
      if (
        columnRemainder(column) - (notice2.height + margin) > 0 &&
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
    return noticesDims.height - sumHeights(newNotices[column]);
  }

  notices.forEach((notice, index) => {
    findColumnWithSpace(notice, columnWithRoom, index);
  });

  function maxColumns() {
    return noticesDims.width / 250;
  }

  if (loggedIn) {
    newNotices[0].splice(0, 1);
  }
  console.log(maxColumns());

  console.log(Math.floor(maxColumns()));
  return newNotices.slice(0, Math.floor(maxColumns())).flat();
};

export default sortByColumn;
