fetch('http://localhost:3000/weather?address=geneva').then((response) => {
    response.json().then((data) => {
        let main = document.getElementById("container");
        let div = document.createElement("DIV");
        let h1 = document.createElement("h1");
        if (data.error) {
            h1.innerText = data.error;
            main.appendChild(div);
            div.appendChild(h1);
        }
        else {
            let p = document.createElement("p");

            h1.innerText = data.location;
            p.innerText = data.forecast;
            div.classList.add("WeatherInfo")
            main.appendChild(div);
            div.appendChild(h1);
            div.appendChild(p);
        }
    })
})