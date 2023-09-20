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
import {shallow} from "zustand/shallow";

const CategoryList = ({allExpences}) => {
    // console.log(allExpences);
    const [expencesSt, username] = useAppStore(
        (state) => [state.allExpences, state.username],
        shallow
    );
    console.log(expencesSt);
    console.log(username);
    const [expences, setExpences] = useState(allExpences);
    const [categories, setCategories] = useState([]);
    const [groupedByCategory, setGroupedByCategory] = useState({});
    const [onEdit, setOnEdit] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    // const username = useAppStore((state) => state.username);
    // const username = 'salatsynskahv@gmail.com';

    //if user login and have categories - apply users
    //if user logged and don't have categories - find used categories by user and copy them to table


    useEffect(() => {
            // const groupedByCategory = allExpences.reduce((accumulator, currentValue) => {
            //     (accumulator[currentValue.categoryCode] = accumulator[currentValue.categoryCode] || []).push(currentValue);
            //     return accumulator;
            // }, {});
            // console.log(groupedByCategory);
            // setGroupedByCategory(groupedByCategory);
            const getCategories = async () => {
                // console.log(groupedByCategory);
                // console.log(username);

                const createDefaultUserCategories = async () => {
                    if (!groupedByCategory || groupedByCategory.size < 1) {
                        return;
                    }
                    const defaultCategories = await axios.get(`http://localhost:3001/allCategories`);

                    const usedKeys = Object.keys(groupedByCategory);
                    // console.log(usedKeys);
                    // console.log(defaultCategories.data);
                    const flatDefaultCategories = {};
                    defaultCategories.data.forEach(item => {
                        return item.codes.forEach(code => {
                            flatDefaultCategories[code] = item;
                        });
                    });
                    const usedCategories = new Set();
                    usedKeys.forEach((key) => {
                        const category = flatDefaultCategories[key];
                        if (category) {
                            usedCategories.add(category);
                            const value = groupedByCategory[key];
                            delete groupedByCategory[key];
                            groupedByCategory[category.name] = groupedByCategory[category.name] ? [...groupedByCategory[category.name], ...value] : value;
                        }
                    });
                    return usedCategories;
                }
                axios.get(`http://localhost:3001/allUserCategories`, {params: {username: username}})
                    .then(
                        async (response) => {
                            let usedCategories;
                            if (response.data.length < 1) {
                                usedCategories = await createDefaultUserCategories();
                                usedCategories = Array.from(usedCategories);
                                setCategories(usedCategories);
                                // console.log(usedCategories);
                                axios.post(`http://localhost:3001/allUserCategories`,
                                    {
                                        username: username,
                                        categories: usedCategories
                                    }
                                );
                            } else {
                                usedCategories = response.data[0].categories;
                                setCategories(usedCategories);
                                groupByCategoriesAllExpences(usedCategories);
                            }
                            // console.log(usedCategories);

                        }
                    );
            }
            getCategories();

        }, []
    );


    const groupByCategoriesAllExpences = (usedCategories) => {
        if(!usedCategories || usedCategories.length < 1) {
            return;
        }
        console.log(usedCategories);
        const flatCodesCategories = {};
        const flatShopsCategories = {}
        usedCategories.forEach(item => {
            item.codes?.forEach(code => {
                flatCodesCategories[code] = item;
            });
            item.shops?.forEach(shop => {
                flatShopsCategories[shop] = item;
            });
        });
        console.log(flatCodesCategories);
        console.log(flatCodesCategories);
        const groupedByCtg = expences.reduce((accumulator, currentValue) => {
            const foundByShopCategory = flatShopsCategories[currentValue.details];
            if (foundByShopCategory) {
                (accumulator[foundByShopCategory.name] = accumulator[foundByShopCategory.name] || []).push(currentValue);
                return accumulator;
            }
            const foundByCodeCategory = flatCodesCategories[currentValue.categoryCode];
            if (foundByCodeCategory) {
                (accumulator[foundByCodeCategory.name] = accumulator[foundByCodeCategory.name] || []).push(currentValue);
                return accumulator;
            }
            (accumulator['Others'] = accumulator['Others'] || []).push(currentValue);
            return accumulator;
        }, {});
        console.log(groupedByCtg);
        setGroupedByCategory(groupedByCtg);
    }
    const toggleItem = (e) => {
        console.log(categories);
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
                <div style={{display: "inline"}}>
                    <FormControl sx={{m: 1}} size="small">
                        <Select
                            id="edit-category-select"
                            value={selectedCategory || 'select category'}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                            }}
                        >
                            {
                                categories.map((value, index) => {
                                    return (
                                        <MenuItem key={index} value={value.name}>
                                            {value.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <button className="btn"
                            onClick={() => {
                                saveSelectedCategory(key);
                            }}>
                        <FcCheckmark/>
                    </button>
                </div>
                <button className="btn"
                        onClick={() => {
                            setSelectedCategory(null);
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


    const saveSelectedCategory = (key) => {
        const newGroupedByCategory = {...groupedByCategory};
        // console.log(newGroupedByCategory);
        const value = newGroupedByCategory[key];
        delete newGroupedByCategory[key];
        // console.log(selectedCategory);
        console.log(newGroupedByCategory[selectedCategory]);

        newGroupedByCategory[selectedCategory] = newGroupedByCategory[selectedCategory] ? [...newGroupedByCategory[selectedCategory], ...value] : [...value];
        console.log(newGroupedByCategory);
        setGroupedByCategory(newGroupedByCategory);
        setOnEdit(null);

        const newCategories = [...categories];
        const targetCategory = newCategories.find(value => value.name === selectedCategory);
        targetCategory && targetCategory.codes.push(key);
        // console.log(newCategories);
        setCategories(newCategories);
        axios.patch(`http://localhost:3001/editUserCategoryCode`, {
            username: 'salatsynskahv@gmail.com',
            categoryName: selectedCategory,
            codes: targetCategory.codes

        }).then((response) => {
                console.log(response);
            }
        );
        // console.log(targetCategory);
    }

    return (
        <>
            {
                categories &&
                <div className="d-flex">
                    <div>
                        <div className="d-flex align-middle">
                            <span className="create-category-title"> All Categories </span>
                            <CreateCategory categories={categories} setCategories={setCategories}/>
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
                                                            <PopoverCategoryChange item={item}
                                                                                   changeCategory={(category, expenseItem) => {
                                                                                       console.log(category);

                                                                                       const newCategories = [...categories];
                                                                                       const targetCategory = newCategories.find(item => item.name === category);
                                                                                       if (targetCategory) {
                                                                                           targetCategory.shops.push(expenseItem.details);
                                                                                           setCategories(newCategories);
                                                                                           console.log(categories);
                                                                                       }
                                                                                       console.log(expenseItem);

                                                                                       axios.patch(`http://localhost:3001/editUserCategoryShop`, {
                                                                                           username: 'salatsynskahv@gmail.com',
                                                                                           categoryName: targetCategory.name,
                                                                                           shops: targetCategory.shops

                                                                                       }).then((response) => {
                                                                                               // groupByCategoriesAllExpences(categories);

                                                                                           }
                                                                                       );

                                                                                   }}
                                                                                   categories={categories}
                                                            />
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