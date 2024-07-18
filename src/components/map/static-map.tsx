/* eslint-disable */
// @ts-nocheck

import React, {useContext, PropsWithChildren} from 'react';

import {APIProviderContext} from '../api-provider';
import type {MapProps} from './map';

const MAPS_API_STATIC_URL = 'https://maps.googleapis.com/maps/api/staticmap';

export const StaticMap = (props: PropsWithChildren<MapProps>) => {
  const addSearchParams = (url, params = {}) =>
    new URL(
      `${url.origin}${url.pathname}?${new URLSearchParams([
        ...Array.from(url.searchParams.entries()),
        ...Object.entries(params)
      ])}`
    ).toString();

  const {apiKey} = useContext(APIProviderContext);

  let imgSrc = new URL(MAPS_API_STATIC_URL);
  const newParams = {key: apiKey, scale: 2, size: '640x640'};

  Object.entries(props).forEach(([key, val]) => {
    switch (key) {
      case 'defaultCenter':
        newParams.center = `${val.lat},${val.lng}`;
        break;
      case 'zoom':
        newParams.zoom = Math.max(0, val - 1);
        break;
    }
  });

  return <img src={addSearchParams(imgSrc, newParams)} width="100%" />;
};
