'use client';

import { todoSortOptions } from '@/utils/select';
import { Box, FormControl, Select, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function SortForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChangeSort = (selectedSort: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedSort) {
      params.set('sort', selectedSort);
    } else {
      params.delete('sort');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Box mb='4'>
      <FormControl display='flex' justifyContent='flex-end' alignItems='center'>
        <Text mr='2'>並び替え</Text>
        <Select
          bg='white'
          w='15%'
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleChangeSort(e.target.value)
          }
        >
          {todoSortOptions.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
