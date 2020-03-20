import sumHeights from "../models/sumHeights";

const notices = [
  { height: 450, image: true },
  { height: 350, image: true },
  { height: 250, image: true },
  { height: 250, image: false },
  { height: 150, image: false },
  { height: 100, image: true },
  { height: 50, image: false },
  { height: 50, image: false }
];

describe("sumHeights()", () => {
  it("returns the sum of all the notice heights in array", () => {
    expect(sumHeights(notices)).toEqual(1730);
  });
});
