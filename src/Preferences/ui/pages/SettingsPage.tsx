import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { clearSession } from "../../../Common"
import type { AppLanguage, AppRegion, AppTheme } from "../../core/types/Preferences.types"
import { SettingsSection } from "../components/SettingsSection"
import { usePreferencesController } from "../controllers/usePreferencesController"
import * as S from "./StyledComponents"

export const SettingsPage = () => {
  const { t } = useTranslation("preferences")
  const navigate = useNavigate()
  const {
    language,
    theme,
    region,
    supportedLanguages,
    supportedRegions,
    setLanguage,
    setTheme,
    setRegion,
  } = usePreferencesController()

  const handleLogout = () => {
    clearSession()
    navigate("/login", { replace: true })
  }

  return (
    <S.Page>
      <S.Title>{t("pageTitle")}</S.Title>
      <S.Sections>
        <SettingsSection
          title={t("language.title")}
          description={t("language.description")}
        >
          <S.Select
            value={language}
            onChange={event =>
              setLanguage(event.target.value as AppLanguage)
            }
            aria-label={t("language.title")}
          >
            {supportedLanguages.map(option => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </S.Select>
        </SettingsSection>

        <SettingsSection
          title={t("region.title")}
          description={t("region.description")}
        >
          <S.Select
            value={region}
            onChange={event => setRegion(event.target.value as AppRegion)}
            aria-label={t("region.title")}
          >
            {supportedRegions.map(option => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </S.Select>
        </SettingsSection>

        <SettingsSection
          title={t("theme.title")}
          description={t("theme.description")}
        >
          <S.ThemeOptions>
            {(["light", "dark"] as AppTheme[]).map(option => (
              <S.ThemeButton
                key={option}
                type="button"
                $active={theme === option}
                onClick={() => setTheme(option)}
              >
                {t(`theme.${option}`)}
              </S.ThemeButton>
            ))}
          </S.ThemeOptions>
        </SettingsSection>

        <SettingsSection
          title={t("account.title")}
          description={t("account.description")}
        >
          <S.LogoutButton type="button" onClick={handleLogout}>
            {t("account.logout")}
          </S.LogoutButton>
        </SettingsSection>
      </S.Sections>
    </S.Page>
  )
}
