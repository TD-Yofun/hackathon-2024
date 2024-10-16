import { PathRouteProps } from 'react-router-dom';

import Box from '@cobalt/react-box';

import Explore from '@/pages/explore';
import ExploreDetail from '@/pages/explore/detail';
import HackathonPage from '@/pages/hackathon';

import { menus } from './menus';

const DefaultComponent = () => <Box></Box>;

type Route = PathRouteProps & {
  metaData?: {
    title: string;
    icon?: string;
  };
  children?: Route[];
  redirect?: string;
};

export const routes: Route[] = [
  {
    path: '/',
    redirect: '/explore',
  },
  ...menus.map((menu) => {
    const { path, title, icon } = menu;
    return {
      path,
      metaData: {
        title,
        icon,
      },
      element: path === '/explore' ? <Explore /> : <DefaultComponent />,
    };
  }),
  // explore
  {
    path: '/explore/hackathon',
    element: <HackathonPage />,
  },
  {
    path: '/explore/detail',
    element: <ExploreDetail />,
  },
  {
    path: '*',
    redirect: '/',
  },
];
