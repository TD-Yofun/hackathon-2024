/*
 *  Talkdesk Confidential
 *
 *  Copyright (C) Talkdesk Inc. 2021
 *
 *  The source code for this program is not published or otherwise divested
 *  of its trade secrets, irrespective of what has been deposited with the
 *  U.S. Copyright Office. Unauthorized copying of this file, via any medium
 *  is strictly prohibited.
 */

import { useTheme } from '@cobalt/react-theme-provider';
import { useViewport } from '@cobalt/react-viewport-provider';

import { useResponsive } from '@industries-packages/react-hooks';

import { useDispatch } from '@/store';

export const useHooks = () => {
  const theme = useTheme();
  const viewport = useViewport();
  const dispatch = useDispatch();
  const responsiveValue = useResponsive();

  return {
    theme,
    viewport,
    dispatch,
    responsiveValue,
  };
};
