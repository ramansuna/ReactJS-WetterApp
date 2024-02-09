import React from 'react';
import './App.css';
import MainWeatherWindow from './components/MainWeatherWindow';
import CityInput from './components/CityInput';
import WeatherBox from './components/WeatherBox';

class App extends React.Component {
  state = {
    city: undefined,

    // days enthält Objekte mit den folgenden properties:e
    // date, weather_desc, icon, temp
    days: new Array(5)
  };

  // erstellt die Tagesobjekte und aktualisiert den Status
  updateState = data => {
    const city = data.city.name;
    const days = [];
    const dayIndices = this.getDayIndices(data);

    for (let i = 0; i < 5; i++) {
      days.push({
        date: data.list[dayIndices[i]].dt_txt,
        weather_desc: data.list[dayIndices[i]].weather[0].description,
        icon: data.list[dayIndices[i]].weather[0].icon,
        temp: data.list[dayIndices[i]].main.temp
      });
    }

    this.setState({
      city: city,
      days: days
    });
  };

  // versucht, einen API call mit dem angegebenen Städtenamen zu tätigen und triggered eine Statusaktualisierung aus
  makeApiCall = async city => {
    const api_data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`
    ).then(resp => resp.json());

    if (api_data.cod === '200') {
      await this.updateState(api_data);
      return true;
    } else return false;
  };

  // gibt Array mit Indizes der nächsten fünf Tage in der Liste zurück
  // von der API data (jeden Tag um 12:00 Uhr)
  getDayIndices = data => {
    let dayIndices = [];
    dayIndices.push(0);

    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);

    for (let i = 0; i < 4; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== '15'
      ) {
        index++;
      }
      dayIndices.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    return dayIndices;
  };

  render() {
    const WeatherBoxes = () => {
      const weatherBoxes = this.state.days.slice(1).map(day => (
        <li>
          <WeatherBox {...day} />
        </li>
      ));

      return <ul className='weather-box-list'>{weatherBoxes}</ul>;
    };

    return (
      <div className='App'>
        <header className='App-header'>
          <MainWeatherWindow data={this.state.days[0]} city={this.state.city}>
            <CityInput city={this.state.city} makeApiCall={this.makeApiCall.bind(this)} />
            <WeatherBoxes />
          </MainWeatherWindow>
        </header>
      </div>
    );
  }
}

export default App;
