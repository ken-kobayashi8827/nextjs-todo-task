'use client';

import { todoFilterOptions } from '@/utils/select';
import { Box, FormControl, Select, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function FilterForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChangeFilter = (selectedFilter: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedFilter) {
      params.set('filter', selectedFilter.toString());
    } else {
      params.delete('filter');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Box mb='4'>
      <FormControl display='flex' alignItems='center'>
        <Text mr='2' whiteSpace='nowrap'>
          絞り込み
        </Text>
        <Select
          bg='white'
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleChangeFilter(e.target.value)
          }
        >
          {todoFilterOptions.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
