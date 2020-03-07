const sortByColumn = function(notices, columnHeight) {
  var newNotices = [[{ height: 229 }]];
  var columnIndex = 0;
  var oldNotices = [...notices];
  var usedIndexes = [];
  console.log(oldNotices)


  function sumHeights(notices) {
    var sum = 0;
    notices.forEach(notice => {
      if (notice.height) {
        sum += (notice.height + 20);
      }
    });
    return sum;
  }
  oldNotices.forEach((notice, index) => {
    console.log(notice)
    console.log(columnIndex)
    if (!newNotices[columnIndex]) {
      newNotices.push([]);
    }
    var sumHeight = sumHeights(newNotices[columnIndex]);
    var columnRemainder = columnHeight - sumHeight;
    if (
      (columnRemainder >= (notice.height + 20) && !usedIndexes.includes(index)) ||
      (columnHeight < (notice.height + 20) && !usedIndexes.includes(index))
    ) {
      newNotices[columnIndex].push(notice);
      console.log('PUSH TO NEW NOTICES 1')
      console.log(JSON.stringify(newNotices))

      usedIndexes.push(index);
    } else {
      newNotices.push([notice]);
      console.log('PUSH TO NEW NOTICES 3')
      console.log(JSON.stringify(newNotices))
      usedIndexes.push(index);
      oldNotices.some((noticeNew, indexNew) => {
        if (
          (columnRemainder >= (noticeNew.height + 20) &&
            !usedIndexes.includes(index)) ||
          columnHeight < (noticeNew.height + 20)
        ) {
          newNotices[columnIndex].push(noticeNew);
          console.log('PUSH TO NEW NOTICES 2')
          console.log(JSON.stringify(newNotices))
          usedIndexes.push(indexNew);
          return true;
        }
      });
    }
    sumHeight = sumHeights(newNotices[columnIndex]);

    columnRemainder = columnHeight - sumHeight;
    if (columnRemainder < (oldNotices[oldNotices.length - 1].height + 20)) {
      columnIndex++;
    }
  });
  console.log(usedIndexes)
  newNotices[0].splice(0, 1);
  console.log(newNotices)
  return newNotices.flat();
};

export default sortByColumn;
