import { Input } from "antd";
import React from "react";
import { DatePicker, Space, Select } from "antd"
interface Options {
   label:string;
   value:string;
}
import { lock_icon, mail_Icon } from "../../utils/constants";
type InputComponentProps = {
    type?: string;
    name?: string;
    variant?: string;
    size?: string;
    value?: string | number;
    prefixicon?: string;
    suffixicon?: string;
    inputId?: number;
    defaultValue?: string;
    placeholdercolor?: string;
    label?: string;
    maxtagcount?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    placeholder?: string;
    autoComplete?: string;
    rows?: number;
    options?: Options[] | undefined;
    allowclear?: boolean;
    isDisabled?: boolean
};

const variants: { [key: string]: string } = {
    primary: "border-[1px] border-[#808080] rounded-[8px] bg-[#FFF] text-[14px] font-normal khula-text",
    secondary: " border-none rounded-[8px] bg-[#EFEFEF] text-[15px] font-normal khula-text",
};
const placeholdercolors: { [key: string]: string } = {
    gray: " placeholder-[#D0D0D0]",
    black: " placeholder-black",
};
const sizes: { [key: string]: string } = {
    small: "h-[55px] w-24",
    smaller: "h-[45px] w-24",
    medium: "h-[55px] w-full",
    large: "h-[60px] w-full",
};
const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const InputComponent: React.FC<InputComponentProps> = ({
    type,
    name,
    variant = "primary",
    size = "medium",
    value,
    prefixicon,
    suffixicon,
    defaultValue,
    placeholdercolor = "gray",
    label,
    rows,
    onChange,
    maxtagcount,
    className,
    placeholder,
    autoComplete,
    options,
    allowclear,
    isDisabled
}) => {
    switch (type) {
        case "textarea":
            return (
                <div>
                    <label className="block text-xs md:text-sm lg:text-base xl:text-g text-[#808080] khula-text font-semibold leading-normal mb-2">
                        {label}
                    </label>
                    <Input.TextArea
                        placeholder={placeholder}
                        rows={rows}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className={`${className} ${variants[variant]} ${sizes[size]} ${placeholdercolors[placeholdercolor]}   pl-4 py-2 khula-text`}
                        defaultValue={defaultValue}
                        autoComplete={autoComplete} />
                </div>
            )
        case "date":
            return (
                <div>
                    <label className="block text-xs md:text-sm lg:text-base xl:text-g text-[#808080] khula-text font-semibold leading-normal mb-2">
                        {label}
                    </label>
                    <div className='relative'>
                        <Space direction="horizontal" size={5}>
                            <DatePicker renderExtraFooter={() => 'extra footer'} showTime
                                suffixIcon={<img src={suffixicon} />}
                                placeholder={placeholder}
                                className={`${className} ${variants[variant]} ${sizes[size]} ${placeholdercolors[placeholdercolor]} pl-10`}

                            />
                        </Space>
                        <img src={prefixicon} className='absolute top-3.5 left-3 pt-1' />
                    </div>
                </div>
            )
        case "select":
            return (
                <div>
                    <label className="block text-xs md:text-sm lg:text-base xl:text-g text-[#808080] khula-text font-semibold leading-normal mb-2">
                        {label}
                    </label>
                    <Select
                        defaultValue={defaultValue}
                        maxTagCount={maxtagcount}
                        placeholder={placeholder}
                        suffixIcon={<img src={suffixicon} />}
                        className={`${className} ${variants[variant]} ${sizes[size]} ${placeholdercolors[placeholdercolor]}`}
                        allowClear={allowclear}
                        onChange={handleChange}>
                      {options && options.map((option) => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            )
        default:
            return (
                <div>
                    <label className="block text-xs md:text-sm lg:text-base xl:text-g text-[8px] text-[#808080] khula-text font-semibold leading-normal mb-2">
                        {label}
                    </label>
                    <div className="relative">
                        <Input
                        disabled = {isDisabled}
                            placeholder={placeholder}
                            type={type}
                            name={name}
                            value={value}
                            onChange={onChange}
                            className={`${className} ${variants[variant]} ${sizes[size]} ${placeholdercolors[placeholdercolor]} ${prefixicon ? 'pl-10' : 'pl-4'} khula-text px-3 py-3`}
                            defaultValue={defaultValue}
                            autoComplete={autoComplete}
                        />
                        <img src={prefixicon} className={`${mail_Icon ? 'pt-1.5' : 'pt-1'} absolute top-3.5 left-3 `} />
                        <img src={suffixicon} className={`${lock_icon ? 'pt-1.5' : 'pt-1'} absolute top-3.5 right-3 pt-1`} />
                    </div>
                </div>
            )
    }
}
export default InputComponent;
