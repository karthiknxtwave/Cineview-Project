import { describe, expect, it } from "vitest"

import { formatDisplayDate, formatDisplayYear } from "./FormatDate.utils"

describe("FormatDate.utils", () => {
  it("formats display dates using the active locale", () => {
    expect(formatDisplayDate("2024-01-15", "en")).toBe("Jan 15, 2024")
    expect(formatDisplayDate("2024-01-15", "es")).toContain("2024")
  })

  it("formats display years and handles empty values", () => {
    expect(formatDisplayYear("2024-01-15", "en")).toBe("2024")
    expect(formatDisplayYear("", "en")).toBe("—")
    expect(formatDisplayYear("invalid", "en")).toBe("—")
  })
})
