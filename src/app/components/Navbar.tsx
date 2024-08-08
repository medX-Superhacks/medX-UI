import React from 'react';
import { RxExternalLink } from 'react-icons/rx';
const Navbar = () => {
    return (
        <div className="border-b-2 border border-black h-fit">
            <div className="container mx-auto w-full  flex justify-between py-5 ">
                <div className="bg-themelinear  bg-clip-text text-transparent text-4xl font-extrabold">
                    MedX
                </div>
                <div className="bg-themelinear px-6 py-2 rounded-lg text-white font-semibold flex items-center gap-x-2 cursor-pointer">
                    Book Appointment <RxExternalLink />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
