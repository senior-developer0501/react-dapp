import React, { Suspense } from 'react';

import InlineSVG from '~/client/components/InlineSVG';
import styles from '~/client/styles/variables';

import snugglepunks from '~/client/assets/images/snugglepunks.svg';

export const CLIP_PATH_DIMENSION = 300;
export const SNUGGLEPUNKS_COUNT = 12;

export const ClipPathEllipsis = () => {
  return (
    <ellipse
      cx={CLIP_PATH_DIMENSION / 2}
      cy={CLIP_PATH_DIMENSION / 2}
      rx={CLIP_PATH_DIMENSION / 2}
      ry={CLIP_PATH_DIMENSION / 4}
    />
  );
};

export const ClipPathCorners = () => {
  return (
    <ellipse
      cx={CLIP_PATH_DIMENSION / 2}
      cy={CLIP_PATH_DIMENSION / 2}
      rx={CLIP_PATH_DIMENSION / 3.5}
      ry={CLIP_PATH_DIMENSION / 3}
    />
  );
};

export const ClipPathRectangle = () => {
  return (
    <rect
      height={CLIP_PATH_DIMENSION / 1.5}
      rx="10"
      width={CLIP_PATH_DIMENSION / 1.5}
      x={CLIP_PATH_DIMENSION / 6}
      y={CLIP_PATH_DIMENSION / 6}
    />
  );
};

export const ClipPathSnake = () => {
  return (
    <path
      d="M1 1L200 1L200 159C132 124 93 111 85 120C72 133 129 184 117 197C109 206 70 193 1 159L1 1Z"
      transform="translate(50, 50)"
    />
  );
};

export const CLIP_PATHS = {
  'clip-path-corners': ClipPathCorners,
  'clip-path-ellipsis': ClipPathEllipsis,
  'clip-path-rectangle': ClipPathRectangle,
  'clip-path-snake': ClipPathSnake,
};

// We need this component in the DOM so other elements can refer to it, but
// keep it hidden from the user!
const SVGDefinitions = () => {
  return (
    <div
      aria-hidden={true}
      style={{
        position: 'absolute',
        top: -CLIP_PATH_DIMENSION,
        left: -CLIP_PATH_DIMENSION,
      }}
    >
      <svg
        height={CLIP_PATH_DIMENSION}
        width={CLIP_PATH_DIMENSION}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <SVGDefinitionsClipPaths />
          <SVGDefinitionsFilters />
        </defs>
      </svg>

      <Suspense fallback={null}>
        <SVGDefinitionsSnugglepunks />
      </Suspense>
    </div>
  );
};

// Clip path definitions to shape elements
const SVGDefinitionsClipPaths = () => {
  return Object.keys(CLIP_PATHS).map((clipPathId) => {
    const ClipPathDefinition = CLIP_PATHS[clipPathId];

    return (
      <clipPath id={clipPathId} key={clipPathId}>
        <ClipPathDefinition />
      </clipPath>
    );
  });
};

// Filter definitions to manipulate element colors
const SVGDefinitionsFilters = () => {
  return Object.keys(styles.schemes).map((schemeId) => {
    return (
      <filter id={`filter-${schemeId}`} key={schemeId}>
        <feFlood
          floodColor={styles.schemes[schemeId].foreground}
          result="flood"
        />

        <feComposite
          in="flood"
          in2="SourceAlpha"
          operator="atop"
          result="floodMasked"
        />

        <feBlend in="SourceGraphic" in2="floodMasked" mode="screen" />
      </filter>
    );
  });
};

// Snugglepunk SVG sprites
const SVGDefinitionsSnugglepunks = () => {
  return <InlineSVG url={snugglepunks} />;
};

export default SVGDefinitions;
