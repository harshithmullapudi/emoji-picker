const search = require("../src/search");

test("searching for the string 'smiley' should return only two emojis", () => {
  const matchingEmojis = search("smiley");
  expect(matchingEmojis).toEqual([
    { name: "smiley", emoji: "😃" },
    { name: "smiley_cat", emoji: "😺" }
  ]);
});

test("searching for an emoji that doesn't exist should return an empty array", () => {
  const matchingEmojis = search("there_is_no_such_emoji");
  expect(matchingEmojis).toEqual([]);
});
