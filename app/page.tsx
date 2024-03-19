'use client';

import { AppShell, Blockquote, Center, ColorInput, NumberInput, Stack, Switch, Text } from '@mantine/core';
import { useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { JapanCountTable, JapanMap } from '@/features/japan-map';

export default function HomePage() {
  const [color, setColor] = useState('#f06595');
  const [maxCount, setMaxCount] = useState<string | number>(10);
  const [checked, setChecked] = useState(false);
  const [countData, setCountData] = useState<Record<string, number>>(
    {
      hokkaido: 0,
      aomori: 0,
      iwate: 0,
      miyagi: 0,
      akita: 0,
      yamagata: 0,
      fukushima: 0,
      ibaraki: 0,
      tochigi: 0,
      gunma: 0,
      saitama: 0,
      chiba: 0,
      tokyo: 0,
      kanagawa: 0,
      niigata: 0,
      toyama: 0,
      ishikawa: 0,
      fukui: 0,
      yamanashi: 0,
      nagano: 0,
      gifu: 0,
      shizuoka: 0,
      aichi: 0,
      mie: 0,
      shiga: 0,
      kyoto: 0,
      osaka: 0,
      hyogo: 0,
      nara: 0,
      wakayama: 0,
      tottori: 0,
      shimane: 0,
      okayama: 0,
      hiroshima: 0,
      yamaguchi: 0,
      tokushima: 0,
      kagawa: 0,
      ehime: 0,
      kochi: 0,
      fukuoka: 0,
      saga: 0,
      nagasaki: 0,
      kumamoto: 0,
      oita: 0,
      miyazaki: 0,
      kagoshima: 0,
      okinawa: 0,
    });
  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'xs',
      }}
    >
      <AppShell.Navbar p="md" h="100vh">
        <Stack gap="md" h="100%">
          <Blockquote color="blue" icon={<IconInfoCircle />} p="md">
            <Text size="sm">
              左クリック: カウント
              <br />
              右クリック: マイナスカウント
            </Text>
          </Blockquote>
          <ColorInput
            label="テーマカラー"
            value={color}
            onChange={setColor} />
          <NumberInput
            label="色が濃くなる最大カウント"
            value={maxCount}
            min={1}
            onChange={setMaxCount}
          />
          <Switch
            py="xs"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            label="カウントが0の県を目立たせる"
          />
          <JapanCountTable countData={countData} hilightZeroCount={checked} />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Center w="100%" h="100vh" style={{ overflow: 'hidden' }}>
          <JapanMap
            initialCountData={countData}
            color={color}
            maxCount={maxCount as number}
            highlightZeroCount={checked}
            onChange={(name, count) => {
              setCountData((prev) => ({ ...prev, [name]: count }));
            }} />
        </Center>
      </AppShell.Main>
    </AppShell>
  );
}
