const request = require("supertest");
const api = require("../src/api");

const firstMessage = "Hello there! 😃 Does this work? 😉";
const secondMessage = "This is a message without any emojis in it.";

describe("emoji-picker API", () => {
  test("it should be able to store and retrieve messages", () => {
    return request(api)
      .post("/messages")
      .send({ message: firstMessage })
      .then(response => {
        expect(response.statusCode).toBe(200);
        return request(api)
          .post("/messages")
          .send({ message: secondMessage });
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        return request(api).get("/messages/");
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        const parsedResponse = JSON.parse(response.res.text);
        expect(parsedResponse.length).toEqual(2);
        expect(parsedResponse).toContain(firstMessage);
        expect(parsedResponse).toContain(secondMessage);
      });
  });
});
