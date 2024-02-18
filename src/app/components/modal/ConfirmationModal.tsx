import React, { ReactNode } from 'react'

 interface ConfirmationModalProps {
    isVisible: boolean;
    onClosed: ()=> void;
    children: ReactNode
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({isVisible, onClosed, children}) => {
    if(!isVisible) return null;
    
    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (target.id === 'wrapper') onClosed();
    }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-50" id="wrapper" onClick={handleClose}>
        <div className="flex flex-col h-fit mt-[15%]">
            <div className="w-[90%] lg:w-[30%] mx-auto text-right"><button className='mb-3' onClick={()=> onClosed()}><span className="bg-white-200 rounded-[50%] text-darkBlue-100 py-1 px-2">X</span></button></div>
            <div className="rounded-md bg-white-100 w-[90%] lg:w-[30%] mx-auto py-10 px-5 md:px-10 lg:px-16">{children}</div>
        </div>
    </div>
  )
}

export default ConfirmationModal