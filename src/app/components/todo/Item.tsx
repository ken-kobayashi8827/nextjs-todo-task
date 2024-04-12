import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';

export default function Item() {
  return (
    <Box w='100%' pb='3' pl='3' pr='3' borderBottom='1px solid black'>
      <HStack>
        <Heading fontSize='xl' fontWeight='bold' p='3' w='100%'>
          テスト
        </Heading>
        <Button w='15%' colorScheme='red'>
          削除
        </Button>
        <Button w='15%' colorScheme='blue'>
          編集
        </Button>
      </HStack>
      <VStack alignItems='start' mb='3'>
        <Text fontSize='lg' w='100%' pl='3'>
          テスト詳細
        </Text>
      </VStack>
    </Box>
  );
}
