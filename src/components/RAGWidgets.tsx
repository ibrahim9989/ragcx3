import React from "react";

const RAGWidgets: React.FC = () => {
  return (
    <div className="h-[600px] absolute hidden lg:block left-[52%] xl:left-[48%] w-[45vw] max-w-[650px] mx-auto">
      <div className="overflow-hidden h-full">
        {/* RAG.CX Widgets Container */}
        <div
          className="relative rounded-2xl p-8 max-w-[800px] mx-auto mt-9"
          style={{
            backdropFilter: "blur(20px) saturate(180%)",
            background: "rgba(17, 25, 40, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.125)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          }}
        >
          {/* Pseudo elements using absolute positioning */}
          <div
            className="absolute top-0 left-0 right-0 bottom-0 rounded-2xl -z-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 bottom-0 rounded-2xl -z-10"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.15), transparent 70%)",
            }}
          />

          {/* Main Container Title */}
          <h3
            className="text-white/90 text-lg font-bold mb-6 text-center"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
          >
            RAG.CX Widgets
          </h3>

          {/* 2x2 Grid of Widgets */}
          <div className="space-y-6">
            {/* Top Row */}
            <div className="flex space-x-6 w-full">
              {/* Widget 1: Search */}
              <div className="bg-gray-900 rounded-lg border border-orange-400 p-4 flex-1 min-h-[120px]">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-xs ml-2">Search CX</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-800 rounded-md mb-2">
                  <svg
                    className="w-3 h-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="text-gray-400 text-xs">
                    Find contacts...
                  </span>
                </div>
                <div className="text-green-400 text-xs">● 3 results found</div>
              </div>

              {/* Widget 2: Analytics */}
              <div className="bg-gray-900 rounded-lg border border-blue-400 p-4 flex-1 min-h-[120px]">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-xs ml-2">Analytics</span>
                </div>
                <div className="space-y-1 flex flex-col items-start">
                  <div className="text-blue-400 text-xs">
                    📊 Query Success: 94%
                  </div>
                  <div className="text-green-400 text-xs">
                    ⚡ Avg Response: 120ms
                  </div>
                  <div className="text-yellow-400 text-xs">
                    🔍 Active Searches: 42
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex space-x-6 w-full">
              {/* Widget 3: Knowledge Base */}
              <div className="bg-gray-900 rounded-lg border border-purple-400 p-4 flex-1 min-h-[120px]">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-xs ml-2">
                    Knowledge Base
                  </span>
                </div>
                <div className="space-y-1 flex flex-col items-start">
                  <div className="text-purple-400 text-xs">
                    � Documents: 1,247
                  </div>
                  <div className="text-cyan-400 text-xs">🏷️ Categories: 23</div>
                  <div className="text-pink-400 text-xs">
                    🔄 Last Sync: 2min ago
                  </div>
                </div>
              </div>

              {/* Widget 4: Recent Activity */}
              <div className="bg-gray-900 rounded-lg border border-green-400 p-4 flex-1 min-h-[120px]">
                <div className="flex items-center mb-3 gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-xs ml-2">
                    Recent Activity
                  </span>
                </div>
                <div className="space-y-1 flex flex-col items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-white text-xs">User query</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="text-white text-xs">Data indexed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <span className="text-white text-xs">Widget created</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RAGWidgets;
