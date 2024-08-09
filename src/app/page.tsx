'use client';
import {
    AuthCard,
    useAccount,
    useSmartAccountClient,
} from '@account-kit/react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperImage1 from '../../public/assets/swiper-1.png';
import SwiperImage2 from '../../public/assets/swiper-2.png';
import SwiperImage3 from '../../public/assets/swiper-3.png';
import SlightFlip from './components/ui/SlightFlip';
export default function Home() {
    const searchParams = useSearchParams();
    const searchId = searchParams?.get('orgId');
    const router = useRouter();

    const { address, isLoadingClient } = useSmartAccountClient({
        type: 'LightAccount',
    });
    React.useLayoutEffect(() => {
        if (address && searchId) {
            router.replace('/home');
        }
    }, [address, searchId]);
    const swiperConfig = [
        {
            title: 'Prescription Redemption',
            desc: 'Redeem your prescriptions effortlessly at any pharmacy. Our streamlined process ensures quick and accurate medication fulfillment, saving you time and hassle. ',
            image: SwiperImage1,
        },
        {
            title: 'Access Medical Records',
            desc: 'Securely access your medical records anytime, anywhere. Our decentralized system ensures your data is private and protected, giving you control over your health information ',
            image: SwiperImage2,
        },
        {
            title: 'Consult Doctors',
            desc: 'Easily connect with top healthcare professionals for virtual consultations. Get expert medical advice and personalized care without leaving your home.',
            image: SwiperImage3,
        },
    ];

    return (
        <main className="grid grid-cols-2 h-full py-10">
            <Swiper
                modules={[Autoplay]}
                className="h-full w-full "
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
            >
                {swiperConfig.map((elem, index) => (
                    <SwiperSlide key={index}>
                        <div className="">
                            <Image
                                src={elem.image}
                                alt="images"
                                height={330}
                                width={330}
                                className="mx-auto"
                            />
                            <div className="font-bold pt-8 pb-4 text-xl">
                                {elem.title}
                            </div>
                            <p className="text-sm w-4/6">{elem.desc}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="shadow-xl rounded-xl p-5 text-black w-5/6 ml-auto">
                {isLoadingClient ? (
                    <SlightFlip
                        className="text-4xl  font-bold tracking-[-0.1em] text-black  md:leading-[5rem]"
                        word="Welcome to Medx"
                    />
                ) : (
                    <AuthCard />
                )}
            </div>
        </main>
    );
}
