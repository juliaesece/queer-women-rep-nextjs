import { test, expect } from '@playwright/test';

test('Advanced search', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Advanced search' }).click();
    await page.locator('select[name="genderIdentity"]').selectOption('Non-Binary');
    await page.locator('select[name="lifeStage"]').selectOption('Teenager');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page).toHaveURL(/person=.*genderIdentity.*Non-Binary.*lifeStage.*Teenager/);
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - main:
      - group:
        - text: "One of the people is: Gender"
        - combobox:
          - option "Any (excluding male)" [selected]
          - option "Woman"
          - option "Non-Binary"
          - option "Other"
        - text: Sexual orientation
        - combobox:
          - option "Any (excluding straight)" [selected]
          - option "Lesbian"
          - option "Bisexual"
          - option "Pansexual"
          - option "Undefined, assumed wlw/queer"
          - option "Other"
        - text: Gender modality
        - combobox:
          - option "Any"
          - option "Cisgender"
          - option "Trans"
          - option "Non-Binary" [selected]
          - option "Other"
        - text: Gender expression
        - combobox:
          - option "Any" [selected]
          - option "Femme"
          - option "None/somewhere in between"
          - option "Soft-butch"
          - option "Stem"
          - option "Butch"
          - option "Stud"
          - option "Androgynous"
          - option "Fluid/other"
        - text: Life-stage
        - combobox:
          - option "Any"
          - option "Children"
          - option "Teenager" [selected]
          - option "Young-adult"
          - option "Adult"
          - option "Senior"
          - option "Not relevant (e.g. fantasy) or unknown"
        - group:
          - text: Check all which apply (the search will be with “or”; unchecked will search for everyone)
          - checkbox "Black/African American"
          - text: Black/African American
          - checkbox "Indigenous"
          - text: Indigenous
          - checkbox "White"
          - text: White
          - checkbox "East Asian"
          - text: East Asian
          - checkbox "South Asian"
          - text: South Asian
          - checkbox "Southeast Asian"
          - text: Southeast Asian
          - checkbox "MENA (Middle East & North Africa)"
          - text: MENA (Middle East & North Africa)
          - checkbox "Central Asian"
          - text: Central Asian
          - checkbox "Latinx"
          - text: Latinx
          - checkbox "Other"
          - text: Other
        - group:
          - text: Which country are they from? Country
          - combobox "Country"
          - button "Open"
      - group: "Filters for the relationship:"
      - group: "Filters for the story:"
      - group: "Filters for concerns:"
      - button "Remove all filters"
      - button "Search"
      - heading "Results:" [level=2]
      - link "Syd and Elena smile at each other. Elena is in a suit. Elena and Syd One Day at a Time":
        - /url: "?info=6198574c5a59be3f25684647"
        - img "Syd and Elena smile at each other. Elena is in a suit."
        - heading "Elena and Syd" [level=3]
        - paragraph: One Day at a Time
      - link "The image shows two young women, one with braided dark hair and the other with wavy blonde hair, embracing each other and looking out over a cityscape in the background. The woman with braided hair is wearing a light blue jacket and the woman with blonde hair is wearing a peach-colored sweatshirt with a heart graphic. They appear to be sharing a tender, affectionate moment together. Tara and Darcy Heartstopper":
        - /url: "?info=6793d5a17a06a4ce86970cc7"
        - img "The image shows two young women, one with braided dark hair and the other with wavy blonde hair, embracing each other and looking out over a cityscape in the background. The woman with braided hair is wearing a light blue jacket and the woman with blonde hair is wearing a peach-colored sweatshirt with a heart graphic. They appear to be sharing a tender, affectionate moment together."
        - heading "Tara and Darcy" [level=3]
        - paragraph: Heartstopper
      - link "Petal and Alex The A List":
        - /url: "?info=69d081f06a37c560b8d79e97"
        - heading "Petal and Alex" [level=3]
        - paragraph: The A List
    `);
    await expect(page.getByRole('link', { name: 'Syd and Elena smile at each' })).toBeVisible();
});