const apiKey="928d7a2008c7a0f6bc4501810985937b";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?q="


const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector('.search button');
const weatherIcon = document.querySelector(".weather-icon");
const loadingText = document.querySelector(".loading");

const checkWeather = async(city)=>{
    document.querySelector('.weather').style.display="none";
    loadingText.style.display='block';
	document.querySelector(".error").style.display = "none";

    console.log(apiUrl + city+ `&appid=${apiKey}`);
    try{
        const response= await fetch(apiUrl + city+ `&appid=${apiKey}`);
        if (!response.ok) {
			// Nếu API trả về lỗi
			throw new Error("City not found");
		}
        else console.log("Connect");
        const data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
		document.querySelector(".temp").innerHTML =
			Math.round(data.main.temp) + "°C";
		document.querySelector(".humidity").innerHTML =
			data.main.humidity + "%";
		document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

		switch (data.weather[0].main) {
			case "Clouds":
				weatherIcon.src = "images/clouds.png";
				break;
			case "Rain":
				weatherIcon.src = "images/rain.png";
				break;
			case "Drizzle":
				weatherIcon.src = "images/drizzle.png";
				break;
			case "Mist":
				weatherIcon.src = "images/mist.png";
				break;
			default:
				weatherIcon.src = "images/clear.png"; // Thêm một icon mặc định
		}

		document.querySelector(".weather").style.display = "flex";
    }
    catch (err) {
        document.querySelector('.error').style.display = 'block';
		console.log("err")
    }
    finally{
        loadingText.style.display="none";
    }
}
searchBtn.addEventListener("click", () => {
	checkWeather( searchBox.value.trim() );
});