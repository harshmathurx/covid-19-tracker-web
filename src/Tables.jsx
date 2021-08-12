import React from 'react'
import "./Tables.css"

function Tables({countries}) {
    return (
        <div className='table'>
            {countries.map((country) => (
                <tr>
                    <td>{country.country}</td>
                    <td>{country.cases}</td>
                </tr>
            ))}
        </div>
    )
}

export default Tables;
