import sortByColumn from "../models/sortByColumn";

const noticesWindowDims = { height: 500, width: 250 };
const noticesWindowDims2 = { height: 460, width: 250 };

const heightSortedNotices = [
  { height: 450, image: true },
  { height: 350, image: true },
  { height: 250, image: true },
  { height: 250, image: false },
  { height: 150, image: false },
  { height: 100, image: true },
  { height: 50, image: false },
  { height: 50, image: false }
];

const columnSortedNotices = [
  [{ height: 350, image: true, order: 1 }],
  [{ height: 450, image: true, order: 2 }],
  [
    { height: 250, image: true, order: 3 },
    { height: 100, image: true, order: 3 }
  ],
  [
    { height: 250, image: false, order: 4 },
    { height: 50, image: false, order: 4 }
  ],
  [
    { height: 150, image: false, order: 5 },
    { height: 50, image: false, order: 5 }
  ]
];

const columnSortedNotices2 = [
  [{ height: 350, image: true, order: 1 }],
  [{ height: 450, image: true, order: 2 }],
  [
    { height: 250, image: true, order: 3 },
    { height: 100, image: true, order: 3 }
  ],
  [
    { height: 250, image: false, order: 4 },
    { height: 50, image: false, order: 4 }
  ],
  [
    { height: 150, image: false, order: 5 },
    { height: 50, image: false, order: 5 }
  ]
];

const newNotice = { height: 280, image: true };

const heightSortedNoticesWithNewNotice = [
  newNotice,
  { height: 450, image: true },
  { height: 350, image: true },
  { height: 250, image: true },
  { height: 250, image: false },
  { height: 150, image: false },
  { height: 100, image: true },
  { height: 50, image: false },
  { height: 50, image: false }
];

const columnSortedNoticesWithNewNotice = [
  [
    { height: 280, image: true, order: 1 },
    { height: 100, image: true, order: 1 }
  ],
  [{ height: 450, image: true, order: 2 }],
  [{ height: 350, image: true, order: 3 }],
  [
    { height: 250, image: true, order: 4 },
    { height: 50, image: false, order: 4 }
  ],
  [
    { height: 250, image: false, order: 5 },
    { height: 50, image: false, order: 5 }
  ],
  [{ height: 150, image: false, order: 6 }]
];

describe("sortByColumn()", () => {
  it("should return an array of objects arranged into columns", () => {
    expect(sortByColumn(heightSortedNotices, noticesWindowDims, null)).toEqual(
      columnSortedNotices
    );
  });

  it("should return an array of objects arranged into different columns if window height is different", () => {
    expect(
      sortByColumn(heightSortedNotices, noticesWindowDims2, null)
    ).not.toBe(columnSortedNotices);
    expect(sortByColumn(heightSortedNotices, noticesWindowDims2, null)).toEqual(
      columnSortedNotices2
    );
  });

  it("should return an array of objects arranged into columns in height order with a new notice first", () => {
    expect(
      sortByColumn(heightSortedNoticesWithNewNotice, noticesWindowDims, null)
    ).toEqual(columnSortedNoticesWithNewNotice);
  });
});
