import React from 'react';
import ModalWrapper from "./ModalWrapper";
import { Dialog } from '@headlessui/react';
import Bouton from "./Bouton";

const VoirNotifications = ({ open, setOpen, el }) => {
    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
                    <Dialog.Title as="h3" className="font-semibold text-lg">
                        {el?.tache?.titre}
                    </Dialog.Title>
                    <p className="text-start text-gray-500">
                        {el?.text}
                    </p>
                    <Bouton type="button" className="bg-white px-8 mt-3 text-sm font-semibold text-gray-900 sm:w-auto border" onClick={() => setOpen(false)} label="Ok" />
                </div>
            </ModalWrapper>
        </>
    )
}

export default VoirNotifications