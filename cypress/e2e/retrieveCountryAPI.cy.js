export class RetrieveCountryFromAPI {
  OnResult = null;

  retrieveCountry(url) {
    let countryList = null;

    it("visit site", (OnResult) => {
      cy.visit(url);
      cy.get('[role="flatdoc-content"] pre')
        .eq(2)
        .invoke("text")
        .then((href) => {
          cy.request("GET", href).then((api) => {
            countryList = api.body.slice(0, 10);
            this.OnResult(countryList);
          });
        });
    });
  }
}
