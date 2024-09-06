import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false, redirect: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error,errorInfo) {
    // Log the error to an error reporting service
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if an error occurred and set redirect state
    if (prevState.hasError !== this.state.hasError) {
      this.setState({ redirect: true });
    }
  }

  render() {
    if (this.state.redirect) {
      // Redirect to a specific page upon error
      return <Navigate to="/"/>;
    }

    // If no error, render children components as usual
    return this.props.children;
  }
}

export default ErrorBoundary;
