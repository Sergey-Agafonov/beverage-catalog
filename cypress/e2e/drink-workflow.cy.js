describe("drink workflow", () => {
  beforeEach(() => {
    cy.request({ url: "/api/resetdb" });

    cy.visit("/");
    cy.get('[data-testid="add-drink-form"]').as("form");
  });

  it("adds a drink, navigates to it, adds a review and an image", () => {
    cy.get("@form").within(() => {
      cy.get("input#name").type("Mojito");
      cy.get("#description").type("A refreshing cocktail");
      cy.get('button[type="submit"]').click();

      cy.get("input#name").should("have.value", "");
      cy.get("#description").should("have.value", "");
    });

    cy.contains("List of Drinks")
      .parent()
      .within(() => {
        cy.contains("Mojito").should("exist");
        cy.contains("Mojito").click();
      });

    cy.get('[data-testid="drink-details"]').within(() => {
      cy.contains("Mojito").should("exist");
      cy.contains("A refreshing cocktail").should("exist");
    });

    cy.get('[data-testid="review-form"]').within(() => {
      cy.get("input#user_name").should("exist");
      cy.get("#review_text").should("exist");
      cy.get("select#rating").should("exist");
      cy.get('button[type="submit"]').should("exist");

      cy.get("input#user_name").type("John Doe");
      cy.get("#review_text").type("it is refreshing!");
      cy.get("select#rating").select("1");
      cy.get('button[type="submit"]').click();

      cy.get("input#user_name").should("have.value", "");
      cy.get("#review_text").should("have.value", "");
    });

    cy.get('[data-testid="drink-details"]')
      .contains("1 reviews with an average rating of 1")
      .should("exist");

    cy.get('[data-testid="file-upload"]').within(() => {
      cy.get("input#fileInput[type=file]").selectFile(
        "cypress/fixtures/drink_img.webp"
      );
      cy.get('button[type="submit"]').click();
    });

    cy.get("img").should("have.attr", "src").and("include", "drink_img.webp");
  });
});
