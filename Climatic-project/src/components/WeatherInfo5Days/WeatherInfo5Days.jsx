import './WeatherInfo5Days.css'

function WeatherInfo5Days({ weather5Days }) {

    let dailyForecast = {};
    let currentDay = new Date().getDate();
    
    for (let forecast of weather5Days.list) {
        const forecastDate = new Date(forecast.dt * 1000);
        const day = forecastDate.getDate();
    
        // Garantir que não capture o dia atual e armazene previsões únicas para os próximos 5 dias
        if (day !== currentDay && !dailyForecast[day]) {
            dailyForecast[day] = forecast;
        }
    }
    
    const next5DaysForecast = Object.values(dailyForecast).slice(0, 5);

    function convertDate(date) {
        const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit' })

        return (newDate)
    }


    return (
        <div className='weather-container'>
            <h3> Previsão próximos 5 dias </h3>
            <div className='weather-list'>
                {next5DaysForecast.map(forecast => (
                    <div key={forecast.dt} className='weather-item'>
                        <p className='forecast-day'> {convertDate(forecast)} </p>
                        <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} />
                        <p className='forecast-description'>{forecast.weather[0].description}</p>
                        <p>{Math.round(forecast.main.temp_min)}ºC min / {Math.round(forecast.main.temp_max)}ºC max </p>

                    </div>
                ))}

            </div>
        </div>
    )

}


export default WeatherInfo5Days