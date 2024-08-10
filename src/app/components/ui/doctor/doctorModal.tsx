'use client';
import { generateId } from '@/app/lib';
import { createPrescriptionAttestation } from '@/app/lib/func';
import { fetchAndLogAttestations } from '@/app/lib/query';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setDoctorAnalysis, setDoctorEasID } from '@/redux/reducer/zkProof';
import { CiCircleCheck } from 'react-icons/ci';
import { CiBellOn } from 'react-icons/ci';
import {
    useSendUserOperation,
    useSigner,
    useSmartAccountClient,
} from '@account-kit/react';
import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { RiExternalLinkLine } from 'react-icons/ri';
import { Input } from '../Input';
import ViewPrescriptionModal from '../MedicalModal/ViewPrescription';
import { storeDoctorProof } from '@/redux/reducer/doctorZk';

const DoctorModal = ({
    name,
    age,
    gender,
    attestationId,
    docID,
    address,
    medication,
    dosage,
    duration,
    isCreated,
    setIsCreated,
}: {
    name: string;
    age: number;
    gender: string;
    attestationId?: string;
    docID: boolean;
    address: string;
    medication: string;
    dosage: string;
    duration: string;
    isCreated: boolean;
    setIsCreated: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const signer = useSigner();
    const [isOpen, setIsOpen] = useState(false);
    const [currentState, setCurrentState] = useState(0);
    const [loading, setLoading] = useState(false);
    const doctorAnalysis = useAppSelector(
        (state) => state.storeZkProof.doctorAnalysis
    );
    const { leaves, proof, proofFlags } = useAppSelector(
        (state) => state.doctorZkProof
    );
    const dispatch = useAppDispatch();
    const doctorEasID = useAppSelector(
        (state) => state.storeZkProof.doctorEasID
    );
    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }
    const handleCopy = () => {
        const targetEasID = doctorEasID;
        const data = { leaves, proof, proofFlags };
        navigator.clipboard
            .writeText(JSON.stringify(data))
            .then(() => {
                toast.success('Zk proof copied to clipboard');
                toast.loading(
                    'You will be redirected to the external link shortly.'
                );
                setTimeout(() => {
                    toast.dismiss();
                    window.open(
                        `https://base-sepolia.easscan.org/attestation/view/${targetEasID}`,
                        '_blank'
                    );
                }, 5000);
            })
            .catch((err) => {
                toast.error('Failed to copy Zk proof to clipboard');
                console.error('Error copying to clipboard:', err);
            });
    };
    const { client } = useSmartAccountClient({
        type: 'LightAccount',
    });
    const { sendUserOperation } = useSendUserOperation({
        client,
        // optional parameter that will wait for the transaction to be mined before returning
        waitForTxn: true,
        onSuccess: async ({ hash }: { hash: any }) => {
            console.log(hash);
            setLoading(false);

            // Add a delay of 4 seconds
            await new Promise((resolve) => setTimeout(resolve, 4000));

            const res: any = await fetchAndLogAttestations({
                txid: {
                    equals: hash,
                },
            });

            if (res.length > 0) {
                dispatch(setDoctorEasID(res[0].id));
                setCurrentState(1);
                setIsCreated(true);
            }
        },

        onError: (error) => {
            console.log(error);
            setLoading(false);
            toast.error('Something went wrong');
        },
    });

    const handleCreatePrescription = async () => {
        setLoading(true);
        const newId = generateId();
        const resp: any = await createPrescriptionAttestation(
            newId.toString(),
            doctorAnalysis.medication,
            doctorAnalysis.dosage,
            doctorAnalysis.duration,
            address,
            signer,
            attestationId
        );
        if (resp.data) {
            const sender: any = {
                target: resp.data.to,
                data: resp.data.data,
            };
            dispatch(storeDoctorProof(resp.zkProofPrescription));
            sendUserOperation({
                uo: sender,
            });
        }
    };
    return (
        <>
            {isCreated ? (
                <div>
                    <div className="flex items-center gap-x-4">
                        <ViewPrescriptionModal
                            name={name}
                            age={age}
                            gender={gender}
                        />

                        <div
                            className="border-2 rounded-xl px-4 py-2 cursor-pointer"
                            onClick={handleCopy}
                        >
                            Verify
                        </div>
                    </div>
                    <div className="font-medium gap-x-1 pt-2 text-sm flex pl-4">
                        Onchain Attested
                        <CiCircleCheck color="green" size={25} />
                    </div>
                </div>
            ) : docID ? (
                <div>
                    <div className="flex items-center gap-x-4">
                        <ViewPrescriptionModal
                            name={name}
                            age={age}
                            gender={gender}
                            medication={medication}
                            dosage={dosage}
                            duration={duration}
                        />
                        <div
                            className="border-2 rounded-xl px-4 py-2 cursor-pointer"
                            // onClick={() =>
                            //     handleCopyStatic(attestationId, zkProof)
                            // }
                        >
                            Verify
                        </div>
                    </div>
                    <div className="font-medium justify-center gap-x-1 pt-2 text-sm flex items-center">
                        Onchain Attested
                        <CiCircleCheck color="green" size={25} />
                    </div>
                </div>
            ) : (
                <Button
                    onClick={open}
                    className="w-full bg-themelinear px-6 py-2 text-sm  rounded-lg font-semibold cursor-pointer text-white "
                >
                    Create
                </Button>
            )}

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
                                                Fill Details
                                            </DialogTitle>
                                            <div className="text-black pt-2">
                                                <label
                                                    htmlFor="name"
                                                    className="text-sm"
                                                >
                                                    Medication*
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="medication"
                                                    className="mt-2"
                                                    placeholder="Add Medication"
                                                    value={
                                                        doctorAnalysis.medication
                                                    }
                                                    onChange={(e) => {
                                                        dispatch(
                                                            setDoctorAnalysis({
                                                                ...doctorAnalysis,
                                                                medication:
                                                                    e.target
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
                                                    Dosage*
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="dosage"
                                                    className="mt-2"
                                                    placeholder="Add Dosage"
                                                    value={
                                                        doctorAnalysis.dosage
                                                    }
                                                    onChange={(e) => {
                                                        dispatch(
                                                            setDoctorAnalysis({
                                                                ...doctorAnalysis,
                                                                dosage: e.target
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
                                                    Duration
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="Duration"
                                                    className="mt-2"
                                                    placeholder="Add Duration"
                                                    value={
                                                        doctorAnalysis.duration
                                                    }
                                                    onChange={(e) => {
                                                        dispatch(
                                                            setDoctorAnalysis({
                                                                ...doctorAnalysis,
                                                                duration:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="mt-4">
                                                {loading ? (
                                                    <div className="text-center mt-10 bg-green-200 px-5 py-2  w-full rounded-lg">
                                                        Generating
                                                        Prescription...
                                                    </div>
                                                ) : (
                                                    <Button
                                                        onClick={() =>
                                                            handleCreatePrescription()
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
                                                Prescription created
                                                successfully
                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={`https://base-sepolia.easscan.org/attestation/view/${doctorEasID}`}
                                                >
                                                    <RiExternalLinkLine
                                                        size={20}
                                                    />
                                                </a>
                                            </DialogTitle>
                                            <div className="flex items-center w-fit mt-5 bg-themelinear px-6 py-2 text-sm  rounded-lg font-semibold cursor-pointer text-white ">
                                                Notify Patient
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
};

export default DoctorModal;
