import React, { Component, ErrorInfo, ReactNode } from 'react';
import { BookOpen, RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error?.message || 'An unexpected error occurred.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error securely without exposing sensitive tokens or credentials
    console.error('Captured by Nirantar ErrorBoundary:', error.name, errorInfo.componentStack);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetState = () => {
    try {
      // Clear session cache and reload gracefully
      sessionStorage.clear();
      window.location.reload();
    } catch (e) {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F3EBDD] text-[#102A43] flex flex-col items-center justify-center p-4 sm:p-6 select-none font-sans">
          <div className="max-w-md w-full bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-6 sm:p-8 shadow-sm text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-[#102A43] text-[#F3EBDD] flex items-center justify-center mx-auto shadow-xs">
              <AlertTriangle className="w-7 h-7 text-amber-300" />
            </div>

            <div className="space-y-1.5">
              <h1 className="text-xl font-bold tracking-tight text-[#102A43]">
                Something went wrong
              </h1>
              <p className="text-xs text-[#675E54] leading-relaxed">
                Nirantar encountered an unexpected issue. Your local learning data and offline modules are preserved.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full py-2.5 bg-[#102A43] hover:bg-[#0C1F33] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Application</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetState}
                className="w-full py-2.5 bg-[#E9DDCB] hover:bg-[#E2D4BF] text-[#102A43] text-xs font-bold rounded-xl border border-[#D8CABA] transition-colors cursor-pointer"
              >
                <span>Clear Cache & Retry</span>
              </button>
            </div>

            <div className="pt-2 border-t border-[#D8CABA] flex items-center justify-center gap-1.5 text-[11px] text-[#8C8275]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Nirantar Resilient Learning Platform</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
