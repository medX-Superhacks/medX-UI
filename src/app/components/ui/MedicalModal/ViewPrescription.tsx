'use client';
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../Input';
import { useAppSelector } from '@/redux/hooks';
const ViewPrescriptionModal = ({
    name,
    age,
    gender,
    medication,
    dosage,
    duration,
}: {
    name: string;
    age: number;
    gender: string;
    medication?: string;
    dosage?: string;
    duration?: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }
    const doctorAnalysis = useAppSelector(
        (state) => state.storeZkProof.doctorAnalysis
    );
    return (
        <>
            <div
                className="border-2 rounded-xl p-2 cursor-pointer"
                onClick={open}
            >
                View
            </div>
            <Transition appear show={isOpen}>
                <Dialog
                    open={isOpen}
                    as="div"
                    className="relative z-10 focus:outline-none"
                    onClose={close}
                >
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            {' '}
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel
                                    transition
                                    className="w-full max-w-md rounded-xl shadow-2xl bg-[#EDF9FC] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                                >
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <DialogTitle
                                            as="h3"
                                            className=" font-medium text-black"
                                        >
                                            Record Details
                                        </DialogTitle>
                                        <div className="text-black pt-2">
                                            <label
                                                htmlFor="name"
                                                className="text-sm"
                                            >
                                                Name
                                            </label>
                                            <Input
                                                type="text"
                                                id="Name"
                                                value={name}
                                                disabled
                                            />
                                        </div>
                                        <div className="text-black pt-2">
                                            <label
                                                htmlFor="name"
                                                className="text-sm"
                                            >
                                                Age
                                            </label>
                                            <Input
                                                type="number"
                                                id="age"
                                                value={age}
                                                disabled
                                            />
                                        </div>
                                        <div className="text-black pt-2">
                                            <label
                                                htmlFor="name"
                                                className="text-sm"
                                            >
                                                Gender
                                            </label>
                                            <Input
                                                type="text"
                                                id="Gender"
                                                value={gender}
                                                disabled
                                            />
                                        </div>

                                        <div className="text-black pt-2">
                                            <label
                                                htmlFor="name"
                                                className="text-sm"
                                            >
                                                Medication
                                            </label>
                                            <Input
                                                type="text"
                                                id="medication"
                                                value={
                                                    doctorAnalysis.medication ||
                                                    medication
                                                }
                                                disabled
                                            />
                                        </div>
                                        <div className="text-black pt-2">
                                            <label
                                                htmlFor="name"
                                                className="text-sm"
                                            >
                                                Dosage
                                            </label>
                                            <Input
                                                type="text"
                                                id="Dosage"
                                                value={
                                                    doctorAnalysis.dosage ||
                                                    dosage
                                                }
                                                disabled
                                            />
                                        </div>
                                        <div className="text-black pt-2">
                                            <label
                                                htmlFor="name"
                                                className="text-sm"
                                            >
                                                Duration
                                            </label>
                                            <Input
                                                type="text"
                                                id="Duration"
                                                value={
                                                    doctorAnalysis.duration ||
                                                    duration
                                                }
                                                disabled
                                            />
                                        </div>
                                    </motion.div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ViewPrescriptionModal;
