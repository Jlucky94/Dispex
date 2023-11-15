// В файле hooks/useCollapsible.ts
import { useState, useCallback } from 'react';

const useCollapse = (defaultState = true) => {
    const [isCollapsed, setIsCollapsed] = useState(defaultState);

    // Функция для переключения состояния
    const toggle = useCallback(() => {
        setIsCollapsed(prevState => !prevState);
    }, []);

    return { isCollapsed, toggle };
};

export default useCollapse;
