import { StatusOptions } from '@/types/types';
import { Box, FormControl, Select } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

type FormSelectProps = {
  label: string;
  register?: UseFormRegisterReturn;
  options: StatusOptions[];
};

export const FormSelect = ({ label, register, options }: FormSelectProps) => {
  return (
    <Box mb='4'>
      <FormControl>
        {label}
        <Select bg='white' w='50%' {...register}>
          {options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
