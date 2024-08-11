import { DatePickerWithPresets } from '@/app/components/ui/DatePicker';
import Dropdown from '@/app/components/ui/Dropdown';
import Modal from '@/app/components/ui/Modal';
import { RadioGroupDemo } from '@/app/components/ui/RadioButton/radioButton';
import { DOCTOR_PROFILE } from '@/config';
import usdcLogo from '../../../../../public/assets/usdcLogo.png';
import Image from 'next/image';
const DoctorProfile = () => {
    const reason = [
        { id: 1, name: 'Wound Care' },
        { id: 2, name: 'Hypertension' },
        { id: 3, name: 'Injury' },
        { id: 4, name: 'Orthopedic' },
    ];

    return (
        <div className="grid grid-cols-3 pt-5 h-full w-full gap-x-10">
            {DOCTOR_PROFILE.map(
                (
                    {
                        avatar,
                        name,
                        short_desc,
                        language,
                        desc,
                        education,
                        hospitals,
                        fees,
                    },
                    index
                ) => (
                    <div
                        key={index}
                        className="bg-[#EDF9FC] shadow-lg h-full rounded-lg p-5"
                    >
                        <div className="flex items-center gap-x-4">
                            {avatar}
                            <div className="text-sm text-gray-600">
                                <div className="text-xl font-semibold">
                                    {name}
                                </div>
                                <p>{short_desc}</p>
                                <div>{language}</div>
                            </div>
                        </div>
                        <div className="pt-10 font-semibold">
                            <div className="border-b border-gray-300">
                                About
                            </div>
                            <div className="pt-5 text-md text-gray-600">
                                About {name}
                                <p className="text-sm font-normal pt-5">
                                    {desc}
                                </p>
                            </div>
                            <div className="py-5 text-md text-gray-600">
                                Education
                                <p className="text-sm font-normal">
                                    {education}
                                </p>
                            </div>
                            <div className="text-md text-gray-600">
                                Hospital Affiliations
                                <p className="text-sm font-normal">
                                    {hospitals}
                                </p>
                            </div>
                            <div className="text-md  text-gray-600 pt-5">
                                Fees
                                <p className="text-sm font-normal flex gap-1">
                                    {fees}
                                    <Image
                                        src={usdcLogo}
                                        alt="usdclogo"
                                        width={20}
                                        height={10}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                )
            )}

            <div className="col-span-2">
                <div className="text-2xl font-semibold">
                    Book an Appointment
                </div>
                <div className="mt-5 p-10 shadow-xl rounded-xl">
                    <div className="flex items-center justify-between text-gray-600 text-sm">
                        <div className="">
                            Have you visited this provider/practice before? *
                            <RadioGroupDemo />
                        </div>
                        <div>
                            Appointment reason*
                            <div className="pt-5">
                                <Dropdown data={reason} />
                            </div>
                        </div>
                    </div>
                    <div className=" p-5 my-5 rounded-xl border-2">
                        <div className="flex">
                            <DatePickerWithPresets />
                        </div>
                    </div>
                    <div className="ml-auto w-fit">
                        <Modal />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
