'use client';
import React from 'react';
import {
    dentist,
    dietitian,
    gastroenterologist,
    generalDoctor,
    generalSurgeon,
    gynecologist,
    orthopedist,
    pediatrician,
    physiotherapist,
} from '../../../../public/assets/index';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';

const inClinicOpds = [
    {
        id: 1,
        image: dentist,
        name: 'Dentist',
        dis: 'Teething troubles? Schedule a dental checkup.',
    },
    {
        id: 2,
        image: gynecologist,
        name: 'Gynecologist/Obstetrician',
        dis: 'Explore for women’s health, pregnancy, and infertility treatments.',
    },
    {
        id: 3,
        image: dietitian,
        name: 'Dietitian/Nutrition',
        dis: 'Get guidance on eating right, weight management, and sports nutrition.',
    },
    {
        id: 4,
        name: 'Physiotherapist',
        dis: 'Pulled a muscle? Get it treated by a trained physiotherapist.',
        image: physiotherapist,
    },
    {
        id: 5,
        name: 'General Surgeon',
        dis: 'Need to get operated? Find the right surgeon.',
        image: generalSurgeon,
    },
    {
        id: 6,
        name: 'Orthopedist',
        dis: 'For bone and joint issues, spinal injuries, and more.',
        image: orthopedist,
    },
    {
        id: 7,
        name: 'General Physician',
        dis: 'Find the right family doctor in your neighborhood.',
        image: generalDoctor,
    },
    {
        id: 8,
        name: 'Pediatrician',
        dis: 'Child specialists and doctors for infants.',
        image: pediatrician,
    },
    {
        id: 9,
        name: 'Gastroenterologist',
        dis: 'Explore for issues related to the digestive system, liver, and pancreas.',
        image: gastroenterologist,
    },
];

const InclinicSection = () => {
    return (
        <div className="w-full mx-4 flex flex-col gap-10">
            <div className="">
                <div className="space-y-2">
                    <h1 className="font-bold text-xl">
                        Book an appointment for an in-clinic consultation
                    </h1>
                    <p className="font-light">
                        Find experienced doctors across all specialties
                    </p>
                </div>
            </div>
            <div className="flex justify-around items-center">
                <Swiper
                    slidesPerView={4}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    className="mySwiper"
                >
                    {inClinicOpds.map((opd) => (
                        <SwiperSlide key={opd.id} className="p-4">
                            <Image
                                src={opd.image}
                                alt={opd.name}
                                className="border border-[#52D2CF]  rounded-md p-4"
                            />
                            <h1 className="font-bold text-lg ">{opd.name}</h1>
                            <p className="text-sm">{opd.dis}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default InclinicSection;
