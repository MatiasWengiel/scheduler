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
  xit("should book an interview", () => {
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
  xit("should edit an interview", () => {
    cy.request("GET", "http://localhost:8001/api/debug/reset");

    cy.visit("/");
    //Select the filled out appointment and click on the edit button (note: force click required as cypress does not natively support a hover css action)
    cy.get(".appointment__card--show")
      .get("img[alt=Edit]")
      .click({ force: true });

    //Select the text input field, clear it, change the name to "Edited Student" and change the instructor to "Tori Malcolm", then save.
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Edited Student")
      .get("[alt='Tori Malcolm']")
      .click()
      .get("Button")
      .contains("Save")
      .click();

    //Confirm that Edited Student's interview was rebooked with Tori Malcolm
    cy.contains(".appointment__card--show", "Edited Student").contains(
      ".appointment__card--show",
      "Tori Malcolm"
    );
  });

  it("should cancel an interview", () => {
    cy.request("GET", "http://localhost:8001/api/debug/reset");

    //Alias the call we are making to the API so that we can wait() for it to return
    cy.intercept("/api/appointments/*").as("delete-request");

    cy.visit("/");
    //Confirm that the Archie Cohen appointment is present
    cy.contains(".appointment__card--show", "Archie Cohen");
    //Select the filled out appointment and click on the delete button (note: force click required as cypress does not natively support a hover css action)
    cy.get(".appointment__card--show")
      .get("img[alt=Delete]")
      .click({ force: true });

    //Confirm delete and wait for it to return
    cy.get("Button").contains("Confirm").click().wait("@delete-request");

    //Ensure that the Archie Cohen appointment that previously existed no longer does
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
