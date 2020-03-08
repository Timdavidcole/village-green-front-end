const sortByColumn = function(notices, columnHeight, loggedIn) {
  var newNotices;
  console.log("SORT BY COLUMN");

  loggedIn ? (newNotices = [[{ height: 229 }]]) : (newNotices = [[]]);
  var columnIndex = 0;
  var oldNotices = [...notices];
  var usedIndexes = [];

  function sumHeights(notices) {
    var sum = 0;
    notices.forEach(notice => {
      if (notice.height) {
        sum += notice.height + 20;
      }
    });
    return sum;
  }
  oldNotices.forEach((notice, index) => {
    if (!newNotices[columnIndex]) {
      newNotices.push([]);
    }
    var sumHeight = sumHeights(newNotices[columnIndex]);
    var columnRemainder = columnHeight - sumHeight;
    if (
      (columnRemainder > notice.height + 20 && !usedIndexes.includes(index)) ||
      (columnHeight < notice.height + 20 && !usedIndexes.includes(index))
    ) {
      newNotices[columnIndex].push(notice);

      usedIndexes.push(index);
    } else {
      newNotices.push([notice]);
      usedIndexes.push(index);
      oldNotices.some((noticeNew, indexNew) => {
        if (
          (columnRemainder >= noticeNew.height + 20 &&
            !usedIndexes.includes(index)) ||
          columnHeight < noticeNew.height + 20
        ) {
          newNotices[columnIndex].push(noticeNew);
          usedIndexes.push(indexNew);
          return true;
        }
        return false;
      });
    }
    sumHeight = sumHeights(newNotices[columnIndex]);

    columnRemainder = columnHeight - sumHeight;
    if (columnRemainder < oldNotices[oldNotices.length - 1].height + 20) {
      columnIndex++;
    }
  });
  if (loggedIn) {
    newNotices[0].splice(0, 1);
  }
  console.log(newNotices.flat());
  return newNotices.flat();
};

export default sortByColumn;
