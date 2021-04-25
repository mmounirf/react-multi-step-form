import { CSSProperties, FunctionComponent, memo } from 'react';
import './LoadingSkeleton.scss';

interface LoadingSkeletonProps {
    width?: string;
    height?: string;
    className?: string;
    styles?: CSSProperties;
}
type Props = LoadingSkeletonProps;

const LoadingSkeleton: FunctionComponent<Props> = ({ width, height, className, styles }) => {
    const classNames = className ? `loading-skeleton ${className}` : 'loading-skeleton';
    const elementStyles = {
        ...styles,
        ...(width && { width }),
        ...(height && { height }),
    }
    return <div className={classNames} style={elementStyles}/>;
};

export default memo(LoadingSkeleton);
