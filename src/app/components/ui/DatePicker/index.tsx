'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import clsxm from '@/app/lib';
import { Button } from '@headlessui/react';
import { Calendar } from '../Calender';
import { Popover, PopoverContent, PopoverTrigger } from '../PopOver';

export function DatePickerWithPresets() {
    const [date, setDate] = React.useState<Date>();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className={clsxm(
                        'w-[200px] justify-start text-left font-normal border-2 p-2 flex items-center rounded-lg',
                        !date && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-auto flex-col space-y-2 p-2 bg-[#EDF9FC]">
                <div className="rounded-md border">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
}
