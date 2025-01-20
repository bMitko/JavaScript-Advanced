console.log("Connected");

let display = document.getElementById("display")
let button = document.getElementById("seeList")
let list = document.getElementById("users")

let parsedResult
function info() {
    for (let i = 0; i < parsedResult.length; i++) {
        list.innerHTML += `<li class="ordered">
                           <hr/>
                           <button class="user">${parsedResult[i].name}</button>
                           <ul class=infos></ul>
                           <br/>
                           </li>`
    }
    for (let i = 0; i < parsedResult.length; i++) {
        let ul = document.getElementsByClassName("user")[i]
        ul.addEventListener("click", function (e) {
                e.preventDefault()
                if (document.getElementsByClassName("infos")[i].textContent == "") {
                    document.getElementsByClassName("infos")[i].innerHTML = ""
                    document.getElementsByClassName("infos")[i]
                        .innerHTML += `<li>Email: ${parsedResult[i].email}</li>
                                   <li>Phone: ${parsedResult[i].phone}</li>
                                    <li>Address:<br/>
                                    &nbsp; street - ${parsedResult[i].address.street}<br/>
                                    &nbsp; city - ${parsedResult[i].address.city}<br/>
                                    &nbsp; suite - ${parsedResult[i].address.suite}<br/>
                                    &nbsp; zipcode - ${parsedResult[i].address.zipcode}<br/>
                                    &nbsp; geo - lat: (${parsedResult[i].address.geo.lat}) / lng: (${parsedResult[i].address.geo.lng})</li>`
                }
                else
                    document.getElementsByClassName("infos")[i].innerHTML = ""
            })
    }
}

function fetchList() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(function (response) {
            console.log(response);

            let jsonResponse = response.text();
            console.log(jsonResponse);

            return jsonResponse;
        })
        .then(function (result) {
            console.log(result);

            parsedResult = JSON.parse(result)
            console.log(parsedResult)
            info()
        })

}

button.addEventListener("click", function (e) {
    e.preventDefault();
    if (list.innerHTML == "") {
        fetchList()
    }
    else
        return
})
