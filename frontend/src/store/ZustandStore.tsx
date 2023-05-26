import { Store, StoreValue } from "antd/es/form/interface";
import axios from "axios";
import { create } from "zustand";


export interface IPerson {
    id: string;
    name: string;
    email: string;
    gender: string;
    address: {
        street: string;
        city: string;
    };
    phone: string;
}

interface IPersonStore {
    rows: IPerson[];
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    totalPages: number;
    setTotalPages: (totalPages: number) => void;
    allPersonsLength: number;
    getData: (page: number, limit: number) => Promise<void>;
    postData: (personData: Store) => Promise<void>;
    putData: (id: StoreValue, editedPerson: Store) => Promise<void>;
    delData: (id: string, rows: IPerson[]) => Promise<void>;

    data: { type: string, value: number }[];
    setChartData: (chartData: { type: string, value: number }[]) => void;

}

// custom hook
export const usePersonStore = create<IPersonStore>((set) => ({
    rows: [],
    currentPage: 1,
    setCurrentPage: (currentPage: number) => set({ currentPage }),
    totalPages: 0,
    setTotalPages: (totalPages: number) => set({ totalPages }),
    allPersonsLength: 0,
    getData: async (page = 1, limit = 20) => {
        try {
            const res = await axios.get("http://localhost:3001/Persons", { params: { page, limit } })
            set(res.data);
        } catch (error) {
            console.log(error);
        }
    },
    postData: async (personData: Store) => {
        try {
            await axios.post("http://localhost:3001/Persons", personData)
        } catch (error) {
            console.log(error);
        }
    },
    putData: async (id: StoreValue, editedPerson: Store) => {
        try {
            await axios.put(`http://localhost:3001/Persons/${id}`, editedPerson)
        } catch (error) {
            console.log(error);
        }
    },
    delData: async (id: string, rows: IPerson[]) => {
        try {
            await axios.delete(`http://localhost:3001/Persons/${id}`)
            const filteredRow = rows.filter((row) => row.id !== id)
            set({ rows: filteredRow });
        } catch (error) {
            console.log(error);
        }
    },

    data: [],
    setChartData: (data) => set({ data }),
}));