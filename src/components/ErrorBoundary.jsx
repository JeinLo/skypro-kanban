import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: '#F84D4D' }}>
          <h1>Произошла ошибка</h1>
          <p>{this.state.error?.message || 'Неизвестная ошибка'}</p>
          <button onClick={() => window.location.reload()}>Перезагрузить страницу</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;