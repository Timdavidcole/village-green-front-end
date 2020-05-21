import sumHeights from "./sumHeights";

const sortByColumn = function (
  notices,
  noticesWindowDims,
  newNotice,
  noticeWidth
) {
  let sortedByColumn = [];
  let usedIndexes = [];
  const margin = (notice) => (notice.image ? 0 : 20);
  let columnWithRoom = 0;
  const noticesToSort = [...notices];
  const maxHeight = noticesWindowDims.height - 125;
  const maxColumns = Math.floor(noticesWindowDims.width / noticeWidth);
  let maxHeights = [];

  for (let step = 0; step < maxColumns; step++) {
    maxHeights.push(maxHeight);
    sortedByColumn.push([]);
  }

  if (newNotice) {
    var firstNotice = { ...notices[0] };
    sortedByColumn[0] = [firstNotice];
  }

  function changeColumnWithRoom() {
    if (columnWithRoom < maxColumns - 1) {
      columnWithRoom++;
    } else columnWithRoom = 0;
    return columnWithRoom;
  }

  function findColumnWithSpace(notice, column, index) {
    if (usedIndexes.includes(index)) {
      return true;
    }
    if (columnRemainder(column) - (notice.height + margin(notice)) > 0) {
      sortedByColumn[column].push(notice);
      usedIndexes.push(index);
    } else if (!findNoticeThatFits(column)) {
      maxHeights[column] = maxHeights[column] + maxHeight;
      sortedByColumn[changeColumnWithRoom()].push(notice);
      usedIndexes.push(index);
    } else {
      findColumnWithSpace(notice, changeColumnWithRoom());
    }
  }

  function findNoticeThatFits(column) {
    notices.some((notice, index) => {
      if (
        columnRemainder(column) - (notice.height + margin(notice)) > 0 &&
        !usedIndexes.includes(index)
      ) {
        sortedByColumn[column].push(notice);
        usedIndexes.push(index);
        return true;
      }
      return false;
    });
  }

  function columnRemainder(column) {
    return maxHeights[column] - sumHeights(sortedByColumn[column]);
  }

  noticesToSort.forEach((notice, index) => {
    if (newNotice && index === 0) {
      usedIndexes.push(0);
    } else {
      findColumnWithSpace(notice, columnWithRoom, index);
    }
  });

  return sortedByColumn;
};

export default sortByColumn;
