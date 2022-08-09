describe("Appointments", () => {
  beforeEach(() => {
    //Reset database
    cy.request("GET", "http://localhost:8001/api/debug/reset");

    //Ensure the page has loaded
    cy.visit("/");
    cy.contains("Monday");
  });
  it("should book an interview", () => {
    //Click on the first available appointment
    cy.get("[data-testid=add-appointment]")
      .should("be.visible")
      .first()
      .click();

    //Add the name "Test student", click on the instructor "Tori Malcolm" and save
    cy.get("[data-testid=student-name-input]")
      .type("Test Student")
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
    //Alias the call we are making to the API so that we can wait() for it to return
    cy.intercept({ method: "DELETE", url: "/api/appointments/*" }).as(
      "delete-request"
    );

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
