const sortByColumn = function(notices, columnHeight) {
  var newNotices = [[{ height: 229 }]];
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
    if (columnRemainder >= notice.height && !usedIndexes.includes(index)) {
      newNotices[columnIndex].push(notice);
      usedIndexes.push(index);
    } else {
      oldNotices.some((noticeNew, indexNew) => {
        if (
          columnRemainder >= noticeNew.height &&
          !usedIndexes.includes(index)
        ) {
          newNotices[columnIndex].push(noticeNew);
          usedIndexes.push(indexNew);
          return true;
        }
      });
    }
    sumHeight = sumHeights(newNotices[columnIndex]);
    columnRemainder = columnHeight - sumHeight;

    if (columnRemainder < oldNotices[oldNotices.length - 1].height) {
      columnIndex++;
    }
  });

  newNotices[0].splice(0, 1);
  return newNotices.flat();
};

export default sortByColumn;
