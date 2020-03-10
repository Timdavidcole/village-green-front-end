const sortByHeight = function(notices) {
  console.log('SORT BY HEIGHT')
  function compareHeights(noticeHeightA, noticeHeightB) {

    if (noticeHeightA.height === noticeHeightB.height) {
      return 0;
    } else return noticeHeightA.height > noticeHeightB.height ? -1 : 1;
  }
  return notices.sort(compareHeights);
};

export default sortByHeight