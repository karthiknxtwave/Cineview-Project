import styled from 'styled-components'

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    135deg,
    #0f172a,
    #111827,
    #020617
  );

  padding: 24px;
`

export const Card = styled.form`
  width: 100%;
  max-width: 420px;

  background: #1e293b;

  padding: 40px;

  border-radius: 20px;

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.45);

  display: flex;
  flex-direction: column;
  gap: 22px;
`

export const Logo = styled.h1`
  margin: 0;

  color: white;

  font-size: 34px;

  font-weight: 700;

  text-align: center;
`

export const Subtitle = styled.p`
  margin: 0;

  text-align: center;

  color: #94a3b8;

  font-size: 15px;
`

export const Field = styled.div`
  display: flex;

  flex-direction: column;

  gap: 8px;
`

export const Label = styled.label`
  color: white;

  font-size: 14px;

  font-weight: 500;
`

export const Input = styled.input`
  height: 48px;

  border-radius: 12px;

  border: 1px solid #334155;

  background: #0f172a;

  color: white;

  padding: 0 16px;

  font-size: 15px;

  outline: none;

  transition: all 0.2s;

  &::placeholder {
    color: #64748b;
  }

  &:focus {
    border-color: #3b82f6;

    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`

export const CheckboxRow = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;

  color: white;

  font-size: 14px;
`

export const LoginButton = styled.button`
  height: 48px;

  border: none;

  border-radius: 12px;

  background: #2563eb;

  color: white;

  font-size: 16px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: #1d4ed8;
  }
`

export const ErrorText = styled.p`
  margin: 0;

  color: #ef4444;

  font-size: 13px;
`