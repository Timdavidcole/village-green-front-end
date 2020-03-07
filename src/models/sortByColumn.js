const sortByColumn = function(notices, columnHeight) {
  var newNotices = [[{ height: 229 }]];
  var columnIndex = 0;
  var oldNotices = [];

  notices.forEach(element => {
    console.log(element)
    oldNotices.push(element);
  });

  console.log(notices);
  console.log(oldNotices);

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
    console.log(notices);
    console.log(oldNotices);

    if (!newNotices[columnIndex]) {
      newNotices.push([]);
    }
    console.log(columnIndex);
    var sumHeight = sumHeights(newNotices[columnIndex]);
    var columnRemainder = columnHeight - sumHeight;
    if (columnRemainder >= notice.height) {
      newNotices[columnIndex].push(notice);
      oldNotices.splice(index, 1);
    } else {
      oldNotices.some((noticeNew, indexNew) => {
        if (columnRemainder >= noticeNew.height) {
          newNotices[columnIndex].push(noticeNew);
          oldNotices.splice(indexNew, 1);
          return true;
        }
      });
    }
    sumHeight = sumHeights(newNotices[columnIndex]);
    columnRemainder = columnHeight - sumHeight;
    console.log(newNotices[columnIndex]);
    console.log(sumHeight);
    console.log(columnRemainder);
    console.log(oldNotices[oldNotices.length - 1]);
    if (columnRemainder < oldNotices[oldNotices.length - 1].height) {
      columnIndex++;
    }
  });
  console.log(newNotices);

  newNotices[0].splice(0, 1);

  console.log(newNotices);
  return newNotices.flat();
};

export default sortByColumn;
