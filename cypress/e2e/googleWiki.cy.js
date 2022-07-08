export class GoogleWiki {
  onCountryWeikiGetReady = null;

  googleUpWikipedia(properties, cinfo) {
    let countryWikipedia = {};

    describe("google Wikipedia", () => {
      let countryName = cinfo.name.common;

      const args = { countryName, cinfo };
      cy.origin(
        "https://www.google.com",
        { args },
        ({ countryName, cinfo }) => {
          cy.visit(
            "/search?client=firefox-b-d&q=" + countryName + "+Wikipedia"
          );
        }
      );

      let findCountry = false;
      cy.get("a").each((el) => {
        const href = el.attr("href");
        if (href) {
          if (
            href
              .toString()
              .includes(
                "https://en.wikipedia.org/wiki/" + countryName.split(" ")[0]
              ) &&
            !findCountry
          ) {
            findCountry = true;
            cy.wrap(el).click();

            cy.get("table tr")
              .find(".infobox-label")
              .each((th, index) => {
                let temp = th[0].innerText.toLowerCase().replace(/\s+/g, "");

                for (const property of properties) {
                  if (temp.includes(property)) {
                    var allrows = cy.wrap(th).parent().find(".infobox-data");
                    allrows.each((td, index) => {
                      let data = td[0].innerText
                        .toLowerCase()
                        .replace(/\s+/g, "");

                      countryWikipedia[property] = data;
                    });
                    break;
                  }
                }
              })
              .then(() => {
                onCountryWeikiGetReady(countryWikipedia, cinfo, properties);
              });
          }
        }
      });
    });
  }
}
