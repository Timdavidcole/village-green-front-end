const sortByHeight = function(notices) {
  console.log(notices)
  function compareHeights(noticeHeightA, noticeHeightB) {
    console.log(noticeHeightA.height)
    console.log(noticeHeightB.height)

    if (noticeHeightA.height === noticeHeightB.height) {
      return 0;
    } else return noticeHeightA.height > noticeHeightB.height ? -1 : 1;
  }
  console.log(notices.sort(compareHeights))
  return notices.sort(compareHeights);
};

export default sortByHeight