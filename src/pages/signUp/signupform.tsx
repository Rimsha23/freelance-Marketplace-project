import { Checkbox, Form, Select, notification } from 'antd/es'
import InputComponent from '../../common-components/input'
import "./signup.css"
import ButtonComp from '../../common-components/button'
import { backArrow1, google1, linkdin1 } from '../../utils/constants'
import { useDispatch, } from 'react-redux'
import { signup } from '../../store/sign-Up/SignUpSlice'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../store/root-store'
export const SignUpForm: React.FC = () => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate();
    const onFinish = (values: {
        full_name: string;
        email: string;
        password: string;
        confirm_password: string;
        user_choices: null;
    }) => {
        const formData = {
            full_name: values.full_name,
            email: values.email,
            password: values.password,
            confirm_password: values.confirm_password,
            user_choices: values.user_choices,
        };
        console.log("form data", formData)
        dispatch(signup(formData))
        if (form.isFieldsTouched(true) && form.getFieldsError().filter(({ errors }) => errors.length).length === 0) {
            navigate('/login');
        }
    };
    return (
        <>
            <div className='flex flex-col items-center justify-center mt-20 md:mt-10 space-y-1 lg:space-y-3 md:space-y-1 mx-10'>
                <h1 className='text-white text-base mb-1 md:mb-2 md:text-xl lg:text-2xl xl:text-[30px] font-semibold leading-normal libre-text '>Join as Expert or Business</h1>
                <div className='w-[300px] h-full md:w-[60%] lg:w-[450px] lg:h-[880px] xl:w-[520px] xl:h-[900px] bg-[#FFF] shadow lg:p-6 md:p-6 p-3'>
                    <Form
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                        className='space-y-3 lg:flex lg:flex-col'>
                        <Form.Item
                            name="full_name"
                            rules={[{ required: true, message: 'Please input your Name' }]}
                            className='-mb-[-1px]'
                        >
                            <InputComponent type='text' name='full_name' label='Full Name' placeholder='Type full name' variant='primary' size='medium' />
                        </Form.Item>
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
                            <InputComponent type='email' name='email' label='Email' placeholder='Type email' variant='primary' size='medium' />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <InputComponent type='password' name='password' label='Password' placeholder='Type password' variant='primary' size='medium' />
                        </Form.Item>
                        <Form.Item
                            name="confirm_password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <InputComponent name='confirm_password' type='password' label='Confirm Password' placeholder='Type password' variant='primary' size='medium' />
                        </Form.Item>
                        <label className="block text-xs md:text-sm lg:text-base xl:text-g text-[#808080] khula-text font-semibold leading-normal mb-2">
                            Join as
                        </label>
                        <Form.Item
                            name="user_choices"
                            rules={[{ required: true, message: 'Please select field!' }]}
                        >
                            <Select placeholder="Select" className='border-[1px] border-[#808080] rounded-[8px] bg-[#FFF] text-[14px] font-normal khula-text h-[55px]'  >
                                <Option value="expert">Expert</Option>
                                <Option value="business">Business</Option>
                                <Option value="admin">Admin</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(notification.error({
                                            message: 'Error',
                                            description: 'Accept Terms and Conditions.',
                                        })),
                                },
                            ]}
                        >
                            <div className='flex md:col-span-1 lg:gap-3 gap-1 pt-2'>
                                <Checkbox className='lg:mt-[3px] md:mt-0.5 xl:mt-1' /><p className='khula-text text-[10px] mt-1 md:ml-0 md:mt-1.5 md:text-xs lg:ml-[-4px] xl:text-sm font-normal lg:pt-[2px]'>By signing up, you agree to our </p> <Link to={'/SettingsPrivacyPolicy'} className='md:mt-1 lg:mt-1.5'><span className='khula-text text-[10px] text-[#3A0F7D] mt-1 md:mt-1 md:ml-1 lg:ml-[-6px] xl:ml[-1px] lg:mt-1.5 md:text-sm lg:text-sm xl:text-base font-bold'>Terms
                                    and Conditions</span></Link>

                            </div>
                        </Form.Item>
                        <div className='flex items-center justify-center pt-2 md:pt-3 lg:pt-6 xl:pt-3'>
                            <ButtonComp text='Sign Up' variant='violet'
                                htmlType='submit'
                                className='mt-1 h-8 py-[1px] text-xs font-normal lg:font-bold md:h-9 lg:w-40 lg:h-12 xl:w-[209px] xl:h-[54px] xl:text-sm khula-text leading-normal'
                            />
                        </div>
                        <div className=''>
                            <div className='flex items-center justify-center space-x-2 xl:pt-3'>
                                <hr className="w-20 md:w-30 lg:w-32 xl:w-40  h-[1px] my-4 bg-gray-100 border-0 rounded  dark:bg-gray-400" />
                                <p className='khula-text text-[#808080] text-xs font-normal w-20 xl:w-24 xl:text-sm  px-[1px]'>or signup with</p>
                                <hr className="w-20 md:w-30 lg:w-32 xl:w-40 h-[1px] my-4 bg-gray-100 border-0 rounded  dark:bg-gray-400" />
                            </div>
                            <div className='flex items-center justify-center gap-8 xl:pt-2'>
                                <img src={google1} className='w-8 md:w-9 lg:w-10 xl:w-12' />
                                <img src={linkdin1} className='w-8 md:w-9 lg:w-10 xl:w-12' />
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            <div className='flex justify-center lg:justify-start space-x-1 md:mx-12'>
                <img src={backArrow1} className='w-5 h-3 md:w-6 md:h-3 md:mt-2.5 lg:w-7 lg:h-3 xl:w-9 xl:h-4 mt-2' /><p className='text-[#FFF] mt-1 text-xs md:text-[15px] xl:text-lg font-bold leading-normal khula-text'>Cancel, Creating account</p>
            </div>
        </>
    )
}