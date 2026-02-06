import { useEffect, useState } from "react";

type NetworkStatus = {
  online: boolean;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
};

/**
 * Custom hook for monitoring network status
 * @returns Network status information
 */
export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>({
    online: navigator.onLine,
  });

  useEffect(() => {
    const updateNetworkStatus = () => {
      setStatus({
        online: navigator.onLine,
        // @ts-ignore - NetworkInformation API is experimental
        effectiveType: navigator.connection?.effectiveType,
        // @ts-ignore
        downlink: navigator.connection?.downlink,
        // @ts-ignore
        rtt: navigator.connection?.rtt,
        // @ts-ignore
        saveData: navigator.connection?.saveData,
      });
    };

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    // @ts-ignore
    navigator.connection?.addEventListener("change", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
      // @ts-ignore
      navigator.connection?.removeEventListener("change", updateNetworkStatus);
    };
  }, []);

  return status;
}
