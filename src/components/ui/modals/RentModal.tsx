"use client"

import useRentModal from '@/hooks/useRentModal'
import React, { FC, useMemo, useState } from 'react'
import Modal from './Modal'
import Heading from '../elements/Heading'
import { categories } from '../Navbar/Categories'
import CatgeoryInputs from '../elements/Inputs/CatgeoryInputs'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { CountrySelect } from '../elements/Inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../elements/Inputs/Counter'
import ImageUpload from '../elements/Inputs/ImageUpload'
import Input from '../elements/Inputs/Input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface RentModalProps { }

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal: FC<RentModalProps> = () => {
    const rentModal = useRentModal()
    const [step, setStep] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) return 'Create'

        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) return undefined

        return 'Back'
    }, [step])

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imgSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    })

    const location = watch('location');
    const category = watch('category');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imgSrc = watch('imgSrc');

    const setCustomValue = (id: string, value: string) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const Map = useMemo(() => dynamic(() => import('../elements/Map'), {
        ssr: false
    }), [location]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);
        axios.post('/api/listings', data)
            .then(() => {
                toast.success('Listing created!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY)
                rentModal.onClose();
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }


    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title='Which of the following best describes your place?'
                subtitle='Pick a category'
            />
            <div className='grid grid-cols-1 md:grid-cols-4 max-h-[50vh] gap-3 overflow-y-auto'>
                {categories.map((item, index) => (
                    <div
                        key={item.label}
                        className='col-span-1'
                    >
                        <CatgeoryInputs
                            label={item.label}
                            icon={item.icon}
                            onClick={(category) => {
                                setCustomValue('category', category)
                            }}
                            selected={category === item.label}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />
                {/* // @ts-ignore */}
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng} />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenitis do you have?"
                />
                <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                    <Counter
                        onChange={(val) => setCustomValue('guestCount', val)}
                        value={guestCount}
                        title="Guests"
                        subtitle="How many guests do you allow?"
                    />
                    <hr />
                    <Counter
                        onChange={(val) => setCustomValue('roomCount', val)}
                        value={roomCount}
                        title="Rooms"
                        subtitle="How many rooms do you have?"
                    />
                    <hr />
                    <Counter
                        value={bathroomCount}
                        onChange={(val) => setCustomValue('bathroomCount', val)}
                        title="Bathrooms"
                        subtitle="How many bathrooms do you have?"
                    />
                </div>
            </div>
        );
    }

    if(step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Show off your place"
                    subtitle="Upload some images"
                />
                <ImageUpload
                    onChange={(value) => setCustomValue('imgSrc', value)}
                    value={imgSrc}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-2">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge per night?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <div>
            <Modal
                isOpen={rentModal.isOpen}
                onClose={rentModal.onClose}
                title="Rent a property"
                actionLabel={actionLabel}
                secondaryActionLabel={secondaryActionLabel}
                secondaryAction={onBack}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
            />
        </div>
    )
}

export default RentModal
