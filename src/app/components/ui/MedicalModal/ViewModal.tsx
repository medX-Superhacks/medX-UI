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
const ViewMedicalModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }
    return (
        <>
            <div
                className="border-2 rounded-xl px-4 py-2 cursor-pointer"
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

export default ViewMedicalModal;
