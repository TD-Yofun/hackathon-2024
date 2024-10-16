import Flex from '@cobalt/react-flex';
import { Name } from '@cobalt/react-icon';
import { Portal } from '@cobalt/react-portal-provider';

import { useHooks } from '@/hooks/useHooks';
import { useSelector } from '@/store';
import { removeToast } from '@/store/toast';

import Toast from './Toast';

const ToastManager = () => {
  const { dispatch } = useHooks();
  const queue = useSelector((state) => state.toast.toastQueue);

  const handleClose = (id: string) => {
    dispatch(removeToast(id));
  };

  if (queue.length === 0) {
    return <></>;
  }

  return (
    <Portal>
      <Flex
        direction="column"
        width={['328px', '500px', '500px']}
        gap={3}
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
        }}
        padding={[3, 4, 6]}
      >
        {queue.map((toast) => {
          const icon: Name = toast.type === 'success' ? 'check' : 'warning';

          return (
            <Toast
              variation={toast.type}
              key={toast.id}
              icon={icon}
              title={toast.title}
              autoClose={toast.autoClose}
              onClose={() => handleClose(toast.id)}
            />
          );
        })}
      </Flex>
    </Portal>
  );
};

export default ToastManager;
