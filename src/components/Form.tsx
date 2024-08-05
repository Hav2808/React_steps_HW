import { FC, useState } from "react";
import { TypeStep } from "./Steps";

export type TypePropChangeStep = {
    changeStep: React.Dispatch<React.SetStateAction<TypeStep[]>>
}

export const Form: FC<TypePropChangeStep> = ({changeStep}) => {
    const [form, setForm] = useState<TypeStep>({date: '', distance: 0});

    const handleDateChange = (date: string) => {
        setForm(prev => ({ ...prev, date }));
    };

    const sortList = (list: TypeStep[]) => {
        return list
            .map(i => {
                const splitItem: string[] = i.date.split('.');
                const day = Number(splitItem[0]);
                const month = Number(splitItem[1]) - 1;
                let year = Number(splitItem[2]);

               
                if (year < 100) {
                    year += 2000;
                }

                const newDate = new Date(year, month, day);
                
                return { ...i, date: newDate };
            })
            .sort((a, b) => Number(b.date) - Number(a.date))
            .map(i => ({
                ...i,
                date: Intl.DateTimeFormat('ru').format(i.date),
            }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        changeStep(prev => sortList([...prev, form]));
        setForm({ date: '', distance: 0 });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container" >
            <input className="button-input"
                type="text" 
                value={form.date} 
                onChange={(e) => handleDateChange(e.target.value)} 
                placeholder="дд.мм.гг" 
            />
            <input className="button-input"
                type="number" 
                value={form.distance} 
                onChange={(e) => setForm(prev => ({ ...prev, distance: Number(e.target.value) }))} 
                placeholder="Введите расстояние" 
            />
            <button className="ok-button" type="submit">OK</button>
        </form>
    );
};
   