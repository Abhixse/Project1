/**
 * Performance monitoring utilities for React applications
 */

import { useEffect } from "react";

interface PerformanceMetrics {
  name: string;
  duration: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private observer: PerformanceObserver | null = null;

  constructor() {
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      this.setupObserver();
    }
  }

  private setupObserver() {
    try {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.push({
            name: entry.name,
            duration: entry.duration,
            timestamp: entry.startTime,
          });
        }
      });

      this.observer.observe({ entryTypes: ["measure", "navigation"] });
    } catch (error) {
      console.warn("Performance observer setup failed:", error);
    }
  }

  /**
   * Mark the start of a performance measurement
   */
  mark(name: string): void {
    if (typeof window !== "undefined" && window.performance) {
      performance.mark(name);
    }
  }

  /**
   * Measure the duration between two marks
   */
  measure(name: string, startMark: string, endMark: string): void {
    if (typeof window !== "undefined" && window.performance) {
      try {
        performance.measure(name, startMark, endMark);
      } catch (error) {
        console.warn(`Performance measure failed for ${name}:`, error);
      }
    }
  }

  /**
   * Get all recorded metrics
   */
  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics = [];
    if (typeof window !== "undefined" && window.performance) {
      performance.clearMarks();
      performance.clearMeasures();
    }
  }

  /**
   * Get web vitals metrics
   */
  getWebVitals(): {
    FCP?: number;
    LCP?: number;
    FID?: number;
    CLS?: number;
    TTFB?: number;
  } {
    if (typeof window === "undefined" || !window.performance) {
      return {};
    }

    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    return {
      TTFB: navigation?.responseStart - navigation?.requestStart,
    };
  }

  /**
   * Log performance metrics to console
   */
  logMetrics(): void {
    console.table(this.getMetrics());
    console.log("Web Vitals:", this.getWebVitals());
  }

  /**
   * Disconnect the observer
   */
  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();

/**
 * React hook for measuring component lifecycle performance
 */
export function usePerformanceMonitoring(componentName: string) {
  useEffect(() => {
    performanceMonitor.mark(`${componentName}-mount`);

    return () => {
      performanceMonitor.mark(`${componentName}-unmount`);
      performanceMonitor.measure(
        `${componentName}-lifecycle`,
        `${componentName}-mount`,
        `${componentName}-unmount`
      );
    };
  }, [componentName]);
}
