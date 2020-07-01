import React, { Component } from 'react'
import Loading from "./Loading";
import axios from 'axios';
import Country from "./Country";
import Chart from "./Chart";
import BarChart from "./barChart";
import CrazyChart from "./crazyChart";
import "./chart.css";



export default class Covid extends Component {
    state={
        countries:[],
        allCountriesTotal:0,
        selectedCountries:[]
    }

     url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv"

 async componentDidMount(){
const response = await axios.get(this.url);
const very = response.data.split("\n");

const countries = [];
let allCountriesTotal = 0;

for(let i =1; i < very.length; i++){
const row = very[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); ///spliting on ,
const countryName = row[0].replace(/"/g,"");
const total = Number(row[4]);
// console.log(countryName);
if(countryName !== ""){
countries.push({
    name: countryName,
    total:total,
});
 allCountriesTotal += total;
}
}

await new Promise ((x) => setTimeout(x,1000))
this.setState({countries,allCountriesTotal})
}

handleOnRowSelected = (countryToUpdate) => {
const countries = [...this.state.countries]
const countryIndex = countries.findIndex(
    (c)=>c.name === countryToUpdate.name
);

const country ={
name: countryToUpdate.name,
total: countryToUpdate.total,
selected: !countryToUpdate.selected
};

countries[countryIndex] = country;
this.setState({countries,selectedCountries:countries.filter((c)=>c.selected)})
}

sortByTotal = (countryA,countryB) => {
if(countryB.total > countryA.total) return 1;
else if (countryB.total < countryA.total) return -1;
else return 0;
}

handleOnSortByTotal = (event) => {
    this.handleOnSortBy(event,this.sortByTotal)       

}

sortByCountryName = (countryA,countryB) => {
    if(countryA.name > countryB.name) return 1;
    else if (countryB.name < countryA.name) return -1;
    else return 0;
    }

handleOnSortByCountryName = (event) =>{
this.handleOnSortBy(event,this.sortByCountryName)       
}

handleOnSortBy = (event,sortOperation) =>{
    event.preventDefault()
    const countries = [...this.state.countries]
    countries.sort(sortOperation);
    this.setState({countries})   
}


numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


    render() {
        const {countries,allCountriesTotal,selectedCountries} = this.state;
        return (
            <div>
            <h1 style={{textAlign:"center"}} className="red">All Country Total Cases: {this.numberWithCommas(allCountriesTotal)}</h1>
             {allCountriesTotal === 0 ?<Loading/> : (
                 <div>
                 <CrazyChart countries={selectedCountries}/>
                 <Chart countries={selectedCountries}/>
                 <BarChart countries={selectedCountries}/>
             <Country countries={countries}
              onSortByTotal={this.handleOnSortByTotal}
               onSortByCountryName={this.handleOnSortByCountryName}
               onRowSelected={this.handleOnRowSelected}
              />
              </div>
             )}   
            </div>
        )
    }
}

