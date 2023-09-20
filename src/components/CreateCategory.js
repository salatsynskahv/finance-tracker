import React, {useRef, useState} from 'react';
import {Button, Popover} from "@mui/material";
import {MdOutlineAddCircleOutline} from "react-icons/md";
import axios from "axios";
import {useAppStore} from "@/app/store/slice";
import {error} from "next/dist/build/output/log";


const CreateCategory = ({categories, setCategories}) => {
    // const {username} = useAppStore((state) => state.username);
    const username = 'salatsynskahv@gmail.com';
    console.log(username);
    const categoryName = useRef();

    const [anchorEl, setAnchorEl] = useState();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'createCategoryModal' : undefined;

    const addCategory = (name) => {
        axios.post(`http://localhost:3001/newUserCategory`,
            {
                username: username,
                newCategoryName: name
            }).then(
            (response) => {
                 setCategories(response.data.categories);
                handleClose();
            }).catch(error => console.log(error));
    }

    return (<>
            <button
                type="button"
                className="btn"
                aria-describedby={id}
                onClick={handleClick}
            >
                <MdOutlineAddCircleOutline/>
            </button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className="create-category">
                    <label htmlFor="category-name">
                        Category name
                    </label>
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
            </Popover>
        </>
    );
}

export default CreateCategory;