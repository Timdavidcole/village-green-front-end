const sortByColumn = function(notices, noticesDims, loggedIn, newNotice) {
  var newNotices;
  var usedIndexes = [];
  const margin = notice => (notice.image ? 20 : 0);
  var columnWithRoom = 0;
  const noticesToSort = [...notices]

  if (newNotice) {
    var firstNotice = {...notices[0]};
    firstNotice.order = columnWithRoom + 1;
  }
  if (loggedIn) {
    if (newNotice) {
      newNotices = [[{ height: 250 }, firstNotice]];
      usedIndexes.push(0);
    } else {
      newNotices = [[{ height: 250 }]];
    }
  } else {
    newNotices = [[]];
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
    return noticesDims.height - sumHeights(newNotices[column]);
  }

  noticesToSort.forEach((notice, index) => {

    if (newNotice && index === 0) {
      return null;
    } else {
      findColumnWithSpace(notice, columnWithRoom, index);
    }
  });

  function maxColumns() {
    return noticesDims.width / 250;
  }

  if (loggedIn) {
    newNotices[0].splice(0, 1);
  }

  if (sumHeights(newNotices[newNotices.length - 1]) < noticesDims.height / 2) {
    newNotices.splice(newNotices.length - 1, 1);
  }

  var noticesFirstPage = newNotices.slice(0, Math.floor(maxColumns())).flat();
  var noticesSecondPage = newNotices.flat();

  return [[...noticesFirstPage], [...noticesSecondPage]]


};

export default sortByColumn;
