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

interface IChartData {
    type: string;
    value: number;
}

interface IPersonStore {
    rows: IPerson[];
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    totalPages: number;
    setTotalPages: (totalPages: number) => void;
    allPersonsLength: number;
    getPersons: (page: number, limit: number) => Promise<void>;
    postPerson: (personData: Store) => Promise<void>;
    putPerson: (id: StoreValue, editedPerson: Store) => Promise<void>;
    delPerson: (id: string, rows: IPerson[]) => Promise<void>;

    data: IChartData[];
    setChartData: (chartData: IChartData[]) => void;
}

// custom hook
export const usePersonStore = create<IPersonStore>((set) => ({
    rows: [],
    currentPage: 1,
    setCurrentPage: (currentPage: number) => set({ currentPage }),
    totalPages: 0,
    setTotalPages: (totalPages: number) => set({ totalPages }),
    allPersonsLength: 0,
    getPersons: async (page = 1, limit = 20) => {
        try {
            const res = await axios.get("http://localhost:3001/Persons", { params: { page, limit } })
            const { rows, currentPage, totalPages, allPersonsLength, cities } = res.data;
            set({ rows, currentPage, totalPages, allPersonsLength });

            const chartData = cities.map((city: string) => ({ type: city, value: 0 }));
            set({ data: chartData });
        } catch (error) {
            console.log(error);
        }
    },
    postPerson: async (personData: Store) => {
        try {
            await axios.post("http://localhost:3001/Persons", personData)
        } catch (error) {
            console.log(error);
        }
    },
    putPerson: async (id: StoreValue, editedPerson: Store) => {
        try {
            await axios.put(`http://localhost:3001/Persons/${id}`, editedPerson)
        } catch (error) {
            console.log(error);
        }
    },
    delPerson: async (id: string, rows: IPerson[]) => {
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