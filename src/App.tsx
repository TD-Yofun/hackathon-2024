import { Route, Routes, Navigate } from 'react-router-dom';

import Box from '@cobalt/react-box';
import Flex from '@cobalt/react-flex';
import { useTheme } from '@cobalt/react-theme-provider';

import AtlasHeader from './components/atlas/AtlasHeader';
import AtlasMenu from './components/atlas/AtlasMenu';
import { routes } from './router';

const App = () => {
  const theme = useTheme();

  return (
    <Flex width="100%" height="100%" direction="column">
      <AtlasHeader />

      <Flex grow height="0" width="100%">
        <Box
          width="54px"
          height="100%"
          padding={2}
          backgroundColor={theme.secondary200}
          style={{
            borderRight: '2px solid var(--gray-300)',
          }}
        >
          <AtlasMenu />
        </Box>
        <Box grow width="0" height="100%">
          <Routes>
            {routes.map((route) => {
              const { path, element } = route;
              if (route.redirect) {
                return <Route key={path} path={path} element={<Navigate replace to={route.redirect} />} />;
              }
              return <Route path={path} key={path} element={element} />;
            })}
          </Routes>
        </Box>
      </Flex>
    </Flex>
  );
};

export default App;
