import { formatDate, reverse, addDays, addMonth } from "../../src/utils/date";

describe("Date Utils Test Suite", () => {
  test("Should format the date correctly", () => {
    const date = new Date("2025-02-26T10:00:00Z");
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("2025/02/26");
  });

  test("Should throw an error for invalid date", () => {
    expect(() => formatDate("invalid")).toThrow("Invalid date");
  });

  test("Should reverse format the date correctly", () => {
    const date = new Date("2025-02-26T10:00:00Z");
    const formattedDate = formatDate(date);
    const reverseDate = reverse(formattedDate);
    expect(formattedDate).toBe("2025/02/26");
    expect(reverseDate).toBe("26/02/2025");
  });

  test("Should throw an error if input is not a string", () => {
    expect(() => reverse(new Date())).toThrow("Input should be a string");
  });

  test("Should correctly add days to a date", () => {
    expect(addDays("2025/02/26", 30)).toEqual(new Date("2025/03/28"));
  });

  test("Should correctly add month to a date", () => {
    expect(addMonth("2025/02/26", 2)).toEqual(new Date("2025/04/01"));
  });
});
