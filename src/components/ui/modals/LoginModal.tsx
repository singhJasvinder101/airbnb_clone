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
import toast, { useToaster } from 'react-hot-toast'
import Button from '../elements/Button'
import useLoginModal from '@/hooks/useLoginModal'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface loginModalProps { }


const LoginModal: FC<loginModalProps> = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome Back !"
                subtitle="Login to your account"
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
                    onClick={() => {registerModal.onOpen(); loginModal.onClose()}}
                        className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
                    > Sign Up</span>
                </p>
            </div>
        </div>
    )

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials', { ...data, redirect: false })
            .then((cb) => {
                setIsLoading(false)

                if (cb?.ok) {
                    loginModal.onClose();
                    router.refresh()
                    toast.success('Logged in successfully');
                }
                if (cb?.error) {
                    // Handle the case when there is an error during login
                    console.log('Login failed:', cb.error);
                    toast.error(cb?.error);
                }
            })
    }


    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal
