import { Outlet } from "react-router-dom";

export default function () {
  return (
    <>
      {/* layout for rigester/login */}
      <div className="min-h-screen bg-blue-50/50 px-4 py-8 sm:py-12 lg:flex lg:items-center">
             <div className="mx-auto flex w-full max-w-6xl items-center flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* register form */}
        <section className="order-1 w-full flex flex-col  max-w-107.5 lg:order-2 bg-white shadow-md p-6 rounded-2xl">
        <Outlet/>
        </section>
  
        {/* side text */}
        <section className="order-2 w-full lg:order-1 lg:w-1/2 text-center lg:text-left">
          <div className="max-w-xl mx-auto lg:mx-0">
            <div className="mb-6">
              <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-4">
                <span className="bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Start your
                </span>
                <br />
                <span className="text-slate-800">journey today</span>
              </h2>
  
              <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
                Connect with friends, share your stories, and discover a world of
                meaningful connections in a space that feels like home.
              </p>
            </div>
  
            {/* Feature Highlights */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                <span className="text-gray-700">
                  Create your free account in seconds
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                <span className="text-gray-700">
                  Join a growing community of friends
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                <span className="text-gray-700">
                  Share moments that matter to you
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
    </>
  );
}
