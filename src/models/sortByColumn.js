import sumHeights from "./sumHeights";

const sortByColumn = function(notices, noticesWindowDims, newNotice) {
  let sortedByColumn = [[]];
  let usedIndexes = [];
  const margin = notice => (notice.image ? 0 : 20);
  let columnWithRoom = 0;
  const noticesToSort = [...notices];
  const maxHeight = noticesWindowDims.height - 125;

  if (newNotice) {
    var firstNotice = { ...notices[0] };
    firstNotice.order = columnWithRoom + 1;
    sortedByColumn = [[firstNotice]];
  }

  function findColumnWithSpace(notice1, column, index1) {
    var nextColumn;
    if (usedIndexes.includes(index1)) {
      return true;
    }
    if (columnRemainder(column) - (notice1.height + margin(notice1)) > 0) {
      notice1.order = column + 1;
      sortedByColumn[column].push(notice1);
      usedIndexes.push(index1);
    } else if (!findNoticeThatFits(column)) {
      notice1.order = column + 2;
      sortedByColumn.push([notice1]);
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
        sortedByColumn[column].push(notice2);
        usedIndexes.push(index2);
        return true;
      }
      return false;
    });
  }

  function columnRemainder(column) {
    return maxHeight - sumHeights(sortedByColumn[column]);
  }

  noticesToSort.forEach((notice, index) => {
    if (newNotice && index === 0) {
      usedIndexes.push(0);
    } else {
      findColumnWithSpace(notice, columnWithRoom, index);
    }
  });

  function flatten(array) {
    return array.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
      );
    }, []);
  }

  sortedByColumn = flatten(sortedByColumn)
  
  console.log(sortedByColumn)
  return sortedByColumn;
};

export default sortByColumn;
