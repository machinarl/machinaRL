'use client';

import React, { useEffect, useRef, useState } from 'react';

interface UnityWebGLPlayerProps {
  buildPath: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: () => void;
}

// Declare Unity types
declare global {
  interface Window {
    createUnityInstance: (canvas: HTMLCanvasElement, config: UnityConfig, onProgress?: (progress: number) => void) => Promise<UnityInstance>;
  }
}

interface UnityConfig {
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
  streamingAssetsUrl: string;
  companyName: string;
  productName: string;
  productVersion: string;
}

interface UnityInstance {
  SendMessage: (gameObject: string, method: string, value?: string | number) => void;
  Quit: () => void;
}

const UnityWebGLPlayer: React.FC<UnityWebGLPlayerProps> = ({
  buildPath,
  width = 960,
  height = 540,
  onLoad,
  onError
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const unityInstanceRef = useRef<UnityInstance | null>(null);

  useEffect(() => {
    const loadUnity = async () => {
      if (!canvasRef.current) return;

      try {
        // Load the Unity loader script
        const script = document.createElement('script');
        const loaderUrl = `${buildPath}/Build/test%20builds.loader.js`;
        script.src = loaderUrl;
        script.crossOrigin = 'anonymous';
        
        console.log('Loading Unity script from:', loaderUrl);
        
        script.onload = () => {
          if (!window.createUnityInstance) {
            throw new Error('Unity loader not found');
          }

          // Small delay to ensure all DOM elements are ready
          setTimeout(() => {
            const config = {
              arguments: [],
              dataUrl: `${buildPath}/Build/test%20builds.data`,
              frameworkUrl: `${buildPath}/Build/test%20builds.framework.js`,
              codeUrl: `${buildPath}/Build/test%20builds.wasm`,
              streamingAssetsUrl: "StreamingAssets",
              companyName: "Unity Technologies",
              productName: "UnityEnvironment",
              productVersion: "1.0",
              showBanner: (msg: string, type: string) => {
                console.log('Unity Banner:', msg, type);
              },
              matchWebGLToCanvasSize: false,
              // WebGL specific configurations
              webglContextAttributes: {
                preserveDrawingBuffer: false,
                powerPreference: "high-performance"
              },
              // Disable ML-Agents/Barracuda features that might cause issues
              disableContextMenu: true,
              // Add error handling for ML inference
              onAbort: (error: Error) => {
                console.warn('Unity aborted:', error);
              }
            };

            // Create Unity instance
            window.createUnityInstance(canvasRef.current!, config, (progress: number) => {
              setProgress(progress * 100);
            }).then((unityInstance: UnityInstance) => {
              unityInstanceRef.current = unityInstance;
              setIsLoading(false);
              onLoad?.();
            }).catch((error: Error) => {
              console.error('Unity instance creation failed:', error);
              setHasError(true);
              onError?.();
            });
          }, 100);
        };

        script.onerror = (error) => {
          console.error('Failed to load Unity loader script:', error);
          console.error('Script src:', script.src);
          setHasError(true);
          onError?.();
        };

        document.body.appendChild(script);

        return () => {
          // Cleanup
          if (unityInstanceRef.current) {
            unityInstanceRef.current.Quit();
          }
          document.body.removeChild(script);
        };
      } catch (error) {
        console.error('Unity loading error:', error);
        setHasError(true);
        onError?.();
      }
    };

    loadUnity();
  }, [buildPath, onLoad, onError]);

  if (hasError) {
    return (
      <div className="w-full h-full bg-gray-100 border-2 border-red-500 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xs mb-4">
            ┌─ WEBGL LOAD ERROR ─────────────────────────────────────────────┐
          </div>
          <div className="text-black font-bold mb-2">LOAD FAILED</div>
          <div className="text-gray-600 text-sm mb-4">
            Unable to load Unity WebGL build
          </div>
          <div className="text-red-500 text-xs">
            └──────────────────────────────────────────────────────────────┘
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-white">
      {/* Unity CSS Styles */}
      <style jsx>{`
        #unity-container {
          position: absolute;
          width: ${width}px;
          height: ${height}px;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        #unity-container.unity-desktop {
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        #unity-canvas {
          background: #231F20;
          display: block;
          margin: 0;
          padding: 0;
          border: none;
        }
        #unity-loading-bar {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: none;
        }
        #unity-progress-bar-empty {
          width: 141px;
          height: 18px;
          margin-top: 10px;
          margin-left: 6.5px;
          background: #333;
        }
        #unity-progress-bar-full {
          width: 0%;
          height: 18px;
          margin-top: 10px;
          background: #0066CC;
        }
        #unity-warning {
          position: absolute;
          left: 50%;
          top: 5%;
          transform: translate(-50%);
          background: white;
          padding: 10px;
          display: none;
        }
        #unity-footer {
          position: relative;
        }
        #unity-fullscreen-button {
          cursor: pointer;
          float: right;
          width: 38px;
          height: 38px;
          background: transparent;
        }
      `}</style>
      
      {/* Unity Container - matches the original HTML structure */}
      <div id="unity-container" className="unity-desktop" style={{ width: `${width}px`, height: `${height}px` }}>
        {/* Unity Canvas */}
        <canvas
          ref={canvasRef}
          id="unity-canvas"
          width={width}
          height={height}
          className="w-full h-full bg-gray-800"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            display: 'block',
            margin: 0,
            padding: 0,
            border: 'none'
          }}
          tabIndex={-1}
        />

        {/* Unity Loading Bar - Unity expects this */}
        <div id="unity-loading-bar" style={{ display: isLoading ? 'block' : 'none' }}>
          <div id="unity-progress-bar-empty">
            <div 
              id="unity-progress-bar-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Unity Warning - Unity expects this */}
        <div id="unity-warning" />

        {/* Unity Footer - Unity expects this */}
        <div id="unity-footer">
          <div id="unity-fullscreen-button" style={{ display: 'none' }} />
        </div>

        {/* Unity Logo Cover */}
        <div 
          className="absolute top-2 right-2 w-32 h-12 bg-white border border-gray-300 pointer-events-none"
          style={{ zIndex: 1000 }}
        />
      </div>

      {/* Custom Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[#0066CC] text-xs mb-4">
              ┌─ LOADING UNITY SIMULATION ─────────────────────────────────────────────┐
            </div>
            <div className="text-black font-bold mb-2">LOADING...</div>
            <div className="w-64 bg-gray-300 rounded-full h-2 mb-4">
              <div 
                className="bg-[#0066CC] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-gray-600 text-sm mb-4">
              {Math.round(progress)}% Complete
            </div>
            <div className="text-[#0066CC] text-xs">
              └──────────────────────────────────────────────────────────────┘
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnityWebGLPlayer;
