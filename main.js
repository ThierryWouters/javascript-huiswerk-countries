/*Test if everything is loading into browser*/
console.log("Test: website is loading...")

const API_URL = 'https://restcountries.eu/rest/v2/name'
async function getCountryData(countryName='') {
   try {
       /**/
       const API_CALL = (API_URL + '/' + countryName)
       console.log('Calling: ' + API_CALL)
       const response = await axios.get(API_CALL)
       console.log('Result: ' + response)

       const countryNaam = response.data[0].name
       const subRegion = response.data[0].subregion
       const population = response.data[0].population
       console.log(countryNaam + ' is situated in ' + subRegion + '. It has a population of ' + population + ' people.')
       const capitalCity = response.data[0].capital
       const currencies = response.data[0].currencies[0].name
       const languages = response.data[0].languages[0].name
       console.log('The capital is ' + capitalCity + ' they speak ' + languages)

       const flag_URL = response.data[0].flag
       const flag_IMG = document.getElementById("flagImage")
       flag_IMG.setAttribute("src", flag_URL)
       console.log(flag_IMG)

       const countryHeader = document.getElementById("country-name-header")
       countryHeader.textContent = countryNaam
       /*document.body.appendChild(countryHeader)*/

       const textLineOne = document.getElementById("textLine1")
       textLineOne.textContent = countryNaam + ' is situated in ' + subRegion + '. It has a population of ' + population + ' people.'

       let pageLine2
       if (response.data[0].currencies.length === 1) {
           const currency = response.data[0].currencies[0].name
           pageLine2 = 'The capital is ' + capitalCity + ' and you can pay with ' + currency + "'s."
       }
       else if (response.data[0].currencies.length === 2) {
           const currencyOne = response.data[0].currencies[0].name
           const currencyTwo = response.data[0].currencies[1].name
           pageLine2 = 'The capital is ' + capitalCity + ' and you can pay with ' + currencies + "'s."
       }
           const textLineTwo = document.getElementById("textLine2")
           textLineTwo.textContent = pageLine2

           const textLineThree = document.getElementById("textLine3")
           textLineThree.textContent = 'They speak ' + languages + '.'

   }
   catch (e) {
       console.log('API ERROR:' + e)
   }

}

document.getElementById('searchButton').addEventListener('click', ev => {
    console.log('Button was clicked')
    const {value} = document.getElementById('countrySearch')
    console.log("Searched country: " + value)

    getCountryData(value)
} )
