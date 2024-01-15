'use client';

import {  useSession } from 'next-auth/react';
import {  useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { Input } from '@/components/inputs/input';
import { Button } from '@/components/button/Button';
import { sendMail } from "@/actions/email-verify";
import { checkOtp } from '@/actions/check-otp';
import Image from 'next/image';
import toast from 'react-hot-toast';
import mail from "@/public/images/X-Logo-PNG.png"
import mail2 from "@/public/images/X-White-Logo-PNG.png";
import { useVerified } from '../context';
import { useTheme } from 'next-themes';
import { User } from '@prisma/client';



const AuthForm = ({currentUser}:{currentUser:User}) => {
  const router = useRouter();
  const session=useSession();
  const {verified,setVerified}=useVerified();
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {theme}=useTheme();

  useEffect(()=>{
    if(session?.data?.user === null)
      router.push('/login');
  
  
  },[session?.data?.user,router])

  if (currentUser?.emailVerified) router.push("/");
  
  const email=session.data?.user?.email;
  if(email && !sent)
  {
    sendMail(email!)
    setSent(true)
  }
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const res=await checkOtp(data.otp,email!)
    if(res)
    {
      setVerified(true)
      toast.success("OTP Verified")
      setIsLoading(false);
      router.push("/");
    }
    else{
      toast.error("Invalid OTP")
      setIsLoading(false);
    }
  }

  return ( 
    <div className=" sm:mx-auto sm:w-full sm:max-w-md">
      <div className='flex flex-row items-center justify-center p-5'>
         <Image width={30} className='' height={30} src={theme==="dark"?mail2:mail2} alt=""/>
      </div>
      <div
        className="
          px-4
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
         <div>
          <div>Email Address: {email}</div>
         </div>
          <Input 
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="otp" 
            label="One Time Password" 
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
             Verify Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
 
export default AuthForm;