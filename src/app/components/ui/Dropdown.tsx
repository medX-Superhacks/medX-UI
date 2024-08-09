'use client';
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/react';
import { FaAngleDown } from 'react-icons/fa';
import clsx from 'clsx';
import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { userData } from '@/redux/reducer/userData';

type Data = {
    id: number;
    name: string;
}[];

export default function Dropdown({ data }: { data: Data }) {
    const [selected, setSelected] = useState<Data[number] | null>(null);
    const dispatch = useAppDispatch();

    const handleSelect = (value: Data[number] | null) => {
        setSelected(value);
        dispatch(
            userData({
                gender: value?.name || '',
            })
        );
    };

    return (
        <Combobox value={selected} onChange={(value) => handleSelect(value)}>
            <div className="relative">
                <ComboboxInput
                    className={clsx(
                        'w-full rounded-lg border bg-white/5 py-1.5 pr-8 pl-3 text-sm/6',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    displayValue={(person: Data[number]) => person?.name || ''}
                    disabled
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                    <FaAngleDown className="size-4" />
                </ComboboxButton>
            </div>

            <ComboboxOptions
                anchor="bottom"
                transition
                className={clsx(
                    'bg-[#EDF9FC] z-50 w-[var(--input-width)] rounded-xl border border-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                    'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                )}
            >
                {data?.map((person) => (
                    <ComboboxOption
                        key={person.id}
                        value={person}
                        className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-slate-200"
                    >
                        <div className="text-sm/6">{person.name}</div>
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    );
}
