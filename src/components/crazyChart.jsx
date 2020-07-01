import React, { Component } from 'react'
import {HorizontalBar} from 'react-chartjs-2';



export default class crazyChart extends Component {
    render() {
        const {countries} = this.props;
        if(countries.length === 0) return <div></div>

        const data1 = {
            labels:countries.map((country)=> country.name),
            datasets: [
              {
                data:countries.map((country)=> country.total),    
                label: 'Total Cases',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 6,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
              }
            ]
          };


        return (
            <div>
            <HorizontalBar data={data1} height={300} width={100} options={{maintainAspectRatio:false}}></HorizontalBar>
            </div>
        )
    }
}
