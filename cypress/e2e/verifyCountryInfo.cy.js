export class VerifyCountryInfo {
  verify(country, wikidata, properties) {
    const resultOfverify = {};
    resultOfverify["name"] = country.name.common;

    for (const property of properties) {
      console.log("verify...........");
      if (wikidata[property] !== undefined && country[property] !== undefined) {
        const countryProp = country[property][0]
          .toLowerCase()
          .replace(/\s+/g, "");
        if (wikidata[property].includes(countryProp)) {
          resultOfverify[property] = "true";
        } else {
          resultOfverify[property] = "false";
        }
      }
    }
    return resultOfverify;
  }
}
