const sortByColumn = function(notices, noticesDims, loggedIn, newNotice) {
  var newNotices;
  console.log("SORT BY COLUMN");
  if (newNotice) {
    var firstNotice = notices[0];
    firstNotice.order = 1;
  }

  var usedIndexes = [];
  const margin = 20;
  var columnWithRoom = 0;

  if (loggedIn) {
    if (newNotice) {
      console.log("NEW NOTICES WITH FIRST NOTICE");
      newNotices = [[{ height: 250 }, firstNotice]];
      usedIndexes.push(0);
    } else {
      newNotices = [[{ height: 250 }]];
    }
  } else {
    newNotices = [[]];
  }

  console.log(newNotices)

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
    if (newNotice && index === 0) {
      console.log("FIRSTNOTICE");
      console.log(newNotices)
      return null;
    } else {
      console.log(index)
      findColumnWithSpace(notice, columnWithRoom, index);
      console.log(newNotices)
    }
  });

  function maxColumns() {
    return noticesDims.width / 250;
  }

  if (loggedIn) {
    newNotices[0].splice(0, 1);
  }

  console.log(newNotices);
  return newNotices.slice(0, Math.floor(maxColumns())).flat();
};

export default sortByColumn;
