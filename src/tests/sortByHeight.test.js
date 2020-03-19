import sortByHeight from "../models/sortByHeight";

const unsortedNotices = [{ height: 10 }, { height: 5 }, { height: 20 }];

const newNotice = { height: 6 };
const unsortedNoticesWithNewNotice = [
  newNotice,
  { height: 10 },
  { height: 5 },
  { height: 20 }
];
const sortedNotices = [{ height: 20 }, { height: 10 }, { height: 5 }];
const sortedNoticesWithNewNotice = [
  newNotice,
  { height: 20 },
  { height: 10 },
  { height: 5 }
];

describe("sortByHeight()", () => {
  it("should return an array of objects in height order", () => {
    expect(sortByHeight(unsortedNotices)).toEqual(sortedNotices);
  });

  it("should return an sorted array but leave first Notice at start if a newNotice is present", () => {
    expect(sortByHeight(unsortedNoticesWithNewNotice, newNotice)).toEqual(
      sortedNoticesWithNewNotice
    );
  });
});
