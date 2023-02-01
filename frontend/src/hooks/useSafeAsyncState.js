import {
  useState, useCallback,
} from 'react';

import useIsMounted from './useIsMounted';

export default function useSafeAsyncState(initalState) {
  const [state, setState] = useState(initalState);
  const isMounted = useIsMounted();

  const setSafeAsyncState = useCallback((data) => {
    if (isMounted()) {
      setState(data);
    }
  }, [isMounted]);

  return [state, setSafeAsyncState];
}
