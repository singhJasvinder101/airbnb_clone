import React, { FC } from 'react'
import { IconType } from 'react-icons'

interface categoryInputProps {
    icon: IconType;
    label: string;
    selected?: boolean;
    onClick: (val: string) => void;
}
const CatgeoryInputs: FC<categoryInputProps> = ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        text-center
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
        >
            <Icon className='mx-auto' size={30} />
            <div className="font-semibold">
                {label}
            </div>
        </div>
    );
}

export default CatgeoryInputs
