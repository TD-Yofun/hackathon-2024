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

import { useState } from 'react';

import Box from '@cobalt/react-box';
import Button from '@cobalt/react-button';
import Flex from '@cobalt/react-flex';
import Input from '@cobalt/react-input';
import Modal, { Dialog } from '@cobalt/react-modal';
import { Portal } from '@cobalt/react-portal-provider';
import Tag from '@cobalt/react-tag';
import { Heading, Text } from '@cobalt/react-typography';

import { PADDING_SPACINGS } from '@industries-compositions/financial-utils';

import { useHooks } from '@/hooks/useHooks';

interface ConfirmModalProps {
  defaultValue: string;
  onCancel: () => void;
  onConfirm: (value: string) => void;
}

const SaveModal = ({ defaultValue, onCancel, onConfirm }: ConfirmModalProps) => {
  const { viewport } = useHooks();

  const smallViewport = viewport === 'small';

  const [value, setValue] = useState(defaultValue);

  return (
    <Portal>
      <Modal data-testid="confirm-modal" size="small" visible={true} focusOptions={false}>
        <Dialog style={{ minHeight: '0px', ...(smallViewport && { width: '320px', margin: 'auto' }) }}>
          <Flex direction="column" padding={PADDING_SPACINGS} gap={8}>
            <Box>
              <Heading level={2}>Create Report</Heading>
            </Box>

            <Flex direction="column" gap={2} width="100%">
              <Flex width="100%" alignX="space-between" alignY="center">
                <Text>Name</Text>
                <Tag>{value.length}/64</Tag>
              </Flex>
              <Input
                placeholder="Enter report name"
                value={value}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.length > 64 ? value.slice(0, 64) : value;
                  setValue(value);
                }}
              />
            </Flex>

            <Flex alignX="center" width="100%" gap={3}>
              <Button type="secondary" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={() => onConfirm(value)} disabled={value.length === 0}>
                Confirm
              </Button>
            </Flex>
          </Flex>
        </Dialog>
      </Modal>
    </Portal>
  );
};

export default SaveModal;
