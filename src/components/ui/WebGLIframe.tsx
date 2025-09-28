'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface WebGLIframeProps {
  src: string;
  title: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  refreshTrigger?: number;
  isPageReload?: boolean;
}

const WebGLIframe: React.FC<WebGLIframeProps> = ({
  src,
  title,
  className = '',
  onLoad,
  onError,
  refreshTrigger,
  isPageReload = false
}) => {
  const [hasError, setHasError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = useCallback(() => {
    console.log('WebGL iframe loaded successfully:', src);
    setHasError(false);
    onLoad?.();
  }, [src, onLoad]);

  const handleError = useCallback(() => {
    console.error('WebGL iframe failed to load');
    setHasError(true);
    onError?.();
  }, [onError]);

  useEffect(() => {
    const handleUnityError = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'string' && event.data.includes('Unity')) {
        console.error('Unity error received:', event.data);
      }
    };
    window.addEventListener('message', handleUnityError);
    return () => window.removeEventListener('message', handleUnityError);
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);
      return () => {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
      };
    }
  }, [iframeKey, handleLoad, handleError]);

  useEffect(() => {
    if (refreshTrigger !== undefined && refreshTrigger > 0) {
      setIframeKey(prev => prev + 1);
      setHasError(false);
    }
  }, [refreshTrigger]);

  useEffect(() => {
    if (isPageReload) {
      const timer = setTimeout(() => setIsReady(true), 500);
      return () => clearTimeout(timer);
    } else {
      setIsReady(true);
    }
  }, [isPageReload]);

  return (
    <div className={`relative ${className}`}>
      {/* Error State */}
      {hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gray-100 border-2 border-[#CC0000] flex items-center justify-center font-mono"
        >
          <div className="text-center">
            <div className="text-[#CC0000] text-xs mb-4">
              ┌─ WEBGL LOAD ERROR ────────────┐
            </div>
            <div className="text-black font-bold mb-2">LOAD FAILED</div>
            <div className="text-gray-600 text-sm mb-4">
              Unable to load Unity WebGL build
            </div>
            <button
              onClick={() => {
                setHasError(false);
                setIframeKey(prev => prev + 1);
              }}
              className="px-4 py-2 bg-[#CC0000] text-white text-sm font-mono hover:bg-[#CC0000]/80 transition-colors"
            >
              [TRY AGAIN]
            </button>
            <div className="text-[#CC0000] text-xs mt-4">
              └─────────────────┘
            </div>
          </div>
        </motion.div>
      )}

      {/* WebGL Content */}
      {isReady && (
        <div className="w-full flex justify-center">
          {/* Responsive wrapper with aspect ratio */}
          <div className="relative w-full max-w-[1200px] aspect-[16/9] bg-black rounded-lg overflow-hidden shadow-lg">
  <iframe
    key={iframeKey}
    ref={iframeRef}
    src={src}
    title={title}
    className="absolute inset-0 w-full h-full"
    style={{ border: 'none', display: 'block' }}
    allow="fullscreen; webgl; autoplay; cross-origin-isolated"
    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
    loading="eager"
  />
</div>

        </div>
      )}
    </div>
  );
};

export default WebGLIframe;
