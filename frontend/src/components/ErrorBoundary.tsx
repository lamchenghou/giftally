// Reference: https://legacy.reactjs.org/docs/error-boundaries.html
// A more modern method would be react-error-boundary, but I found
// the more code-intensive legacy version more interesting.

import React, { ReactNode } from 'react';
import ErrorStatusPage from './ErrorStatusPage';
import { message } from 'antd';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      message.warning('Error encountered. Please refresh.');
      return <ErrorStatusPage errorImg="govtech-error.png" />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
