import CreateCategory from "@/components/CreateCategory";
import React from "react";
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";
import {MdOutlineExpandLess, MdOutlineExpandMore} from "react-icons/md";

const CategoryNamesList = ({categories, setCategories, toggleItem}) => {
    return (
        <Accordion>
            {
                categories.map((item, index) => (
                    <AccordionItem key={item._id}>
                        <AccordionHeader className="category-name-header">
                            <span>{item.name}</span>
                            <MdOutlineExpandMore/>
                        </AccordionHeader>

                        <AccordionBody className="category-name-body">
                            <div className="accordion-body">
                                Codes
                                <ul>
                                    {
                                        item.codes.map(
                                            (code, index) =>
                                                <li key={index}>
                                                    {code}
                                                </li>
                                        )
                                    }
                                </ul>
                                {
                                    item.shops && item.shops.length > 0 && (
                                        <>
                                            <span>Custom added shops</span>
                                            <ul>
                                                {
                                                    item.shops.map(
                                                        (shop, index) => {
                                                        })
                                                }
                                            </ul>
                                        </>)
                                }
                            </div>
                        </AccordionBody>
                    </AccordionItem>
                ))
            }
        </Accordion>

    )
}

export default CategoryNamesList;