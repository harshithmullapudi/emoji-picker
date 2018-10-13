describe("Emoji Picker", () => {
  const message = "This is a test message";
  const appURL = "http://localhost:3001";
  const enterKey = "{enter}";
  const emojiSmile = " :sm";
  const emojiWink = " :wi";

  it("can store and retrieve a simple message", () => {
    cy.visit(appURL);
    cy.get("#app__message-box-input").type(message);
    cy.get("#app__message-box-input").type(enterKey);
    cy.get(".app__message")
      .invoke("text")
      .should("contain", message);
  });

  it("can store and retrieve a message with one emoji", () => {
    cy.visit(appURL);
    cy.get("#app__message-box-input").type(message);
    cy.get("#app__message-box-input").type(emojiSmile);
    cy.get(".app__emoji-select-button")
      .contains("😄")
      .click();
    cy.get("#app__message-box-input").type(enterKey);
    cy.get(".app__message")
      .invoke("text")
      .should("contain", message + " 😄");
  });

  it("can store and retrieve messages with more than one emoji", () => {
    const secondMessage = "Second message";

    cy.visit(appURL);
    cy.get("#app__message-box-input").type(message);
    cy.get("#app__message-box-input").type(emojiSmile);
    cy.get(".app__emoji-select-button")
      .contains("😄")
      .click();
    cy.get("#app__message-box-input").type(secondMessage);
    cy.get("#app__message-box-input").type(emojiWink);
    cy.get(".app__emoji-select-button")
      .contains("😉")
      .click();
    cy.get("#app__message-box-input").type(enterKey);
    cy.get(".app__message")
      .invoke("text")
      .should("contain", message + " 😄" + secondMessage + " 😉");
  });

  it("displays previous messages when UI is reloaded", () => {
    const reloadMessage =
      "This is a message that should be show up on page reload.";

    cy.visit(appURL);
    cy.get("#app__message-box-input").type(reloadMessage);
    cy.get("#app__message-box-input").type(enterKey);

    cy.get(".app__message")
      .invoke("text")
      .should("contain", reloadMessage);

    cy.reload();

    cy.get(".app__message")
      .invoke("text")
      .should("contain", reloadMessage);
  });
});
