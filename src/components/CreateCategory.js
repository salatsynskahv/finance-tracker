import React, {useRef, useState} from 'react';
import {MdOutlineCancel} from "react-icons/all";


const CreateCategory = ({addCategory}) => {
    const [show, setShow] = useState(false);
    const categoryName = useRef();

    return (
        <div className="create-category-inner">
            {!show && <button
                className="btn"
                onClick={() => {
                    setShow(true)
                }}
            > Create Category </button>
            }
            {
                show &&
                <div>
                    <button className="btn cancel" onClick={() => setShow(false)}><MdOutlineCancel/></button>
                    <br/>
                    <label htmlFor="category-name">Category name</label>
                    <br/>
                    <input id="category-name" ref={categoryName}/>
                    <div className="d-flex">
                        <button
                            className="btn btn-primary m-2"
                            onClick={() => {
                                addCategory(categoryName.current.value)
                            }}>
                            Add
                        </button>
                    </div>
                </div>
            }

        </div>
    );
}

export default CreateCategory;