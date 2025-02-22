import { ChangeEvent, RefObject, useCallback, useState } from 'react';

interface NumberInputProps {
  className?: string;
  id: string;
  name: string;
  ref?: RefObject<HTMLInputElement> | null;
  pattern?: RegExp | string;
  maxLength?: number;
  placeholder?: string;
}

const NumberInput = ({
  id,
  className = '',
  ref = null,
  pattern = /(^\d{3})(\d{3,4})(\d{4}$)/,
  name,
  maxLength = 11,
  placeholder = '010-1234-5678',
}: NumberInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target) return;
      const value = e.target.value.replace(/[^0-9]/g, '');
      if (value.length > maxLength) return;
      if (pattern === '') {
        return setInputValue(() => value);
      }
      setInputValue(() => value.replace(pattern, `$1-$2-$3`));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputValue],
  );

  return (
    <input
      id={id}
      type="text"
      className={className}
      ref={ref}
      name={name}
      onChange={onChange}
      value={inputValue}
      // maxLength={maxLength}
      placeholder={placeholder}
    />
  );
};

export default NumberInput;
