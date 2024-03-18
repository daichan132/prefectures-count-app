'use client';

import { AppShell, Center, ColorInput, Stack } from '@mantine/core';
import { useState } from 'react';
import { JapanMap } from '@/features/japan-map';

export default function HomePage() {
  const [color, setColor] = useState('#eea4a9');
  const [countData, setCountData] = useState<Record<string, number>>({});
  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'xs',
      }}
    >
      <AppShell.Navbar p="md" bg="gray.0">
        <Stack gap="md">
          <ColorInput
            label="テーマカラー"
            value={color}
            onChange={setColor} />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Center w="100%" h="100vh" style={{ overflow: 'hidden' }}>
          <JapanMap
            initialCountData={countData}
            color={color}
            onChange={(data) => setCountData(data)} />
        </Center>
      </AppShell.Main>
    </AppShell>
  );
}
