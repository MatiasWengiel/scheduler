describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});

describe("Interview management", () => {
  it("should book an interview", () => {
    cy.request("GET", "http://localhost:8001/api/debug/reset");

    cy.visit("/");
    //Click on the first available appointment
    cy.get("[data-testid=add-appointment]")
      .should("be.visible")
      .first()
      .click();
    //Add the name "Test student", click on the instructor "Tori Malcolm" and save
    cy.get("[data-testid=student-name-input]")
      .type("Test Student")
      .should("have.value", "Test Student")
      .get("[alt='Tori Malcolm']")
      .click()
      .get("button")
      .contains("Save")
      .click();

    //Confirm that Test Student's interview was booked with Tori Malcolm
    cy.contains(".appointment__card--show", "Test Student").contains(
      ".appointment__card--show",
      "Tori Malcolm"
    );
  });
  it("should edit an interview", () => {
    cy.request("GET", "http://localhost:8001/api/debug/reset");

    cy.visit("/");

    cy.get(".appointment__card--show").contains("Archie Cohen");
  });
  it("should cancel an interview", () => {});
});
