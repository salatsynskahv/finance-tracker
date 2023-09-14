import {create} from 'zustand';
import {data} from "autoprefixer";

export const useAppStore = create((set) => (
        {
            username: '',
            allExpences: [],
            categories: [],
            categoryExpences: [],
            initUsername: (username) => set((username => ({ username: username }))),
            initAllExpences : (allExpences) => set({allExpences: allExpences}),
            initCategories: (categories) => set({categories: categories}),
            initCategoryExpences: (categoryExpences) => set({categoryExpences : categoryExpences})
        })
);
