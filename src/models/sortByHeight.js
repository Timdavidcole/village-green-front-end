const sortByHeight = function(notices, newNotice) {
  console.log("SORT BY HEIGHT")
  const noticesHeight = [...notices];
  const newNotice1 = noticesHeight[0]
  if (newNotice) {
    noticesHeight.shift();
  }
  console.log(noticesHeight)
  function compareHeights(noticeHeightA, noticeHeightB) {
    if (noticeHeightA.height === noticeHeightB.height) {
      return 0;
    } else return noticeHeightA.height > noticeHeightB.height ? -1 : 1;
  }
  noticesHeight.sort(compareHeights);
  if (newNotice) {
    noticesHeight.unshift(newNotice1);
  }
  console.log(noticesHeight)
  return noticesHeight;
};

export default sortByHeight;
