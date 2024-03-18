import { Center } from '@mantine/core';
import { JapanMap } from '@/features/japan-map';

export default function HomePage() {
  return (
    <Center w="100%" h="100vh">
      <JapanMap initialCountData={{}} />
    </Center>
  );
}
