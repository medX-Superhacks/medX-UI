import React from 'react';
import {
    cardiologyImg,
    dentalImg,
    gastroImg,
    generalImg,
    neurologyImg,
    orthopedicImg,
    urologyImg,
} from '../../../../public/assets/index';
import Image from 'next/image';

const opds = [
    {
        id: 1,
        opdName: 'General Doctor',
        image: generalImg,
    },
    {
        id: 2,
        opdName: 'Urology',
        image: urologyImg,
    },
    {
        id: 3,
        opdName: 'Dental',
        image: dentalImg,
    },
    {
        id: 4,
        opdName: 'Neurology ',
        image: neurologyImg,
    },
    {
        id: 5,
        opdName: 'Gastroenterology',
        image: gastroImg,
    },
    {
        id: 6,
        opdName: 'Orthopedic',
        image: orthopedicImg,
    },
    {
        id: 7,
        opdName: 'Cardiology',
        image: cardiologyImg,
    },
];

const OpdSelection = () => {
    return (
        <div className=" w-full  flex flex-col gap-10">
            <div className="flex  justify-between items-center">
                <div className="space-y-2">
                    <h1 className="font-bold text-xl ">
                        Get expert medical advice from top doctors, anytime,
                        anywhere.
                    </h1>
                    <p className="font-light">
                        Secure online sessions with verified doctors in every
                        specialty.
                    </p>
                </div>{' '}
                <button className="group/button  relative overflow-hidden rounded-md border border-[#52D2CF] bg-white px-4 py-1 text-sm font-medium text-[#157D7A] transition-all duration-150 hover:border-[#1a3d3c] active:scale-95">
                    <span className="absolute bottom-0 left-0 z-0 h-0 w-full bg-gradient-to-t from-[#4ab7b3] to-[#19d5cf] transition-all duration-500 group-hover/button:h-full" />
                    <span className="relative z-10 transition-all duration-500 group-hover/button:text-white">
                        Explore All Specialties
                    </span>
                </button>
            </div>
            <div className="flex justify-around  items-center ">
                {opds.map((opd) => {
                    return (
                        <div
                            key={opd.id}
                            className="w-full flex flex-col gap-y-2 items-center"
                        >
                            <Image
                                src={opd.image}
                                alt={opd.opdName}
                                className=" border border-[#52D2CF]  rounded-lg p-3 w-36 "
                            />
                            <h1>{opd.opdName}</h1>
                            <button className="group/button  relative overflow-hidden rounded-md border border-[#52D2CF] bg-white px-4 py-1 text-sm font-medium text-[#157D7A] transition-all duration-150 hover:border-[#1a3d3c] active:scale-95">
                                <span className="absolute bottom-0 left-0 z-0 h-0 w-full bg-gradient-to-t from-[#4ab7b3] to-[#19d5cf] transition-all duration-500 group-hover/button:h-full" />
                                <span className="relative z-10 transition-all duration-500 group-hover/button:text-white">
                                    CONSULT NOW
                                </span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OpdSelection;
