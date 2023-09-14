import React, {useEffect, useState} from 'react';
import PopoverCategoryChange from "./PopoverCategoryChange";

import {FormControl, MenuItem, Select} from "@mui/material";

import {CiEdit} from "react-icons/ci";
import {FcCheckmark} from "react-icons/fc";
import {VscClose} from "react-icons/vsc";
import CreateCategory from "@/components/CreateCategory";
import CategoryNamesList from "@/components/CategoryNamesList";
import axios from "axios";
import {useAppStore} from "@/app/store/slice";
import {error} from "next/dist/build/output/log";

const CategoryList = ({allExpences}) => {
    console.log(allExpences);
    const [categories, setCategories] = useState([]);
    const [categoryNamesCodes, setCategoryNamesCodes] = useState([]);
    const [groupedByCategory, setGroupedByCategory] = useState({});
    const [onEdit, setOnEdit] = useState();
    // const username = useAppStore((state) => state.username);
    const username = 'salatsynskahv@gmail.com';

    //if user login and have categories - apply users
    //if user logged and don't have categories - find used categories by user and copy them to table


    useEffect(() => {
        const groupedByCategory = allExpences.reduce((accumulator, currentValue) => {
            (accumulator[currentValue.categoryCode] = accumulator[currentValue.categoryCode] || []).push(currentValue);
            return accumulator;
        }, {});
        setGroupedByCategory(groupedByCategory);
        const getCategories = async () => {
            console.log(groupedByCategory);
            console.log(username);

            const createDefaultUserCategories = async () => {
                if (!groupedByCategory || groupedByCategory.size < 1) {
                    return;
                }
                const defaultCategories = await axios.get(`http://localhost:3001/allCategories`);

                const usedKeys = Object.keys(groupedByCategory);
                console.log(usedKeys);
                console.log(defaultCategories.data);
                const flatDefaultCategories = {};
                defaultCategories.data.forEach(item => {
                    return item.codes.forEach(code => {
                        flatDefaultCategories[code] = item;
                    });
                });
                console.log(flatDefaultCategories);
                const usedCategories = new Set();
                usedKeys.forEach((key) => {
                    const category = flatDefaultCategories[key];
                    if (category) {
                        usedCategories.add(category);
                        const value = groupedByCategory[key];
                        delete groupedByCategory[key];
                        groupedByCategory[category.name] = value;
                    }
                });
                console.log(usedCategories);
                return usedCategories;

            }
            axios.get(`http://localhost:3001/allUserCategories`, {params: {username: username}})
                .then(
                    async (response) => {
                        console.log(response.data);
                        let usedCategories;
                        if (response.data.length < 1) {
                            usedCategories = await createDefaultUserCategories();
                            usedCategories = Array.from(usedCategories);
                            console.log(usedCategories);
                            axios.post(`http://localhost:3001/allUserCategories`,
                                {
                                    username: username,
                                    categories: usedCategories
                                }
                            );
                        } else {
                            usedCategories = response.data[0].categories;
                        }
                        console.log(usedCategories);
                        setCategories(usedCategories);
                        setCategoryNamesCodes(categories.map(category => category.name));
                    }
                )
                .catch((reason) => console.log(reason));
        }
        getCategories();

    }, []);

    // useEffect(() => {
    //     setCategoryNames(categories.map(value => value.name));
    // }, [categories]);

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

    const nameSpan = (key) => {
        if (onEdit === key) {
            return <>
                {/*<input value={key}/>*/}
                <FormControl style={{display: "inline"}} sx={{m: 1}} size="small">
                    <Select
                        id="edit-category-select"
                    >
                        {
                            categoryNamesCodes.map((value, index) => {
                                return (
                                    <MenuItem key={index} value={value}>
                                        {value}
                                    </MenuItem>)
                            })
                        }

                    </Select>
                    <button className="btn"
                            onClick={() => {
                                "saveChanges"
                            }}>
                        <FcCheckmark/>
                    </button>

                </FormControl>
                <button className="btn"
                        onClick={() => {
                            setOnEdit(null);
                        }}>
                    <VscClose/>
                </button>

            </>
        } else {
            return <>
                <span>{key}</span>
                <button className="btn"
                        onClick={() => {
                            setOnEdit(key);
                        }}>
                    <CiEdit/>
                </button>
            </>
        }
    }


    // const saveSelectedShop(shop) => {
    //
    // }

    return (
        <>
            {
                categories &&
                <div className="d-flex">
                    <div>
                        <div className="d-flex align-middle">
                            <span className="create-category-title"> All Categories </span> <CreateCategory/>
                        </div>
                        <CategoryNamesList
                            categories={categories}
                            setCategories={setCategories}
                            toggleItem={toggleItem}
                        />
                    </div>
                    <div className="list-container">
                        <ul className="acc">
                            {
                                Object.entries(groupedByCategory).map(([key, values]) => (
                                        <li key={key} className="li-item">
                                            {nameSpan(key)}
                                            <button className="acc_ctrl" onClick={toggleItem}>
                                            </button>
                                            <div className="acc_panel">
                                                {
                                                    values.map(item =>
                                                        <div key={item.dateOfOperation} className="category-item">
                                                            <p> {item.details} </p>
                                                            <p> {item.sum}</p>
                                                            {/*<PopoverCategoryChange item={item}*/}
                                                            {/*                       changeCategory={() => {*/}
                                                            {/*                           console.log("implement")*/}
                                                            {/*                       }}*/}
                                                            {/*                       categoryNamesCodes={categoryNamesCodes}*/}
                                                            {/*/>*/}
                                                        </div>)
                                                }
                                            </div>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                </div>}
        </>
    )

}

export default CategoryList;