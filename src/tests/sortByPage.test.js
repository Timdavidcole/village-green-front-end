import sortByPage from "../models/sortByPage";
  

const noticesWindowDims = { height: 600, width: 1000 };
const noticesWindowDims2 = { height: 800, width: 1200 };
const noticeWidth = 400

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
  
  const columnSortedNotices2 = [
    [
      { height: 450, image: true, order: 1 },
      { height: 250, image: true, order: 1 }
    ],
    [
      { height: 350, image: true, order: 2 },
      { height: 250, image: false, order: 2 },
      { height: 50, image: false, order: 2 }
    ],
    [
      { height: 150, image: false, order: 3 },
      { height: 100, image: true, order: 3 },
      { height: 50, image: false, order: 3 }
    ]
  ];

describe("sortByPage()", () => {
  it("should return an array of columns arranged into pages", () => {
    expect(
      sortByPage(columnSortedNotices, noticesWindowDims, noticeWidth)
    ).toEqual("test");
  });
});
