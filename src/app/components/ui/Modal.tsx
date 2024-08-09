'use client';
import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Dropdown from './Dropdown';
import { Input } from './Input';
import Payment from '../Payment';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { userData } from '@/redux/reducer/userData';
import toast from 'react-hot-toast';
import { validationCheck } from '@/app/lib';
export default function Modal() {
    let [isOpen, setIsOpen] = useState(false);
    const [currentState, setCurrentState] = useState(0);
    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }
    const genderData = [
        { id: 1, name: 'Male' },
        { id: 2, name: 'Female' },
        { id: 3, name: 'Other' },
    ];
    const { name, age, gender } = useAppSelector(
        (state) => state.createUserData
    );
    const handleValidation = () => {
        if (!validationCheck({ name, age, gender })) {
            toast.error('Please fill all the details');
            return;
        }
        setCurrentState(1);
    };
    const dispatch = useAppDispatch();
    return (
        <>
            <Button
                onClick={open}
                className="bg-themelinear px-6 py-2 text-sm  rounded-lg font-semibold cursor-pointer text-white "
            >
                Schedule
            </Button>
            <Transition appear show={isOpen}>
                <Dialog
                    open={isOpen}
                    as="div"
                    className="relative z-10 focus:outline-none"
                    onClose={close}
                >
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
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
                                    {currentState === 0 ? (
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
                                                Please fill your Details
                                            </DialogTitle>
                                            <div className="text-black pt-2">
                                                <label
                                                    htmlFor="name"
                                                    className="text-sm"
                                                >
                                                    Name*
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="name"
                                                    placeholder="Your Name"
                                                    className="mt-2"
                                                    onChange={(e) => {
                                                        dispatch(
                                                            userData({
                                                                name: e.target
                                                                    .value,
                                                            })
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="text-black pt-2">
                                                <label
                                                    htmlFor="name"
                                                    className="text-sm"
                                                >
                                                    Age*
                                                </label>
                                                <Input
                                                    type="number"
                                                    id="age"
                                                    placeholder="Your Age"
                                                    className="mt-2"
                                                    onChange={(e) => {
                                                        dispatch(
                                                            userData({
                                                                age: e.target
                                                                    .value,
                                                            })
                                                        );
                                                    }}
                                                />
                                            </div>{' '}
                                            <div className="text-black pt-2">
                                                <label
                                                    htmlFor="name"
                                                    className="text-sm"
                                                >
                                                    Gender*
                                                </label>
                                                <Dropdown data={genderData} />
                                            </div>
                                            <div className="mt-4">
                                                <Button
                                                    disabled={
                                                        !validationCheck({
                                                            name,
                                                            age,
                                                            gender,
                                                        })
                                                    }
                                                    className={`${
                                                        !validationCheck({
                                                            name,
                                                            age,
                                                            gender,
                                                        }) &&
                                                        'cursor-not-allowed '
                                                    } disabled:opacity-50 inline-flex items-center mt-2 gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700`}
                                                    onClick={() => {
                                                        handleValidation();
                                                    }}
                                                >
                                                    Proceed to Payment!
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ) : currentState === 1 ? (
                                        <AnimatePresence>
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    duration: 0.5,
                                                }}
                                            >
                                                <DialogTitle
                                                    as="h3"
                                                    className=" font-medium text-black"
                                                >
                                                    Select chains
                                                </DialogTitle>
                                                <Payment
                                                    setCurrentState={
                                                        setCurrentState
                                                    }
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                    ) : (
                                        <AnimatePresence>
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
                                                    className="flex items-center gap-x-2 font-medium text-black"
                                                >
                                                    Appointment Scheduled
                                                    <IoIosCheckmarkCircleOutline
                                                        size={20}
                                                    />
                                                </DialogTitle>
                                                <div className="pt-5 underline cursor-pointer">
                                                    <a href="">Payment link</a>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    )}
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
