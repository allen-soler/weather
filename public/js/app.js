const weatherCB = (name) => {
    fetch(`/weather?address=${name}`).then((response) => {
        response.json().then((data) => {
            //let main = document.getElementById("container");
            let h1 = document.getElementById("location");
            let p = document.getElementById("forecast");
            if (data.error) {
                h1.textContent = "" + data.error;
                p.textContent = "";
                //main.appendChild(div);
                //div.appendChild(h1);
            }
            else {
                //let p = document.createElement("p");

                h1.textContent = data.location;
                p.textContent = data.forecast;
                //div.classList.add("WeatherInfo")
                //main.appendChild(div);
                //div.appendChild(h1);
                //div.appendChild(p);
            }
        })
    })
}

let form = document.getElementById('formSearch');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = document.querySelector('input').value;
    weatherCB(data);
})