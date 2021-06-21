import React, { PureComponent } from "react";

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div>
          <h3>Something went wrong.</h3>
          <p style={{ color: "red" }}>
            {this.state.error && this.state.error.toString()}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
