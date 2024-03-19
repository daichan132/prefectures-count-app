import { Group, ScrollArea, Table, UnstyledButton, Text, Center, rem } from '@mantine/core';
import React, { useState } from 'react';
import cx from 'clsx';
import { IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import classes from './JapanCountTable.module.css';
import geoJson from '../../assets/japan.json';

interface JapanCountTableProps {
  countData: Record<string, number>;
  hilightZeroCount: boolean;
}

export const JapanCountTable = ({ countData, hilightZeroCount }: JapanCountTableProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  // ソートハンドラー
  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) =>
      prevSortOrder === 'asc' ? 'desc' : prevSortOrder === 'desc' ? null : 'asc'
    );
  };

  // ソートロジック
  const sortedEntries = Object.entries(countData).sort(([, valueA], [, valueB]) => {
    if (sortOrder === 'asc') {
      return valueA - valueB;
    } if (sortOrder === 'desc') {
      return valueB - valueA;
    }
    return 0;
  });

  const SortIcon = sortOrder === 'asc' ? IconChevronUp : sortOrder === 'desc' ? IconChevronDown : IconSelector;

  return (
    <ScrollArea
      style={{ flexGrow: 1, userSelect: 'none' }}
      scrollbarSize={10}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table withColumnBorders>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th onClick={toggleSortOrder}>都道府県</Table.Th>
            <Table.Th onClick={toggleSortOrder}>
              <UnstyledButton onClick={toggleSortOrder} w="100%">
                <Group justify="space-between">
                  <Text fw={800} fz="sm">
                    カウント
                  </Text>
                  <Center>
                    <SortIcon style={{ width: rem(16), height: rem(16) }} stroke={2} />
                  </Center>
                </Group>
              </UnstyledButton>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sortedEntries.map(([key, value]) => (
            <Table.Tr key={key} bg={hilightZeroCount && value === 0 ? 'gray.3' : undefined}>
              <Table.Td>
                {geoJson.features.find((feature) => feature.properties.name.toLowerCase() === key)
                  ?.properties.name_ja}
              </Table.Td>
              <Table.Td>{value}</Table.Td>
            </Table.Tr>
          ))}
          <Table.Tr>
            <Table.Td>合計</Table.Td>
            <Table.Td>{sortedEntries.reduce((acc, [, cur]) => acc + cur, 0)}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
