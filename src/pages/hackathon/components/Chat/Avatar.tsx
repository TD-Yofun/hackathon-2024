import React, { useMemo } from 'react';

import CobaltAvatar from '@cobalt/react-avatar';
import Icon, { Name } from '@cobalt/react-icon';
import { Text } from '@cobalt/react-typography';

const getShortName = (name?: string) => {
  if (!name?.trim()) {
    return '';
  }
  let result = '';
  name = name.trim();
  const splits = name.split(' ');

  if (splits.length === 1) {
    result = splits[0].substring(0, 2);
  } else if (splits.length > 1) {
    result = splits[0].substring(0, 1) + splits[1].substring(0, 1);
  }

  return result;
};

type AvatarProps = React.ComponentProps<typeof CobaltAvatar>;

export const USER_AVATAR_ICON_NAME = 'user';
export const AGENT_AVATAR_ICON_NAME = 'headset_mic';
export const VIRTUAL_AGENT_ICON_NAME = 'robot';

type Props = {
  size: AvatarProps['size'];
  color?: AvatarProps['color'];
  name?: string;
  icon?: Name;
};

const Avatar = (props: Props): JSX.Element => {
  const { size, color = 'light-theme', name, icon = USER_AVATAR_ICON_NAME } = props;

  const TextContent = useMemo(() => {
    const shortName = getShortName(name);
    if (shortName) {
      return <Text>{shortName}</Text>;
    }
  }, [name]);

  return (
    <CobaltAvatar color={color} data-testid="user-avatar" size={size}>
      {TextContent ? TextContent : <Icon name={icon} size="tiny" />}
    </CobaltAvatar>
  );
};

export default Avatar;
