import React from 'react';

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '101%',
  zIndex: -1,
  overflow: 'hidden'
}

class Background extends React.Component {
  constructor() {
    super();
    this.state = { displayItem: 1 };

    this.getDisplayProperty = this.getDisplayProperty.bind(this);
    this.setTimeoutFunction = this.setTimeoutFunction.bind(this);
  }

  setTimeoutFunction() {
    if (this.state.displayItem > 2) {
      this.setState({ displayItem: 1})
    } else {
      this.setState({ displayItem: this.state.displayItem + 1})
    }
  }

  componentDidMount() {
    setInterval(this.setTimeoutFunction, 4000);
  }

  getDisplayProperty(imageNum) {
    if (imageNum !== this.state.displayItem) {
      return 'none';
    }

    return 'block';
  }

  render() {
    return (
      <div style={style}>
        <img style={{width: '101%', height: '100%', display: this.getDisplayProperty(1)}} src="/assets/images/bloc-jam-images/HeadphonesandComputer.jpg" />
        <img style={{width: '101%', height: '100%', display: this.getDisplayProperty(2)}} src="/assets/images/bloc-jam-images/MusicBook.jpg" />
        <img style={{width: '101%', height: '100%', display: this.getDisplayProperty(3)}} src="/assets/images/bloc-jam-images/MusicPages.jpg" />
      </div>
    );
  }
};

export default Background;
