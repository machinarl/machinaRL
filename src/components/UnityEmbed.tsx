'use client';

import { useState, useEffect, useRef } from 'react';
import { UnityMessage, UnityResponse } from '@/types/sim';

interface UnityEmbedProps {
  simulationId: string;
  onEvent?: (event: UnityResponse) => void;
  onReady?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function UnityEmbed({
  simulationId,
  onEvent,
  onReady,
  onError,
  className = '',
}: UnityEmbedProps) {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [buildExists, setBuildExists] = useState(false);
  const unityInstanceRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkBuildExists();
  }, [simulationId]);

  const checkBuildExists = async () => {
    try {
      // Check if Unity build files exist
      const response = await fetch(`/unity/${simulationId}/scene.loader.js`, {
        method: 'HEAD',
      });
      
      if (response.ok) {
        setBuildExists(true);
        loadUnityBuild();
      } else {
        setBuildExists(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.warn('Unity build not found, showing placeholder');
      setBuildExists(false);
      setIsLoading(false);
    }
  };

  const loadUnityBuild = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // This is where we would load the actual Unity WebGL build
      // For now, we'll simulate the loading process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate Unity instance creation
      const mockUnityInstance = {
        SendMessage: (gameObject: string, method: string, value?: any) => {
          console.log('Unity SendMessage:', { gameObject, method, value });
        },
        Quit: () => {
          console.log('Unity Quit called');
        },
        SetFullscreen: (fullscreen: boolean) => {
          console.log('Unity SetFullscreen:', fullscreen);
        },
      };

      unityInstanceRef.current = mockUnityInstance;
      setIsReady(true);
      setIsLoading(false);
      onReady?.();
    } catch (error) {
      const errorMessage = 'Failed to load Unity build';
      setError(errorMessage);
      setIsLoading(false);
      onError?.(errorMessage);
    }
  };

  const sendMessage = (message: UnityMessage) => {
    if (!unityInstanceRef.current) {
      console.warn('Unity instance not ready');
      return;
    }

    // Send message to Unity
    unityInstanceRef.current.SendMessage('GameManager', 'ReceiveMessage', JSON.stringify(message));
  };

  const startSimulation = () => {
    sendMessage({
      type: 'START',
      timestamp: Date.now(),
    });
  };

  const pauseSimulation = () => {
    sendMessage({
      type: 'PAUSE',
      timestamp: Date.now(),
    });
  };

  const resetSimulation = () => {
    sendMessage({
      type: 'RESET',
      timestamp: Date.now(),
    });
  };

  if (isLoading) {
    return (
      <div className={`unity-embed loading ${className}`}>
        <div className="ascii-panel">
          <pre>
            {`
    ┌─────────────────────────┐
    │  LOADING UNITY BUILD    │
    │                         │
    │  ████████████████████████│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  ████████████████████████│
    │                         │
    │  Initializing...        │
    └─────────────────────────┘
            `}
          </pre>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`unity-embed error ${className}`}>
        <div className="ascii-panel">
          <pre>
            {`
    ┌─────────────────────────┐
    │  UNITY LOAD ERROR       │
    │                         │
    │  ████████████████████████│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  ████████████████████████│
    │                         │
    │  ${error.padEnd(23)} │
    └─────────────────────────┘
            `}
          </pre>
        </div>
      </div>
    );
  }

  if (!buildExists) {
    return (
      <div className={`unity-embed placeholder ${className}`}>
        <div className="ascii-panel">
          <pre>
            {`
    ┌─────────────────────────┐
    │  UNITY WEBGL BUILD      │
    │  PENDING                │
    │                         │
    │  ████████████████████████│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  ████████████████████████│
    │                         │
    │  drop files in          │
    │  /public/unity/${simulationId}/│
    │                         │
    │  [ START ] [ PAUSE ]    │
    │  [ RESET ]              │
    └─────────────────────────┘
            `}
          </pre>
        </div>
        <div className="unity-controls">
          <button 
            onClick={startSimulation}
            className="btn btn-primary"
            disabled
          >
            [ START ]
          </button>
          <button 
            onClick={pauseSimulation}
            className="btn btn-secondary"
            disabled
          >
            [ PAUSE ]
          </button>
          <button 
            onClick={resetSimulation}
            className="btn btn-secondary"
            disabled
          >
            [ RESET ]
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`unity-embed ready ${className}`}>
      <div ref={containerRef} className="unity-container">
        {/* Unity WebGL build will be loaded here */}
        <div className="unity-canvas">
          <div className="ascii-panel">
            <pre>
              {`
    ┌─────────────────────────┐
    │  UNITY SIMULATION       │
    │  READY                  │
    │                         │
    │  ████████████████████████│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █│
    │  ████████████████████████│
    │                         │
    │  Simulation running...  │
    └─────────────────────────┘
              `}
            </pre>
          </div>
        </div>
      </div>
      <div className="unity-controls">
        <button 
          onClick={startSimulation}
          className="btn btn-primary"
        >
          [ START ]
        </button>
        <button 
          onClick={pauseSimulation}
          className="btn btn-secondary"
        >
          [ PAUSE ]
        </button>
        <button 
          onClick={resetSimulation}
          className="btn btn-secondary"
        >
          [ RESET ]
        </button>
      </div>
    </div>
  );
}

// Future Unity integration code (commented out for now)
/*
// Unity WebGL loader script
const loadUnityBuild = async () => {
  try {
    const script = document.createElement('script');
    script.src = `/unity/${simulationId}/scene.loader.js`;
    script.onload = () => {
      // Initialize Unity instance
      createUnityInstance(document.getElementById('unity-canvas'), {
        dataUrl: `/unity/${simulationId}/scene.data`,
        frameworkUrl: `/unity/${simulationId}/scene.framework.js`,
        codeUrl: `/unity/${simulationId}/scene.wasm`,
        streamingAssetsUrl: 'StreamingAssets',
        companyName: 'machinaRL',
        productName: 'Simulation',
        productVersion: '1.0.0',
      }).then((unityInstance) => {
        unityInstanceRef.current = unityInstance;
        setIsReady(true);
        onReady?.();
      });
    };
    document.head.appendChild(script);
  } catch (error) {
    onError?.(error.message);
  }
};

// Unity message handling
useEffect(() => {
  if (!unityInstanceRef.current) return;

  const handleUnityMessage = (event: MessageEvent) => {
    try {
      const response: UnityResponse = JSON.parse(event.data);
      onEvent?.(response);
    } catch (error) {
      console.warn('Failed to parse Unity message:', error);
    }
  };

  window.addEventListener('message', handleUnityMessage);
  return () => window.removeEventListener('message', handleUnityMessage);
}, [onEvent]);
*/
