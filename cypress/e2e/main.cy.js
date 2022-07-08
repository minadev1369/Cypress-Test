import { RetrieveCountryFromAPI } from "./retrieveCountryAPI.cy.js";
import { VerifyCountryInfo } from "./verifyCountryInfo.cy.js";
import { CleanData } from "./cleanData.cy.js";

export const retrieveCountryFromAPI = new RetrieveCountryFromAPI();
export const verifyCountryInfo = new VerifyCountryInfo();
export const cleanData = new CleanData();

let onCountryWeikiGetReady = function (countryWiki, cinfo, properties) {
  const resultVerify = verifyCountryInfo.verify(cinfo, countryWiki, properties);
  console.log(resultVerify);
};
// =========================================================

export function googleUpWikipedia(properties, cinfo) {
  let countryWikipedia = {};

  describe("google Wikipedia", () => {
    let countryName = cinfo.name.common;

    const args = { countryName, cinfo };
    cy.origin("https://www.google.com", { args }, ({ countryName, cinfo }) => {
      cy.visit("/search?client=firefox-b-d&q=" + countryName + "+Wikipedia");
    });

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

// =========================================================

let onCountryResult = function (retrieveAPI) {
  const countryList = cleanData.cleanDataOfCountries(retrieveAPI);

  var properties = [
    "name",
    "capital",
    "currency",
    "timezone",
    "callingcode",
    "internettld",
  ];
  for (let c = 0; c < countryList.length; c++) {
    googleUpWikipedia(properties, countryList[c]);
  }
};
retrieveCountryFromAPI.OnResult = onCountryResult;
retrieveCountryFromAPI.retrieveCountry("https://restcountries.com/");
