"use client"

import React, { FC, useCallback, useState } from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import useRegisterModal from '@/hooks/useRegisterModal'
import Modal from './Modal'
import Input from '../elements/Inputs/Input'
import Heading from '../elements/Heading'
import toast from 'react-hot-toast'
import Button from '../elements/Button'
import useLoginModal from '@/hooks/useLoginModal'
import { signIn } from 'next-auth/react'

interface registerModalProps { }


const RegisterModa: FC<registerModalProps> = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Airbnb"
                subtitle="Create an account!"
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required={true}
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required={true}
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required={true}
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => { signIn('google') }}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => { signIn('github') }}
            />
            <div
                className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
            >
                <p>Already have an account?
                    <span
                        onClick={() => { registerModal.onOpen(); loginModal.onClose() }}
                        className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
                    > Log in</span>
                </p>
            </div>
        </div>
    )

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data)
            .then((res) => {
                if (!res?.data?.error) {
                    registerModal.onClose()
                } else {
                    toast.error(res.data.error)
                }
            })
            .catch((err) => {
                // console.log(err)
                toast.error('Something went wrong')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }


    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModa
