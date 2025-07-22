import { Checkbox, Form } from 'antd'
import React, { useState } from 'react'
import InputComponent from '../../common-components/input'
import "./index.css"
import ButtonComp from '../../common-components/button'
import { google1, linkdin1, lock_icon, mail_Icon } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { login } from '../../store/login/loginSlice'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../store/root-store'

export const LoginForm: React.FC = () => {
    const [errors, setErrors] = useState<string | null>(null)
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch()
    const onFinish = async (values: {
        email: string,
        password: string
    }) => {
        const formData = {
            email: values.email,
            password: values.password,
        };

        try {
            const result = await dispatch(login(formData));

            if (login.fulfilled.match(result)) {
                const authToken = localStorage.getItem('authToken');
                const userType = localStorage.getItem('userType');
                if (authToken && userType) {
                    switch (userType) {
                        case "expert":
                            navigate("/timetracker");
                            window.location.reload();
                            break;
                        case "business":
                            navigate("/my_team");
                            window.location.reload();
                            break;
                        case "admin":
                            navigate("/approveaccounts");
                            window.location.reload();
                            break;
                        default:
                            navigate('/');
                            break;
                    }
                } else {
                    setErrors('Authentication token not found.');
                }
            } else {
                setErrors('Invalid Email or Password!');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };


    return (
        <>
            <div className='flex flex-col items-center space-y-1 justify-center mt-24 md:mt-10 lg:space-y-3 md:space-y-1  md:mx-10'>
                <h1 className='text-white text-base mb-1 md:mb-2 md:text-xl lg:text-2xl xl:text-[30px] font-semibold leading-normal libre-text '>Login</h1>
                <div className='w-[300px] h-[460px] md:w-[50%] md:h-[500px] lg:w-[400px] lg:h-[530px]  xl:w-[449px] xl:h-[560px] bg-[#FFF] lg:p-6 md:p-6 p-3 shadowlogin'>
                    <Form
                        name="normal_login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        className='space-y-3'
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                { required: true, message: 'Please input your Email' }]}
                        >
                            <InputComponent type='text' label='Email' placeholder='Type email' variant='primary' prefixicon={mail_Icon} className='h-[55px]' />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <InputComponent type='password' label='Password' placeholder='Type password' variant='primary' prefixicon={lock_icon} className='h-[55px]' />
                        </Form.Item>
                        <div className='flex gap-12 justify-between'>
                            <Checkbox className='khula-text text-xs lg:text-sm font-normal leading-normal'>Remember me</Checkbox>
                            <Link to={'/forgotpassword'}>
                                <span className='text-[#3A0F7D] text-xs lg:text-sm font-bold leading-normal'>Forgot Password</span>
                            </Link>
                        </div>
                        {errors && <p className='text-[#ff4d4f] flex justify-center'>{errors}</p>}
                        <div className='flex items-center justify-center pt-1 md:pt-2 lg:pt-3 xl:pt-5'>
                            <ButtonComp text='Login' htmlType="submit" variant='violet' className='mt-1 h-8 py-[1px] text-xs font-normal lg:font-bold md:h-9 lg:w-40 lg:h-12 xl:w-[209px] xl:h-[54px] xl:text-sm khula-text leading-normal' />
                        </div>
                        <div className=''>
                            <div className='flex items-center justify-center space-x-2'>
                                <hr className="w-20 md:w-30 lg:w-32 xl:w-40  h-[1px] my-4 bg-gray-100 border-0 rounded  dark:bg-gray-400" />
                                <p className='khula-text text-[#808080] text-xs font-normal w-20 xl:w-24 xl:text-sm  px-[1px]'>or signup with</p>
                                <hr className="w-20 md:w-30 lg:w-32 xl:w-40 h-[1px] my-4 bg-gray-100 border-0 rounded  dark:bg-gray-400" />
                            </div>
                            <div className='flex items-center justify-center gap-8 mt-3'>
                                <img src={google1} className='w-8 md:w-9 lg:w-10 xl:w-12 ' />
                                <img src={linkdin1} className='w-8 md:w-9 lg:w-10 xl:w-12 ' />
                            </div>
                            <div className='flex items-center justify-center mt-5 pb-4 lg:mt-8 xl:mt-14 xl:pb-3'>
                                <p className='khula-text text-xs lg:text-sm font-normal leading-normal'>Don’t have an account yet?</p>
                                <Link to={'/signup'}><span className='text-[#3A0F7D] text-xs lg:text-sm font-bold leading-normal'>Create New Account
                                </span></Link>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}