import { ScrollArea, Table } from '@mantine/core';
import React, { useState } from 'react';
import cx from 'clsx';
import classes from './JapanCountTable.module.css';
import geoJson from '../../assets/japan.json';

interface JapanCountTableProps {
  countData: Record<string, number>;
  hilightZeroCount: boolean;
}
export const JapanCountTable = (
  { countData, hilightZeroCount }: JapanCountTableProps
) => {
  const [scrolled, setScrolled] = useState(false);
  return (
    <ScrollArea
      style={{ flexGrow: 1, userSelect: 'none' }}
      scrollbarSize={10}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table withColumnBorders>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>都道府県</Table.Th>
            <Table.Th>カウント</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            Object.entries(countData).map(([key, value]) => (
              <Table.Tr key={key} bg={hilightZeroCount && value === 0 ? 'gray.3' : undefined}>
                <Table.Td>
                  {
                    geoJson.features.find(
                      (feature) =>
                        feature.properties.name.toLowerCase() === key)?.properties.name_ja
                  }
                </Table.Td>
                <Table.Td>{value}</Table.Td>
              </Table.Tr>
            ))
          }
          <Table.Tr>
            <Table.Td>合計</Table.Td>
            <Table.Td>{Object.values(countData).reduce((acc, cur) => acc + cur, 0)}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
