import React from 'react'

const AllList = ({allExpences}) => {
    return (
        <div className="center-container">
            <table className="all-expences">
                <thead>

                </thead>
                <tbody>
                {
                    allExpences.map(item =>
                        <tr key={item.dateOfOperation}>
                            {
                                Object.values(item).map((value, index) =>
                                <td key={index}> {value} </td>)
                            }
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default AllList;