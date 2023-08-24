import React from 'react'

const AllList = ({rows}) => {
    return (
        <div className="center-container">
            {
                rows.map(row =>
                    (
                        <div>
                            {row.dateOfOperation}
                            {row.details}
                            {row.categoryCode}
                            {row.sum}
                        </div>
                    )
                )
            }
        </div>
    )
}

export default AllList;