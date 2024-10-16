import Box from '@cobalt/react-box';

import { EventEmitter } from '@industries-packages/utils-emitter';

import { EventAction } from '@/modal';

type BoxProps = React.ComponentProps<typeof Box>;

export const HACKATHON_NAME = 'Smart Reports';

export const PADDING_SPACING: BoxProps['padding'] = [3, 4, 6];

export const HACKATHON_RECEIVED_NAME = 'Smart Reports Bot';

export const HACKATHON_SENT_NAME = 'Sara Smith';

export const eventBus = new EventEmitter<EventAction>();
