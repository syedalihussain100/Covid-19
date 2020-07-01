import React, { Component } from 'react'


export default class Country extends Component {
    render() {
    const {countries,
        onSortByTotal,
        onSortByCountryName,
        onRowSelected
    } = this.props    
        return (
            <table className="table table-striped">
             <thead className="thead-dark">
                 <tr>
                   <th>
                  <a href="/" onClick={onSortByCountryName}>Country</a>  
                   </th>
                   <th>
                  <a href="/" onClick={onSortByTotal}>Total</a>   
                   </th>  
                 </tr>
             </thead>
             <tbody>
          {countries.map((country) => {
            const style = {
              backgroundColor: "lightYellow",
            };
            return (
              <tr
                key={country.name}
                style={country.selected ? style : null}
                onClick={() => onRowSelected(country)}
              >
                <td>{country.name}</td>
                <td>{country.total}</td>
              </tr>
            );
          })}
        </tbody>
            </table>
        )
    }
}
