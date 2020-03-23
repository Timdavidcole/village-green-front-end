import sortByPage from "../models/sortByPage";

const noticesWindowDims = { height: 600, width: 1000 };
const noticesWindowDims2 = { height: 800, width: 1200 };

const columnSortedNotices = [
  [{ height: 450, image: true, order: 1 }],
  [
    { height: 350, image: true, order: 2 },
    { height: 100, image: true, order: 2 }
  ],
  [
    { height: 250, image: true, order: 3 },
    { height: 150, image: false, order: 3 }
  ],
  [
    { height: 250, image: false, order: 4 },
    { height: 50, image: false, order: 4 },
    { height: 50, image: false, order: 4 }
  ]
];

const pageSortedNotices = [
  [
    { height: 450, image: true, order: 1 },
    { height: 350, image: true, order: 2 },
    { height: 100, image: true, order: 2 }
  ],
  [
    { height: 250, image: true, order: 3 },
    { height: 150, image: false, order: 3 },
    { height: 250, image: false, order: 4 },
    { height: 50, image: false, order: 4 },
    { height: 50, image: false, order: 4 }
  ]
];

const pageSortedNoticesDifWidth = [
  [
    { height: 450, image: true, order: 1 },
    { height: 350, image: true, order: 2 },
    { height: 100, image: true, order: 2 },
    { height: 250, image: true, order: 3 },
    { height: 150, image: false, order: 3 },
    { height: 250, image: false, order: 4 },
    { height: 50, image: false, order: 4 },
    { height: 50, image: false, order: 4 }
  ]
];

const pageSortedNoticesDifWindow = [
  [
    { height: 450, image: true, order: 1 },
    { height: 350, image: true, order: 2 },
    { height: 100, image: true, order: 2 },
    { height: 250, image: true, order: 3 },
    { height: 150, image: false, order: 3 }
  ],
  [
    { height: 250, image: false, order: 4 },
    { height: 50, image: false, order: 4 },
    { height: 50, image: false, order: 4 }
  ]
];

describe("sortByPage()", () => {
  it("should return an array of notices arranged into pages", () => {
    expect(sortByPage(columnSortedNotices, noticesWindowDims, 400)).toEqual(
      pageSortedNotices
    );
  });

  it("should return an array of notices arranged into different pages if different notice width is used", () => {
    expect(sortByPage(columnSortedNotices, noticesWindowDims, 200)).not.toBe(
      pageSortedNotices
    );
    expect(sortByPage(columnSortedNotices, noticesWindowDims, 200)).toEqual(
      pageSortedNoticesDifWidth
    );
  });

  it("should return an array of notices arranged into different pages if different window width is used", () => {
    expect(sortByPage(columnSortedNotices, noticesWindowDims2, 400)).not.toBe(
      pageSortedNotices
    );
    expect(sortByPage(columnSortedNotices, noticesWindowDims2, 400)).toEqual(
      pageSortedNoticesDifWindow
    );
  });
});
