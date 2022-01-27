import { Component, ErrorInfo } from "react"


interface ErrorBoundaryProps {
  deps?: unknown[]
  fallback: string | JSX.Element | ((error: Error, errorInfo: ErrorInfo) => JSX.Element)
}
interface ErrorBoundaryState {
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    error: null,
    errorInfo: null
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo })
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (!prevProps.deps && !this.props.deps) return
    if (Buffer.from(JSON.stringify(prevProps.deps)).toString("base64") !== Buffer.from(JSON.stringify(this.props.deps)).toString("base64")) {
      this.setState({
        error: null,
        errorInfo: null
      })
    }
  }
  render() {
    if (this.state.error) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback(this.state.error, this.state.errorInfo!)
      }

      return this.props.fallback
    }

    return this.props.children
  }
}

export default ErrorBoundary
