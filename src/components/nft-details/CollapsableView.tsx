import { KeyboardArrowDownRounded } from '@mui/icons-material';
import React from 'react';

export type CollapsableViewProps = {
    headerText: string;
    headerIcon?: React.ReactNode;
    body: React.ReactNode;
};

const CollapsableView = ({ headerText, headerIcon, body }: CollapsableViewProps) => {
    const [collapsed, setCollapsed] = React.useState(false);

    const toggleCollapsed = React.useCallback(() => setCollapsed(prev => !prev), []);

    return (
        <div className={`flex flex-col overflow-hidden ${collapsed ? 'h-fit' : 'h-[55px]'}`}>
            <button
                onClick={toggleCollapsed}
                className={`${
                    collapsed ? 'rounded-t-2xl border-b-gray-400' : 'rounded-2xl border-b-transparent'
                } border-b  h-[55px] flex items-center justify-between p-3 bg-gray-800 text-white`}
            >
                <div className="flex items-center gap-x-2">
                    {headerIcon && headerIcon}
                    <span className="font-semibold text-xl">{headerText}</span>
                </div>
                <div className={`${collapsed && 'rotate-180'}`}>
                    <KeyboardArrowDownRounded />
                </div>
            </button>
            <div
                className={`${
                    collapsed ? 'flex' : 'hidden'
                } bg-gray-700 rounded-b-2xl overflow-hidden p-3 flex-col text-white`}
            >
                {body}
            </div>
        </div>
    );
};

export default CollapsableView;
