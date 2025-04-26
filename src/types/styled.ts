import styled, { type IStyledComponent } from 'styled-components';
import { ThemeTokens } from './theme';
import React from 'react';

export const themed = styled as unknown as <T extends keyof React.JSX.IntrinsicElements | IStyledComponent<any, any>>(
  component: T
) => IStyledComponent<T, ThemeTokens>;

export type ThemeProps = {
  theme: ThemeTokens;
};

export const getColor = (color: keyof ThemeTokens['colors']) => {
  return ({ theme }: ThemeProps) => theme.colors[color];
};

export const getSpacing = (space: keyof ThemeTokens['spacing']) => {
  return ({ theme }: ThemeProps) => theme.spacing[space];
};

export const getFontSize = (size: keyof ThemeTokens['typography']['fontSize']) => {
  return ({ theme }: ThemeProps) => theme.typography.fontSize[size];
};

export const getBorderRadius = (radius: keyof ThemeTokens['borderRadius']) => {
  return ({ theme }: ThemeProps) => theme.borderRadius[radius];
};

export const getShadow = (shadow: keyof ThemeTokens['shadows']) => {
  return ({ theme }: ThemeProps) => theme.shadows[shadow];
};

export const getTransition = (speed: keyof ThemeTokens['transitions']) => {
  return ({ theme }: ThemeProps) => theme.transitions[speed];
}; 