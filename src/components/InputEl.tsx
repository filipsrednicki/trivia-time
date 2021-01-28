import React from "react";

interface Props {
  label: string;
  id: string;
  type: string;
  value: string;
  setValue: (e: string) => void;
  minLength?: number;
  maxLength?: number;
  className?: string;
}

const InputEl: React.FC<Props> = ({
  label,
  id,
  type,
  value,
  setValue,
  minLength,
  maxLength,
  className
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        minLength={minLength}
        maxLength={maxLength}
        className={className}
        required
      />
    </>
  );
};

export default InputEl;
