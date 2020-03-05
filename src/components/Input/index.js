import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { StyledInput } from './styles';

export default function Input({ name, ...rest }) {
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  const inputRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, inputRef, registerField]);

  return (
    <StyledInput>
      <input ref={inputRef} defaultValue={defaultValue} {...rest} />

      {error && <span style={{ color: 'red' }}>{error}</span>}
    </StyledInput>
  );
}
