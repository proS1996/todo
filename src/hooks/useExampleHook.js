import { useState, useEffect } from 'react';

const useExampleHook = () => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    // Example logic
  }, []);

  return value;
};

export default useExampleHook;
