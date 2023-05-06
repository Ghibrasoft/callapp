import axios from "axios";
import { create } from "zustand";


export interface IPerson {
    id: number;
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
    personData: IPerson[];
    setData: (data: IPerson[]) => void;
    cities: string[],
    setCities: (cities: string[]) => void;
    data: { type: string, value: number }[];
    setChartData: (chartData: { type: string, value: number }[]) => void;
}

// custom hook
export const usePersonStore = create<IPersonStore>((set) => ({
    personData: [],
    setData: (personData) => set({ personData }),
    cities: [],
    setCities: (cities) => set({ cities }),
    data: [],
    setChartData: (data) => set({ data }),
}));

// get persons
export async function fetchData() {
    try {
        const response = await axios.get<IPerson[]>('http://localhost:3001/persons');
        const personData = response.data;
        usePersonStore.setState({ personData });
    } catch (error) {
        console.error(error);
    }
}

// get cities
async function fetchCities() {
    try {
        const response = await axios.get<IPerson[]>("http://localhost:3001/persons");
        const resData = response.data;
        const cities = resData.map((person) => person.address?.city);
        usePersonStore.setState({ cities });

        // making data for chart
        const data = cities.reduce((acc: { type: string, value: number }[], curr) => {
            const existingItem = acc.find(item => item.type === curr);
            if (existingItem) {
                existingItem.value += 1;
            } else {
                acc.push({ type: curr, value: 1 });
            }
            return acc;
        }, []);
        usePersonStore.setState({ data });

    } catch (error) {
        console.error(error);
    }
}


fetchCities();
fetchData();