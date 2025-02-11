const dropdown = document.getElementById("country")
const displayBorder = document.getElementById("borders")
const button = document.getElementById("button")


const allCountries = "https://restcountries.com/v3.1/all"

const countries = async (url) => {
    const response = await fetch(url)
    const result = await response.json()

    // result.forEach((e) => console.log(e.name.common, e.cca3))
    result.forEach((e) => dropdown.innerHTML +=
        `<option value=${e.cca3} id=${e.cca3}>${e.name.common}</option>`)
}

const borderCountries = async (url) => {
    const response = await fetch(url)
    const result = await response.json()

    console.log(result)
}

const getBorders = async (country) => {
    const urlCountry = `https://restcountries.com/v3.1/alpha/${country}`

    try {
        const response = await fetch(urlCountry)
        const result = await response.json()

        console.log("Selected country:")
        console.log(result)

        const borders = result[0].borders

        console.log('Neighbours of the selected country:')

        displayBorder.innerHTML += `<p class="answer">${result[0].name.common}'s neighbours: </p>`
        borders.forEach((e) => {
            const names = document.getElementById(`${e}`).textContent

            displayBorder.innerHTML += `<p class="neighbours">${names}</p>`

            const urlBorders = `https://restcountries.com/v3.1/alpha/${e}`
            borderCountries(urlBorders)
        })

    }
    catch (error) {
        // console.error("Error happened: ", error)
        console.log("This country doesn't have neighbours")
        displayBorder.innerHTML += "This country doesn't have neighbours"
    }
}


countries(allCountries)

button.addEventListener("click", function (e) {
    e.preventDefault();
    displayBorder.innerHTML = ""
    const country = dropdown.value
    getBorders(country)
})