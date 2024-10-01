/* eslint-disable no-console */
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import cc from 'classcat';

import Button from '@cobalt/react-button';
import Flex from '@cobalt/react-flex';

import Icon from '@industries-packages/react-icon';

import { routes } from '@/router';

import appConnectorSvg from './assets/app_connector.svg?raw';
import styles from './styles.module.scss';

const AtlasMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const menus = useMemo(() => {
    const list = routes.filter((v) => v.metaData);
    return list;
  }, []);

  return (
    <Flex paddingTop={2} width="100%" height="100%" direction="column" alignY="space-between">
      <Flex width="100%" direction="column" gap={1}>
        {menus.map((menu) => {
          const { metaData, path } = menu;
          const isActive = currentPath.startsWith(path!);
          return (
            <Button
              key={path}
              type="secondary"
              variation="transparent"
              className={cc({
                [styles['menu']]: true,
                [styles['menu--active']]: isActive,
              })}
              onClick={() => navigate(path!)}
            >
              <Icon svg={metaData?.icon || ''} size="large" style={{ color: isActive ? '#fff' : 'var(--gray-700)' }} />
            </Button>
          );
        })}
      </Flex>

      <Button
        type="secondary"
        variation="transparent"
        className={cc({
          [styles['menu']]: true,
        })}
      >
        <Icon svg={appConnectorSvg} size="large" style={{ color: 'var(--gray-700)' }} />
      </Button>
    </Flex>
  );
};

export default AtlasMenu;
