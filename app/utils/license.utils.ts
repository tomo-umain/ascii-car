import userAgent from "user-agents";
import playwright from "playwright";

const APIBaseURL = "https://fordon-fu-regnr.transportstyrelsen.se";
const userAgentString = userAgent?.random("")?.toString();

interface CarTypeData {
  carCode: string;
  carType: string;
}

const validateRegNr = (regnr: string) => {
  return regnr.match(/[a-zA-ZåäöÅÄÖ\d\s]{2,7}/g)?.length == 1;
};

const getCarTypeData = async (regnr: string): Promise<CarTypeData> => {
  const results = await playwright.chromium
    .launch({ headless: true })
    .then(async (browser) => {
      const context = await browser.newContext({
        userAgent: userAgentString,
      });

      const page = await context.newPage();

      await page.goto(APIBaseURL);

      await page.waitForTimeout(500);

      await page.fill("#ts-regnr-sok", regnr);

      await page.locator("#btnSok").click();

      await page.waitForURL(
        `${APIBaseURL}/UppgifterAnnatFordon/Fordonsuppgifter`,
      );

      await page.waitForTimeout(2000);

      await page.locator("#expand_button").click();

      const kaross = await page.locator("#ts-karossCollapse p").innerText();
      const data = kaross?.split("\n")[1]?.trim();

      const carCode = data.split(" ")?.[0];
      const carType = data.match(/\((.*)\)/)?.[1] || "";

      await browser.close();

      return { carCode, carType };
    });

  return results;
};

const LicenseUtils = {
  validateRegNr,
  getCarTypeData,
};

export default LicenseUtils;
