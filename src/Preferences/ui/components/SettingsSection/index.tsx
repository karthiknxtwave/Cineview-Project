import type { ReactNode } from "react"

import * as S from "./StyledComponents"

interface SettingsSectionProps {
  title: string
  description?: string
  children: ReactNode
}

export const SettingsSection = ({
  title,
  description,
  children,
}: SettingsSectionProps) => (
  <S.Section>
    <S.SectionTitle>{title}</S.SectionTitle>
    {description && <S.SectionDescription>{description}</S.SectionDescription>}
    <S.SectionContent>{children}</S.SectionContent>
  </S.Section>
)
