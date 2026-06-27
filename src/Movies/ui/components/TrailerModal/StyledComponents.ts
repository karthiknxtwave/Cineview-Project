import styled from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.85);
  z-index: 200;
  padding: 24px;
`

export const Content = styled.div`
  position: relative;
  width: min(90vw, 900px);
  padding: 24px;
  border-radius: 16px;
  background: #1e293b;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.6);
  color: #f8fafc;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: rgba(15, 23, 42, 0.9);
  }
`

export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  overflow: hidden;
  background: #0f172a;
`

export const YouTubeIframe = styled.iframe`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
`

export const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 200px;
  padding: 32px 16px;
  text-align: center;
`

export const StateMessage = styled.p`
  margin: 0;
  max-width: 360px;
  color: #94a3b8;
  font-size: 15px;
  line-height: 1.6;
`

export const RetryButton = styled.button`
  height: 40px;
  padding: 0 20px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`
