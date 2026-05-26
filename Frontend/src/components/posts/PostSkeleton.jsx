import { SkeletonCircle, SkeletonLine, SkeletonCard } from "../common/Skeleton";

const PostSkeleton = () => {
  return (
    <div className="card mb-4">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <SkeletonCircle size="w-10 h-10" />
        <div className="flex-1">
          <SkeletonLine width="w-32" height="h-4" />
        </div>
      </div>

      {/* Image */}
      <SkeletonCard className="w-full aspect-square" />

      {/* Actions */}
      <div className="p-4">
        <div className="flex gap-4 mb-3">
          <SkeletonLine width="w-6" height="h-6" />
          <SkeletonLine width="w-6" height="h-6" />
          <SkeletonLine width="w-6" height="h-6" />
        </div>

        {/* Likes */}
        <SkeletonLine width="w-24" height="h-4" />

        {/* Caption */}
        <div className="mt-2 space-y-2">
          <SkeletonLine width="w-full" height="h-4" />
          <SkeletonLine width="w-3/4" height="h-4" />
        </div>

        {/* Comments */}
        <div className="mt-2">
          <SkeletonLine width="w-32" height="h-4" />
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
