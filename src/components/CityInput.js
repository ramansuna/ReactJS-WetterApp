import React from 'react';
import './CityInput.css';

export default class CityInput extends React.Component {
  render(props) {
    const onKlickHandler = async e => {
      e.persist();
      const eventKey = e.which ? e.which : e.keyCode;
      const city = e.target.value;

      // prüfen, ob die Eingabe nur Buchstaben enthält, nachdem die Eingabetaste gedrückt wurde
      if (eventKey === 13) {
        if (/^[a-zA-ZäöüÄÖÜß ]+$/.test(city)) {
          e.target.classList.add('loading');

          if (await this.props.makeApiCall(city)) e.target.placeholder = 'Geben Sie Namen einer Stadt ein...';
          else e.target.placeholder = 'Stadt wurde nicht gefunden, versuche nochmal...';
        } else e.target.placeholder = 'Bitte geben Sie eine valide Stadt ein...';
        e.target.classList.remove('loading');
        e.target.value = '';
      }
    };

    const style = {
      top: this.props.city ? '-380px' : '-20px',
      width: '600px',
      display: 'inline-block',
      padding: '10px 0px 10px 30px',
      lineHeight: '120%',
      position: 'relative',
      borderRadius: '20px',
      outline: 'none',
      fontSize: '20px',
    };

    return (
      <input
        className='city-input'
        style={style}
        type='text'
        placeholder='Geben Sie eine Stadt ein...'
        onKeyPress={onKlickHandler}
      />
    );
  }
}
