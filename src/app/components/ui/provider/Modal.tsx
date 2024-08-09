'use client';
import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { createMedicalRecordAttestation } from '@/app/lib/func';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { CiBellOn } from 'react-icons/ci';
import {
    useSendUserOperation,
    useSigner,
    useSmartAccountClient,
} from '@account-kit/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Input } from '../Input';
import Dropdown from '../Dropdown';
import toast from 'react-hot-toast';
const bloodType = [
    { id: 1, name: 'A+' },
    { id: 2, name: 'A-' },
    { id: 3, name: 'B+' },
    { id: 4, name: 'B-' },
    { id: 5, name: 'AB+' },
    { id: 6, name: 'AB-' },
];
export default function ProviderModal() {
    let [isOpen, setIsOpen] = useState(false);
    const [insured, setInsured] = useState(true);
    const [diagnose, setDiagnose] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentState, setCurrentState] = useState(0);
    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }
    const signer = useSigner();
    const { client } = useSmartAccountClient({
        type: 'LightAccount',
    });
    const { sendUserOperation } = useSendUserOperation({
        client,
        // optional parameter that will wait for the transaction to be mined before returning
        waitForTxn: true,
        onSuccess: ({ hash, request }) => {
            setLoading(false);
            setCurrentState(1);
        },
        onError: (error) => {
            console.log(error);
            setLoading(false);
            toast.error('Something went wrong');
        },
    });
    const handleCreateRecord = async () => {
        setLoading(true);
        const resp = await createMedicalRecordAttestation(
            'Alice Johnson',
            28,
            insured,
            diagnose,
            '0x0F284B92d59C8b59E11409495bE0c5e7dBe0dAf9',
            signer
        );
        if (resp.data) {
            const sender: any = {
                target: resp.data.to,
                data: resp.data.data,
            };

            sendUserOperation({
                uo: sender,
            });
        }
    };

    return (
        <>
            <Button
                onClick={open}
                className="bg-themelinear px-6 py-2 text-sm  rounded-lg font-semibold cursor-pointer text-white "
            >
                Create record
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
                                                Patient Details
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
                                                    id="name"
                                                    className="mt-2"
                                                    value={'Alice Johnson'}
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
                                                    value={22}
                                                    className="mt-2"
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
                                                    id="gender"
                                                    value={'Male'}
                                                    className="mt-2"
                                                    disabled
                                                />
                                            </div>
                                            <div className="text-black pt-2">
                                                <label
                                                    htmlFor="name"
                                                    className="text-sm"
                                                >
                                                    Diagnosis*
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="diagnosis"
                                                    className="mt-2"
                                                    value={diagnose}
                                                    onChange={(e) => {
                                                        setDiagnose(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="text-black pt-4 flex items-center justify-between">
                                                <div className="text-sm ">
                                                    <label
                                                        htmlFor="name"
                                                        className="text-sm"
                                                    >
                                                        Blood Type*
                                                    </label>
                                                    <div className="pt-2">
                                                        <Dropdown
                                                            data={bloodType}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="name"
                                                        className="text-sm"
                                                    >
                                                        Is insured*
                                                    </label>
                                                    <div className="flex items-center pt-2">
                                                        <input
                                                            type="radio"
                                                            id="yes"
                                                            name="insured"
                                                            value="yes"
                                                            checked={
                                                                insured === true
                                                            }
                                                            onChange={() => {
                                                                setInsured(
                                                                    true
                                                                );
                                                            }}
                                                        />

                                                        <label
                                                            htmlFor="html"
                                                            className="pl-1"
                                                        >
                                                            Yes
                                                        </label>
                                                        <div className="pl-5">
                                                            <input
                                                                type="radio"
                                                                id="no"
                                                                name="insured"
                                                                value="no"
                                                                checked={
                                                                    insured ===
                                                                    false
                                                                }
                                                                onChange={() => {
                                                                    setInsured(
                                                                        false
                                                                    );
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor="html"
                                                                className="pl-1"
                                                            >
                                                                No
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                {loading ? (
                                                    <div className="text-center mt-10 bg-green-200 px-5 py-2  w-full rounded-lg">
                                                        Generating record...
                                                    </div>
                                                ) : (
                                                    <Button
                                                        onClick={() =>
                                                            handleCreateRecord()
                                                        }
                                                        className={`inline-flex items-center mt-2 gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700`}
                                                    >
                                                        Create
                                                    </Button>
                                                )}
                                            </div>
                                        </motion.div>
                                    ) : (
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
                                                Medical Record created
                                                successfully
                                                <IoIosCheckmarkCircleOutline
                                                    size={20}
                                                />
                                            </DialogTitle>
                                            <div className="flex items-center w-fit mt-5 bg-themelinear px-6 py-2 text-sm  rounded-lg font-semibold cursor-pointer text-white ">
                                                Notify Doctor and Patient{'   '}
                                                <CiBellOn
                                                    size={20}
                                                    className="ml-2"
                                                />
                                            </div>
                                        </motion.div>
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
