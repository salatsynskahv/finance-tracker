'use client';

import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import HomeInner from "../components/HomeInner";
import {HomePage} from "../components/HomaPage";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [categoriesToCode, setCategoriesToCode] = useState();

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            try {
                const {data: response} = await axios.get(`http://localhost:3001/allCategories`);
                setCategoriesToCode(response);
            } catch (error) {
                console.log(error.message);
            }
            setLoading(false);
        }
        getCategories();
        console.log(categoriesToCode);

    }, []);

    return (
        <>
            { loading && (<p>Loading</p>) }
            { !loading && (<HomePage />) }
        </>
    )
}
