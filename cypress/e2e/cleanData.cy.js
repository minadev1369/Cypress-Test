export class CleanData {
  cleanDataOfCountries(allContries) {
    const countrySet = [];

    allContries.forEach((country) => {
      countrySet.push({
        name: country.name,
        capital: country.capital,
        currency: Object.keys(country.currencies),
        timezone: country.timezones,
        callingcode: Object.values(country.idd).join(""),
        internettld: country.tld,
      });
    });
    return countrySet;
  }
}
