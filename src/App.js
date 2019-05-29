import React from 'react';
import './App.css';
import getDemoData from './charts/utils'
import CandleStick from './charts/CandleStick';
import Volume from './charts/Volume';

import { TypeChooser } from "react-stockcharts/lib/helper";

class Chart extends React.Component {
  componentDidMount() {
    getDemoData().then(data => {
        this.setState({data})
        console.log(data)
    })
  }
  render() {
    if (this.state == null) {
			return <div>Getting Data...</div>
    }

    return (
			<TypeChooser>
        {type => <CandleStick type={type} data={this.state.data} />}
			</TypeChooser>
		)
  }
}

function App() {
  return (
		<Chart />
  );
}

export default App;
