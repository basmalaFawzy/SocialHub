import { Card, CardBody, Avatar } from "@heroui/react";
import { BsThreeDots } from "react-icons/bs";

export default function ProfileLoader() {
  return (
   <Card className="w-full  lg:max-w-250 max-w-sm mx-auto border border-blue-100 shadow-md overflow-hidden animate-pulse">
      {/* Header  */}
      <div className="h-20 bg-linear-to-r from-blue-200/50 to-teal-200/50 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
        
        {/* Avatar placeholder */}
        <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-300 to-teal-300 border-4 border-white absolute -bottom-10 left-4 shadow-lg"></div>
        
        {/* Three dots placeholder */}
        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/30"></div>
      </div>

      <CardBody className="pt-12 px-4 pb-4">
        {/* Name and username */}
        <div className="mb-3 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-24 h-6 bg-linear-to-r from-blue-200 to-teal-200 rounded-lg"></div>
            <div className="w-12 h-5 bg-linear-to-r from-blue-100 to-teal-100 rounded-full"></div>
          </div>
          <div className="w-20 h-4 bg-linear-to-r from-blue-100 to-teal-100 rounded"></div>
        </div>

        {/* Bio/Member info */}
        <div className="mb-3 bg-blue-50/30 p-2 rounded-lg border border-blue-100/50">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-linear-to-r from-blue-200 to-teal-200"></div>
            <div className="w-32 h-3 bg-linear-to-r from-blue-200 to-teal-200 rounded"></div>
          </div>
        </div>

        <div className="h-px bg-blue-100/50 my-2"></div>

        {/* About section */}
        <div className="space-y-2 mb-3">
          <div className="w-16 h-3 bg-linear-to-r from-blue-200 to-teal-200 rounded"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-linear-to-r from-blue-200 to-teal-200"></div>
            <div className="w-40 h-3 bg-linear-to-r from-blue-100 to-teal-100 rounded"></div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-300"></div>
            <div className="w-32 h-3 bg-linear-to-r from-blue-100 to-teal-100 rounded"></div>
          </div>
        </div>

        <div className="h-px bg-blue-100/50 my-2"></div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="text-center p-2">
              <div className="flex justify-center mb-2">
                <div className="w-5 h-5 rounded-full bg-linear-to-r from-blue-200 to-teal-200"></div>
              </div>
              <div className="w-8 h-5 bg-linear-to-r from-blue-200 to-teal-200 rounded mx-auto mb-1"></div>
              <div className="w-12 h-2 bg-linear-to-r from-blue-100 to-teal-100 rounded mx-auto"></div>
            </div>
          ))}
        </div>

        <div className="h-px bg-blue-100/50 my-2"></div>

        {/* Post stats */}
        <div className="grid grid-cols-2 gap-3">
          {[1, 2].map((item) => (
            <div key={item} className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/30 border border-blue-100/50">
              <div className="p-2 rounded-full bg-linear-to-r from-blue-200 to-teal-200">
                <div className="w-4 h-4"></div>
              </div>
              <div className="flex-1">
                <div className="w-8 h-5 bg-linear-to-r from-blue-200 to-teal-200 rounded mb-1"></div>
                <div className="w-12 h-2 bg-linear-to-r from-blue-100 to-teal-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Profile Button placeholder */}
        <div className="w-full mt-4 h-9 bg-linear-to-r from-blue-200 to-teal-200 rounded-lg"></div>
      </CardBody>
    </Card>
  )
}
