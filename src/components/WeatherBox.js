import React from 'react';
import './WeatherBox.css';

export default class WeatherBox extends React.Component {
  // gibt Wochentag zu einem gegebenen Datumswert zurück
  getDay = date => {
    let weekday = new Array(7);
    weekday[0] = 'Sonntag';
    weekday[1] = 'Montag';
    weekday[2] = 'Dienstag';
    weekday[3] = 'Mittwoch';
    weekday[4] = 'Donnerstag';
    weekday[5] = 'Freitag';
    weekday[6] = 'Samstag';

    return weekday[new Date(date).getDay()];
  };

  render(props) {
    return (
      <div className='weather-box'>
        <h1>{this.props.date ? this.getDay(this.props.date) : ''}</h1>
        <img
          src={
            this.props.icon
              ? require(`../images/${this.props.icon}.svg`)
              : require('../images/01d.svg')
          }
          alt='sun'
        />
        <span className='temp'>{Math.round(this.props.temp - 273.15)}°C</span>
      </div>
    );
  }
}
