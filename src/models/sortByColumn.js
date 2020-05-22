import sumHeights from "./sumHeights";

const sortByColumn = function (
  notices,
  windowDims,
  newNotice,
  noticeWidth
) {
  let sortedByColumn = [];
  let usedIndexes = [];
  let columnWithRoom = 0;
  const noticesToSort = [...notices];
  const maxHeight = windowDims.height - 125;
  const maxColumns = Math.floor(windowDims.width / noticeWidth);
  let maxHeights = [];

  const margin = (notice) => (notice.image ? 0 : 20);

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
      changeColumnWithRoom();
    } else {
      findNoticeThatFits(column);
      maxHeights[column] = maxHeights[column] + maxHeight;
      findColumnWithSpace(notice, changeColumnWithRoom());
    }
  }

  function findNoticeThatFits(column) {
    notices.some((notice, index) => {
      if (
        columnRemainder(columnWithRoom) - (notice.height + margin(notice)) >
          0 &&
        !usedIndexes.includes(index)
      ) {
        sortedByColumn[column].push(notice);
        usedIndexes.push(index);
        findNoticeThatFits(column);
        return true;
      }
      return false;
    });
  }

  function columnRemainder(column) {
    return maxHeights[column] - sumHeights(sortedByColumn[column]);
  }

  for (let step = 0; step < maxColumns; step++) {
    maxHeights.push(maxHeight);
    sortedByColumn.push([]);
  }

  if (newNotice) {
    var firstNotice = { ...notices[0] };
    sortedByColumn[0] = [firstNotice];
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
