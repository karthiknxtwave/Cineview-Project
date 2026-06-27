import styled from 'styled-components'

export const Container = styled.div`
  padding: 32px 40px;
  border-radius: 12px;
  background: #1e293b;
  border: 1px solid #334155;
  text-align: center;
`

export const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  color: #f8fafc;
`

export const Message = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #94a3b8;
`

export const RetryButton = styled.button`
  margin-top: 16px;
  height: 40px;
  padding: 0 18px;
  border: none;
  border-radius: 10px;
  background: #2563eb;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`
