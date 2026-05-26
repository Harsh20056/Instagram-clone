export const SkeletonCircle = ({ size = "w-10 h-10" }) => (
  <div className={`${size} bg-gray-300 rounded-full animate-pulse`}></div>
);

export const SkeletonLine = ({ width = "w-full", height = "h-4" }) => (
  <div className={`${width} ${height} bg-gray-300 rounded animate-pulse`}></div>
);

export const SkeletonCard = ({ className = "" }) => (
  <div className={`bg-gray-300 rounded animate-pulse ${className}`}></div>
);
