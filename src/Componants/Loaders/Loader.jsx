import { Card, CardBody, CardHeader } from "@heroui/react";

export default function Loader() {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50/30 to-rose-50/30 p-6">
      <div className="w-full lg:max-w-200 mx-auto space-y-4">
    

        {/* posts skeletons */}
        {[1, 2, 3].map((item) => (
          <Card key={item} className="w-full shadow-sm border border-amber-100 overflow-hidden">
            <CardHeader className="p-4 border-b border-amber-100">
              <div className="flex items-center gap-3 w-full">
                {/* Avatar skeleton */}
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-200 to-rose-200 animate-pulse"></div>
                
                {/* User info skeleton */}
                <div className="flex-1">
                  <div className="w-40 h-4 bg-linear-to-r from-amber-200 to-rose-200 rounded-full animate-pulse mb-2"></div>
                  <div className="w-24 h-3 bg-linear-to-r from-amber-100 to-rose-100 rounded-full animate-pulse"></div>
                </div>
                
                {/* Time skeleton */}
                <div className="w-16 h-3 bg-linear-to-r from-amber-100 to-rose-100 rounded-full animate-pulse"></div>
              </div>
            </CardHeader>
            
            <CardBody className="p-4 space-y-4">
              {/* Post content skeleton */}
              <div className="space-y-2">
                <div className="w-full h-4 bg-linear-to-r from-amber-100 to-rose-100 rounded-full animate-pulse"></div>
                <div className="w-3/4 h-4 bg-linear-to-r from-amber-100 to-rose-100 rounded-full animate-pulse"></div>
                <div className="w-1/2 h-4 bg-linear-to-r from-amber-100 to-rose-100 rounded-full animate-pulse"></div>
              </div>
            
              {/* Action buttons skeleton */}
              <div className="flex gap-4 pt-2">
                <div className="w-16 h-8 bg-linear-to-r from-amber-200 to-rose-200 rounded-lg animate-pulse"></div>
                <div className="w-20 h-8 bg-linear-to-r from-amber-200 to-rose-200 rounded-lg animate-pulse"></div>
                <div className="w-16 h-8 bg-linear-to-r from-amber-200 to-rose-200 rounded-lg animate-pulse"></div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}