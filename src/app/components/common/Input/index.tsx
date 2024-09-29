import './index.scss';

type InputProps = {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isValid?: boolean;
    placeholder?: string;
    id?: string;
    dataKey?: string;
    children?: React.ReactNode | null;
    readonly?: boolean;
    type?: React.HTMLInputTypeAttribute | undefined;
    errorMessage?: string;
    className?: string;
    disabled?: boolean;
    label?: string;
};

export const Input: React.FC<InputProps> = ({
    value,
    onChange,
    isValid = true,
    placeholder = '',
    children = null,
    id = '',
    dataKey = '',
    readonly = false,
    type = 'text',
    errorMessage = '',
    className = '',
    disabled = false,
    label='',
}) => {
    return <div className="common-input">
        {label && <label className="common-input__label" htmlFor={id}>{label}</label>}
        <input
            className={`common-input__input ${isValid ? '' : 'not-valid'} ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={type}
            id={id}
            readOnly={readonly}
            data-key={dataKey}
            disabled={disabled}
        />
        {errorMessage && !isValid &&
            <p className="common-input__error">
                {errorMessage}
            </p>
        }
        {children && children}
    </div>;
};
