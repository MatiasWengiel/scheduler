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
    cy.visit("/");

    cy.contains("[data-testid=add-appointment").click();
  });
  it("should edit an interview", () => {});
  it("should cancel an interview", () => {});
});
