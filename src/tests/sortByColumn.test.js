import sortByColumn from "../models/sortByColumn";

const noticesWindowDims = { height: 45, width: 60 };

const heightSortedNotices = [
  { height: 40, image: true },
  { height: 30, image: true },
  { height: 20, image: true },
  { height: 20, image: false },
  { height: 10, image: false },
  { height: 10, image: true },
  { height: 5, image: false },
  { height: 5, image: false }
];

const newNotice = { height: 6, image: true };

const heightSortedNoticesWithNewNotice = [
  newNotice,
  { height: 40, image: true },
  { height: 30, image: true },
  { height: 20, image: true },
  { height: 20, image: false },
  { height: 10, image: false },
  { height: 10, image: true },
  { height: 5, image: false },
  { height: 5, image: false }
];

const sortedNotices = [{ height: 20 }, { height: 10 }, { height: 5 }];
const sortedNoticesWithNewNotice = [
  newNotice,
  { height: 20 },
  { height: 10 },
  { height: 5 }
];

describe("sortByColumn()", () => {
  it("should return an array of objects arranged into columns in height order", () => {
    expect(sortByColumn(heightSortedNotices, noticesWindowDims, null)).toEqual('test');
  });
});
