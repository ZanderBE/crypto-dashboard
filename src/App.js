import React from 'react';
import './App.css';
import Navigation from './Navigation.js';
import Footer from './Footer.js';

// import Header from './Header';
// import Coins from './Coins';

const API = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,LTC,ZEC,DASH&tsyms=USD';
const images = {
  BTC: 'https://cdn.glitch.com/c262e294-9e91-424b-b864-45951f969cdd%2FBTC.png?v=1567060190986',
  ETH: 'https://cdn.glitch.com/c262e294-9e91-424b-b864-45951f969cdd%2FETH.png?v=1567060531557',
  XRP: 'https://cdn.glitch.com/c262e294-9e91-424b-b864-45951f969cdd%2FXRP.png?v=1567060564077',
  LTC: 'https://cdn.glitch.com/c262e294-9e91-424b-b864-45951f969cdd%2FLTC.png?v=1567060542749',
  ZEC: 'https://cdn.glitch.com/c262e294-9e91-424b-b864-45951f969cdd%2FZEC.png?v=1567060570756',
  DASH: 'https://cdn.glitch.com/c262e294-9e91-424b-b864-45951f969cdd%2FDASH.png?v=1567060393360'
};
  
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     coins: [],
     isLoading: false,
     error: null,
    };
  }

  componentDidMount() {  
    this.setState({ isLoading: true });
    
    fetch(API)
      .then(res => res.json())
      .then(data => this.setState({ coins: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

// You can add if statements for the load to alert users the page is still loading here.
  render() { 
    const { coins, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className="App">
        <Navigation />
        {Object.keys(this.state.coins).map((key => (
          <div className="coin-container">
            <div className="coin-img-container">
              <img src={images[key]} alt="coins"></img>
            </div>
            <div className="coin-information-container">
              <p>Coin: {key}</p>
              <p>Price: ${this.state.coins[key].USD}</p>
            </div>
          </div>
                                           
          )))}
          <Footer />
      </div>
    );
  }
}

export default App;
