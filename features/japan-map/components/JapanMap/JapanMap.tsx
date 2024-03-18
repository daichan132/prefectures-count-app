'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import geoJson from '../../assets/japan.json';
import { useMounted } from '../../hooks/useMounted';
import { Feature } from '../../types';

interface JapanMapProps {
  initialCountData: Record<string, number>;
}
export const JapanMap = React.memo((
  { initialCountData }: JapanMapProps) => {
  const mounted = useMounted();
  const countDataRef = useRef(initialCountData);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const updateCount = useCallback((name: string) => {
    const countData = countDataRef.current;
    if (!countData[name]) countData[name] = 0;
    countData[name] += 1;
  }, []);

  async function main() {
    const width = mapContainerRef.current?.offsetWidth || 0;
    const height = mapContainerRef.current?.offsetHeight || 0;
    const centerPos: [number, number] = [137.0, 38.2]; // 地図のセンター位置
    const scale = 1000 * (Math.min(width, height) / 500);
    const color = '#2566CC'; // 地図の色

    // 地図設定
    const projection = d3
      .geoMercator()
      .center(centerPos)
      .translate([width / 2, height / 2])
      .scale(scale);

    // 地図をpathに投影(変換)
    const path = d3.geoPath().projection(projection);

    // SVG要素を追加
    const svg = d3
      .select(mapContainerRef.current)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%');

    // 都道府県の領域データをpathで描画
    svg
      .selectAll('path')
      .data(geoJson.features)
      .enter()
      .append('path')
      .attr('d', (d: any) => path(d))
      .attr('stroke', '#666')
      .attr('stroke-width', 0.25)
      .attr('fill', color)
      .attr('cursor', 'pointer')
      .attr('fill-opacity', (d: any) => {
        // 透明度の設定
        const count = countDataRef.current[d.properties.name.toLowerCase()];
        return count ? count * 0.05 : 0;
      })
      .on('click', (event: MouseEvent, d: any) => {
        // クリックイベントを追加したい場合はこちらに記述
        const name = d.properties.name.toLowerCase();
        updateCount(name); // カウントを更新

        // カウントが更新された都道府県の領域のスタイルを更新
        d3.select(event.currentTarget as d3.BaseType)
          .attr('fill-opacity', () => {
            const count = countDataRef.current[name];
            return count > 0 ? count * 0.05 : 0;
          });

        // ラベルグループが既に存在するかチェック
        const labelGroup = d3.select('#label-group');
        if (!labelGroup.empty()) {
          // ラベルグループが存在する場合、テキスト内容を更新
          const newLabel = `${d.properties.name_ja}(${countDataRef.current[name]}人)`;
          labelGroup.select('#label-text').text(newLabel);

          // テキストサイズに基づいて矩形サイズを再調整（必要に応じて）
          const textElementNode = labelGroup.select('#label-text').node() as SVGGraphicsElement;
          const textSize = textElementNode?.getBBox();
          labelGroup.select('#label-rect')
            .attr('x', textSize.x - 5)
            .attr('y', textSize.y)
            .attr('width', textSize.width + 10)
            .attr('height', textSize.height + 4);
        }
      })
      .on('mouseover', async function onMouseOver(this, event: MouseEvent, d: any) {
        // ラベル用のグループ
        const item: Feature = d;
        const group = svg.append('g').attr('id', 'label-group');
        const count = countDataRef.current[item.properties.name.toLowerCase()] || 0;
        // ラベルに表示する文字
        const label = `${item.properties.name_ja}(${count}人)`;
        // 矩形を追加: テキストの枠
        const rectElement = group
          .append('rect')
          .attr('id', 'label-rect')
          .attr('stroke', '#666')
          .attr('stroke-width', 0.5)
          .attr('fill', '#fff');

        // テキストを追加
        const textElement = group
          .append('text')
          .attr('id', 'label-text')
          .style('user-select', 'none')
          .text(label);

        // テキストのサイズから矩形のサイズを調整
        const padding = {
          x: 5,
          y: 0,
        };
        const textElementNode = textElement.node();
        if (!textElementNode) return;
        const textSize = textElementNode.getBBox();
        rectElement
          .attr('x', textSize.x - padding.x)
          .attr('y', textSize.y - padding.y)
          .attr('width', textSize.width + padding.x * 2)
          .attr('height', textSize.height + padding.y * 2);

        d3.select(this).attr('stroke-width', '1');
      })
      .on('mousemove', (event: MouseEvent) => {
        // テキストのサイズ情報を取得
        const node = svg.select('#label-text').node() as SVGGraphicsElement;
        const textSize = node.getBBox();
        // マウス位置からラベルの位置を指定
        const labelPos = {
          x: event.offsetX - textSize.width,
          y: event.offsetY - textSize.height,
        };

        // ラベルの位置を移動
        svg
          .select('#label-group')
          .attr('transform', `translate(${labelPos.x}, ${labelPos.y})`);
      })
      .on('mouseout', function onMouseOut(this) {
        // ラベルグループを削除
        svg.select('#label-group').remove();
        d3.select(this).attr('fill', color);
        d3.select(this).attr('stroke-width', '0.25');
      });
  }

  useEffect(() => {
    (async () => {
      if (mounted) await main();
    })();
    return () => {
      const target = document.getElementById('map-container');
      if (target) target.innerHTML = '';
    };
  }, [mounted]);

  return (
    <div ref={mapContainerRef} id="map-container" style={{ width: '100%', height: '100%' }} />
  );
});
