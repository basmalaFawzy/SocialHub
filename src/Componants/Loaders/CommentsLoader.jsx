
export default function CommentsLoader() {
  return (
 <div className="flex flex-col items-start w-full mx-4 mb-4 rounded-2xl border border-blue-200 bg-linear-to-br from-blue-50 to-teal-50/30 p-3 animate-pulse">
      {/* Header section */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-16 h-3 bg-linear-to-r from-blue-200 to-teal-200 rounded-full"></div>
        <div className="w-1 h-1 rounded-full bg-blue-300"></div>
        <div className="w-12 h-2 bg-linear-to-r from-blue-100 to-teal-100 rounded-full"></div>
      </div>

      {/* Comment content section */}
      <div className="flex gap-3 w-full">
        {/* Avatar skeleton */}
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-200 to-teal-200 border-2 border-blue-100"></div>
          {/* Optional online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-linear-to-br from-blue-400 to-teal-400 border-2 border-white"></div>
        </div>

        {/* Comment bubble skeleton */}
        <div className="flex-1">
          <div className="bg-white px-4 py-3 rounded-2xl border border-blue-100/50">
            {/* Commenter name */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-24 h-3 bg-linear-to-r from-blue-200 to-teal-200 rounded-full"></div>
            </div>
            
            {/* Comment lines */}
            <div className="space-y-2">
              <div className="w-full h-2 bg-linear-to-r from-blue-100 to-teal-100 rounded-full"></div>
              <div className="w-2/3 h-2 bg-linear-to-r from-blue-100 to-teal-100 rounded-full"></div>
            </div>
          </div>

          {/* Comment action buttons skeleton */}
          <div className="flex items-center gap-4 mt-2 ml-2">
            <div className="w-8 h-2 bg-linear-to-r from-blue-100 to-teal-100 rounded-full"></div>
            <div className="w-8 h-2 bg-linear-to-r from-blue-100 to-teal-100 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

}
