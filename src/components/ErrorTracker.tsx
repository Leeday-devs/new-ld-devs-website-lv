import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorDetails: string;
  errorId: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      errorDetails: '',
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Generate unique error ID for tracking
    const errorId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    return {
      hasError: true,
      errorDetails: error.message,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console (in production, send to error tracking service)
    console.error('Error Boundary Caught:', {
      error,
      errorInfo,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    // In production, you would send this to an error tracking service
    // Example: Sentry, LogRocket, or your own error tracking endpoint
    this.logError(error, errorInfo);
  }

  private logError = (error: Error, errorInfo: ErrorInfo) => {
    const errorReport = {
      errorId: this.state.errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error Report [${this.state.errorId}]`);
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Full Report:', errorReport);
      console.groupEnd();
    }

    // In production, send to error tracking service
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorReport)
    // }).catch(err => console.error('Failed to log error:', err));
  };

  private handleRetry = () => {
    this.setState({ 
      hasError: false, 
      errorDetails: '',
      errorId: ''
    });
  };

  private handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Oops! Something went wrong
              </h1>
              
              <p className="text-gray-600 mb-6">
                We're sorry, but something unexpected happened. Our team has been notified and is working to fix this issue.
              </p>

              {process.env.NODE_ENV === 'development' && (
                <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
                  <p className="text-xs font-mono text-gray-700 mb-2">
                    <strong>Error ID:</strong> {this.state.errorId}
                  </p>
                  <p className="text-xs font-mono text-gray-700">
                    <strong>Details:</strong> {this.state.errorDetails}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  onClick={this.handleRetry}
                  className="w-full btn-primary"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                
                <Button
                  onClick={this.handleRefresh}
                  variant="outline"
                  className="w-full"
                >
                  Refresh Page
                </Button>

                <Button
                  onClick={() => window.location.href = '/'}
                  variant="ghost"
                  className="w-full text-sm"
                >
                  Go to Homepage
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  If this problem persists, please contact our support team at{' '}
                  <a href="mailto:support@leedaydevs.com" className="text-orange hover:underline">
                    support@leedaydevs.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Global error handler for unhandled promises and errors
const setupGlobalErrorHandling = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    // Log to error service
    const errorReport = {
      type: 'unhandled_promise_rejection',
      reason: event.reason?.toString() || 'Unknown reason',
      timestamp: new Date().toISOString(),
      url: window.location.href
    };

    console.error('Promise Rejection Report:', errorReport);
  });

  // Handle global JavaScript errors
  window.addEventListener('error', (event) => {
    console.error('Global JavaScript error:', event.error);
    
    const errorReport = {
      type: 'javascript_error',
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };

    console.error('JavaScript Error Report:', errorReport);
  });
};

const ErrorTracker = () => {
  // Set up global error handling on mount
  if (typeof window !== 'undefined') {
    setupGlobalErrorHandling();
  }

  return null; // This component doesn't render anything
};

export { ErrorBoundary };
export default ErrorTracker;