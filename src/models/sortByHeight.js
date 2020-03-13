const sortByHeight = function(notices, newNotice) {
  const noticesHeight = [...notices];
  const newNotice1 = noticesHeight[0]
  if (newNotice) {
    noticesHeight.shift();
  }
  function compareHeights(noticeHeightA, noticeHeightB) {
    if (noticeHeightA.height === noticeHeightB.height) {
      return 0;
    } else return noticeHeightA.height > noticeHeightB.height ? -1 : 1;
  }
  noticesHeight.sort(compareHeights);
  if (newNotice) {
    noticesHeight.unshift(newNotice1);
  }
  return noticesHeight;
};

export default sortByHeight;
