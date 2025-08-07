import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Gauge } from '@backstage/core-components';

type GaugeCardProps = {
  title: string;
  value: number;
  min?: number;
  max?: number;
  unit?: string;
};

export const GaugeCard = ({ title, value, min = 0, max = 100, unit = '%' }: GaugeCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Gauge value={value} min={min} max={max} valueUnit={unit} />
      </CardContent>
    </Card>
  );
};