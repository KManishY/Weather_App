function getData() {
	let city = document.querySelector("#city").value;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=71582fde263ea4ab6036418d9c7c9e09`;
	fetch(url)
		.then(function (res) {
			return res.json();
		})
		.then(function (res) {
			// console.log(Math.round(res.main.temp - 273));
			Append(res);
		})
		.catch(function (err) {
			console.log(err);
		});
}
function getDataByLocation(lat, lon) {
	let city = document.querySelector("#city").value;

	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=71582fde263ea4ab6036418d9c7c9e09`;

	fetch(url)
		.then(function (res) {
			return res.json(); //collect
		})
		.then(function (res) {
			// console.log(res);
			// console.log(Math.round(res.main.temp - 273));
			Append(res);
		})
		.catch(function (err) {
			// console.log(err);
		});
}

function getWeather7Day(lat, lon) {
	const url7day = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=71582fde263ea4ab6036418d9c7c9e09`;

	fetch(url7day)
		.then(function (result) {
			return result.json();
		})
		.then(function (result) {
			console.log(result);
			let arr = result.daily;
			console.log("here", arr);
			append7Day(arr);
		})
		.catch(function (error) {
			console.log(error);
		});
}

function append7Day(data) {
      let main = document.querySelector("#details7Days");
      let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      let day = new Date()
      let today = day.getDay()
      console.log("aaj",days[today])
	let i = today;
      data.map(function (elem) {
		if (i ==0) {
		} else {
			let box = document.createElement("div");
                  let d = document.createElement("p")
                  d.innerText=days[i-1]
			let temp = document.createElement("h3");
			temp.innerText = `Temperature : ${Math.round(
				elem.temp.day - 273
			)}°C`;

			let maxTemp = document.createElement("h3");
			maxTemp.innerText = `Maximum Temperature : ${Math.round(
				elem.temp.max - 273
			)}°C`;

			let minTemp = document.createElement("h3");
			minTemp.innerText = `Minimum Temperature : ${Math.round(
				elem.temp.min - 273
			)}°C`;

			let humidity = document.createElement("h3");
			humidity.innerText = `Humidity : ${elem.humidity}`;

			box.append(d,temp, maxTemp, minTemp, humidity);

			main.append(box);
		}
		i++;
	});
}

function Append(data) {
	let div = document.querySelector("#details");
	let mapDiv = document.querySelector(".mapouter");
	div.innerHTML = null;

	let city = document.createElement("h2");
	city.innerText = `City : ${data.name}`;

	document.querySelector("#city").value = data.name;

	let map = document.querySelector("#gmap_canvas");
	map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

	let min = document.createElement("h3");
	min.innerText = `Minimum Temperature: ${Math.round(
		data.main.temp_min - 273
	)}°C`;
	let max = document.createElement("h3");
	max.innerText = `Maximum Temperature: ${Math.round(
		data.main.temp_max - 273
	)}°C`;

	let humidity = document.createElement("h3");
	humidity.innerText = `Humidity: ${data.main.humidity}`;

	let temp = document.createElement("h3");
	temp.innerText = `Temperature: ${Math.round(data.main.temp - 273)} °C`;

	div.append(city, min, max, humidity, temp);
	mapDiv.append(map);
}

function getWeather() {
	navigator.geolocation.getCurrentPosition(success);

	function success(pos) {
		let crd = pos.coords;

		// console.log("Your current position is:");
		// console.log(`Latitude : ${crd.latitude}`);
		// console.log(`Longitude: ${crd.longitude}`);
		// console.log(`More or less ${crd.accuracy}`);

		getDataByLocation(crd.latitude, crd.longitude);

		getWeather7Day(crd.latitude, crd.longitude);
	}
}
