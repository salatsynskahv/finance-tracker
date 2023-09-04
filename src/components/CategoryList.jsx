import React, {useState} from 'react';
import PopoverCategoryChange from "./PopoverCategoryChange";

const CategoryList = ({groupedByCategory, categoryNames, changeCategory}) => {
    const toggleItem = (e) => {
        const classList = e.currentTarget.classList;
        const nextElement = e.currentTarget.nextSibling;
        if (!classList.contains('active')) {
            classList.add('active');
            nextElement.style.display = 'block';
        } else {
            classList.remove('active');
            nextElement.style.display = 'none';
        }
    }
    return (
        <div className="list-container">
            <ul className="acc">
                {
                    groupedByCategory.map(([key, values, sum]) => (
                            <li key={key}>
                                <button className="acc_ctrl" onClick={toggleItem}>
                                    <h2>{key} : {sum} </h2>
                                </button>
                                <div className="acc_panel">
                                    {values.map(item =>
                                        <div key={item.dateOfOperation }className="category-item">
                                            <p> {item.details} </p>
                                            <p> {item.sum}</p>
                                             <PopoverCategoryChange item={item}
                                                                    changeCategory={changeCategory}
                                                                    categoryNames={categoryNames}
                                             />

                                        </div>)
                                    }
                                </div>
                            </li>
                        )
                    )
                }
            </ul>
        </div>)
}

export default CategoryList;