import { Component, type ErrorInfo, type ReactNode } from 'react'

import * as S from './StyledComponents'

interface ErrorBoundaryProps {
  children: ReactNode
  sectionName?: string
  onRetry?: () => void
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack)
  }

  private handleRetry = () => {
    this.setState({ hasError: false })
    this.props.onRetry?.()
  }

  render() {
    if (this.state.hasError) {
      return (
        <S.Container>
          <S.Title>
            {this.props.sectionName
              ? `Unable to load ${this.props.sectionName}`
              : 'Something went wrong'}
          </S.Title>
          <S.Message>
            This section failed to render. The rest of the page should still
            work.
          </S.Message>
          {this.props.onRetry && (
            <S.RetryButton type="button" onClick={this.handleRetry}>
              Try again
            </S.RetryButton>
          )}
        </S.Container>
      )
    }

    return this.props.children
  }
}
