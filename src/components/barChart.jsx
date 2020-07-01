import React, { Component } from 'react'
import {Bar} from "react-chartjs-2";

export default class barChart extends Component {
    render() {
        const {countries} = this.props;
        if(countries.length === 0) return <div></div>

        const datas = {
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
              <Bar data={datas} height={230} width={200} options={{maintainAspectRatio:false}}></Bar>  
            </div>
        )
    }
}
