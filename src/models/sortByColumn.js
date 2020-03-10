const sortByColumn = function(notices, columnHeight, loggedIn) {
  var newNotices;
  console.log('SORT BY COLUMN')


  loggedIn ? (newNotices = [[{ height: 229 }]]) : (newNotices = [[]]);

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
      newNotices[column].push(notice1);
      usedIndexes.push(index1);
    } else if (!findNoticeThatFits(column)) {
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
        newNotices[column].push(notice2);
        usedIndexes.push(index2);
        return true;
      }
      return false;
    });
  }

  function columnRemainder(column) {
    return columnHeight - sumHeights(newNotices[column]);
  }

  notices.forEach((notice, index) => {
    findColumnWithSpace(notice, columnWithRoom, index);
  });

  if (loggedIn) {
    newNotices[0].splice(0, 1);
  }
  return newNotices.flat();
};

export default sortByColumn;
