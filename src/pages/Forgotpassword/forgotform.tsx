import { Form, notification } from 'antd'
import React from 'react'
import InputComponent from '../../common-components/input'
import ButtonComp from '../../common-components/button'
import { backArrow1 } from '../../utils/constants'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '../../store/forgot-password/forgotSlice'
const Forgotform: React.FC = () => {
    const dispatch = useDispatch()
    const onfinsh = async (values: { email: string }) => {
        const formData = {
            email: values.email,
        }
        console.log("form data", formData)
        try {
            const result = await dispatch(forgotPassword(formData));

            if (forgotPassword.fulfilled.match(result)) {
                notification.success({
                    message: 'Success',
                    description: 'Password reset email sent successfully!',
                });
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Failed to send reset password email. Please try again.',
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <>
            <div className='flex flex-col items-center justify-center space-y- lg:space-y-3 md:space-y-1 md:mx-10'>
                <h1 className='text-white text-base mb-1 md:mb-2 md:text-xl lg:text-2xl xl:text-[30px] font-semibold leading-normal libre-text '>Forgot Password</h1>
                <div className='w-[300px] md:w-[50%] lg:w-[490px] xl:w-[500px]  h-[200px] md:h-[250px] bg-[#FFF] lg:p-6 md:p-6 p-3 shadowlogin'>
                    <Form onFinish={onfinsh} className='space-y-0'>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Invalid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <InputComponent type='email' label='Email' placeholder='Type email' variant='primary' className='h-[39px]  lg:h-[50px] lg:py-1 xl:h-[55px]' />
                        </Form.Item>
                        <div className='flex items-center justify-center pt-4'>
                            <ButtonComp htmlType='submit' text='Submit' variant='violet' className='mt-1 h-8 py-[1px] text-xs font-normal lg:font-bold md:h-9 lg:w-40 lg:h-12 xl:w-[209px] xl:h-[54px] xl:text-sm khula-text leading-normal' />
                        </div>
                    </Form>
                </div>
            </div>
            <Link to={'/login'}>
                <div className='flex justify-center lg:justify-start space-x-1 md:mx-12 '>
                    <img src={backArrow1} className='w-5 h-3 md:w-6 md:h-3 md:mt-2.5 lg:w-7 lg:h-3 xl:w-9 xl:h-4 mt-2' /><p className='text-[#FFF] mt-1 text-xs md:text-[15px] xl:text-lg font-bold leading-normal khula-text'>Cancel, Forgot Password</p>
                </div>
            </Link>
        </>
    )
}

export default Forgotform