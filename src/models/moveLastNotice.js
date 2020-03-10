const moveLastNotice = function(notices, index) {
  var newNotices = [...notices];
  console.log(newNotices)
  if (!newNotices[index + 1]) {
    var newNoticeArray = [];
    newNoticeArray.push(newNotices[index].pop());
    newNotices.push(newNoticeArray);
    console.log(newNotices)
    return newNotices;
  } else {
    newNotices[index + 1].push(newNotices[index].pop());
    return newNotices;
  }
};

export default moveLastNotice;
