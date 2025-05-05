## T6: Testarea interfeței grafice a unei aplicații web

### Autor: Nicolae Pleșco

### Cerințe

- Să se realizeze un studiu comparativ a cel puţin 2 framework-uri de testare, evidențiindu-se
utilitatea şi ușurința în folosire a fiecăruia. Pe baza unor exemple de cod, se vor evidenția
diferențele dintre tool-uri.
- Folosiți un framework pentru a realiza teste ale interfeței grafice a unei aplicații web (teste
de funcționalitate, navigare, validare formular, compatibilitate browser et al.). Motivați alegerea
făcută.

---

### 1. Introducere

Testarea interfeței grafice (GUI) este esențială pentru asigurarea calității aplicațiilor web, deoarece interfața 
este primul punct de contact cu utilizatorul. Un sistem robust de testare a GUI-ului asigură funcționalitatea, 
accesibilitatea, compatibilitatea și experiența utilizatorului pe diferite browsere și platforme. 

În acest proiect, vom realiza:

- Un studiu comparativ între trei framework-uri populare de testare a interfeței grafice: **Selenium WebDriver**, **Cypress** și **Playwright**.
- Exemple de cod pentru cele 3 framework-uri, evidențiind diferențele de utilizare.
- Implementarea unui set de teste automate pentru o aplicație web folosind Cypress, cu justificarea alegerii.
- Documentație, capturi de ecran și interpretarea rezultatelor.
- Raport despre folosirea unui tool AI pentru generarea de teste și comparația cu testele proprii.

---

### 2. Studiu comparativ: Selenium WebDriver, Cypress și Playwright

#### **Selenium WebDriver**

- **Descriere:** Selenium este un framework open-source matur, utilizat pe scară largă pentru automatizarea testelor web. Permite scrierea testelor în mai multe limbaje (Java, Python, C#, JavaScript) și suportă testarea pe toate browserele majore.
- **Utilitate:** Ideal pentru testare cross-browser, integrare cu CI/CD, testare pe scară largă și pentru proiecte complexe.
- **Ușurință în folosire:** Necesită configurare suplimentară (instalare drivere browser, setup de limbaj), dar oferă flexibilitate maximă.
- **Avantaje:**
    - Suport extins pentru browsere și sisteme de operare.
    - Integrare cu multe alte tool-uri (TestNG, JUnit, Jenkins).
    - Comunitate mare, documentație bogată.
- **Dezavantaje:**
    - Debugging-ul poate fi dificil.
    - Testele pot fi mai lente din cauza comunicării cu browserul prin drivere externe.
    - Necesită gestionarea explicită a sincronizărilor (waits).

#### **Cypress**

- **Descriere:** Cypress este un framework modern, axat pe aplicații web JavaScript. Rulează direct în browser, oferind feedback instant și instrumente vizuale avansate pentru debugging.
- **Utilitate:** Excelent pentru testarea rapidă a aplicațiilor moderne, debugging facil, testare end-to-end și componentă.
- **Ușurință în folosire:** Instalare rapidă (npm), test runner grafic, sintaxă intuitivă, fără configurări complexe de drivere.
- **Avantaje:**
    - Test runner interactiv cu time-travel debugging.
    - Automatizare rapidă și stabilă, fără „flaky tests”.
    - Integrare ușoară cu CI, capturi de ecran și video la fiecare test.
    - Sincronizare automată (waits implicite).
- **Dezavantaje:**
    - Suport limitat pentru browsere (Chrome, Edge, Firefox, dar nu Safari complet).
    - Nu poate testa aplicații non-JS sau interfețe desktop.
    - Nu permite testarea pe browsere mobile reale (doar simulare).

#### **Playwright**

- **Descriere:** Playwright este un framework modern, dezvoltat de Microsoft, pentru automatizarea testării aplicațiilor web. Acesta permite scrierea de teste end-to-end rapide și fiabile, cu suport complet pentru toate motoarele de randare moderne (Chromium, Firefox, WebKit), ceea ce asigură testarea pe toate browserele majore.
- **Utilitate:** Oferă testare end-to-end robustă pentru aplicații moderne, cu suport extins pentru toate browserele majore, inclusiv Safari și emulare mobilă.
- **Ușurință:** Instalare rapidă, API intuitiv, debugging avansat (Inspector, trace viewer), auto-waiting, suport pentru scenarii complexe (multi-tab, pop-up, iframes).
- **Avantaje:** Suport complet cross-browser, emulare mobilă, debugging avansat, rapiditate, API modern.
- **Dezavantaje:** Comunitate și ecosistem mai noi, integrare CI/CD poate necesita ajustări pentru proiecte foarte mari.


#### **Tabel comparativ**

| Criteriu                | Selenium WebDriver        | Cypress                      | Playwright                   |
|-------------------------|---------------------------|------------------------------|------------------------------|
| Limbaje suportate       | Java, Python, C#, JS etc. | JavaScript, TypeScript       | JS, TS, Python, C#, Java     |
| Browsere suportate      | Toate majore              | Chrome, Edge, Firefox        | Chrome, Edge, Firefox, Safari|
| Instalare               | Complexă (drivere)        | npm, rapid                   | npm, rapid                   |
| Test runner GUI         | Nu                        | Da                           | Da (UI Mode)                 |
| Cross-browser           | Da                        | Parțial                      | Da                           |
| Debugging               | Dificil                   | Vizual, time-travel          | Inspector, trace viewer      |
| Waits (sincronizare)    | Manuale                   | Implicite                    | Implicite                    |
| Testare mobilă          | Indirect (cu Appium)      | Nu                           | Da (emulare, nu nativ)       |
| Comunitate              | Foarte mare               | În creștere                  | Rapid în creștere            |

---

### 3. Exemple de cod: Selenium vs Cypress vs Playwright

#### **Exemplu Selenium (Java)**

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class ToDoAppTest {
  @Test
  public void addAndCompleteTask() {
    WebDriver driver = new ChromeDriver();
    driver.get("http://localhost:3000");

    WebElement input = driver.findElement(By.id("todo-input"));
    input.sendKeys("Aleargă");
    driver.findElement(By.cssSelector("button[type='submit']")).click();

    WebElement task = driver.findElement(By.xpath("//div[contains(@class, 'todo-item') and contains(., 'Aleargă')]"));
    Assert.assertTrue(task.isDisplayed());

    WebElement checkbox = task.findElement(By.cssSelector("input[type='checkbox']"));
    checkbox.click();

    WebElement completedTask = driver.findElement(By.xpath("//div[contains(@class, 'todo-item completed') and contains(., 'Aleargă')]"));
    Assert.assertTrue(completedTask.isDisplayed());

    driver.quit();
  }
}
```
*Comentariu:* Necesită setup pentru ChromeDriver, folosirea explicită a selectorilor, gestionarea manuală a sincronizărilor dacă elementul nu apare imediat.

#### **Exemplu Cypress (JavaScript)**

```javascript
describe('ToDo App Tests', () => {
  it('should add a new task', () => {
    cy.visit('http://localhost:3000'); // Replace with your ToDo app URL
    cy.get('#todo-input').type('Aleargă');
    cy.get('button[type="submit"]').click();
    cy.contains('.todo-item', 'Aleargă').should('be.visible');
  });

  it('should mark a task as completed', () => {
    cy.contains('.todo-item', 'Aleargă')
            .find('input[type="checkbox"]')
            .check({ force: true });
    cy.contains('.todo-item.completed', 'Aleargă').should('exist');
  });
});
```
*Comentariu:* Nu necesită setup suplimentar, comenzi simple, waits automate, feedback vizual instant.


#### **Exemplu Playwright (JavaScript)**
```javascript
const { test, expect } = require('@playwright/test');

test('should add and complete a task in ToDo app', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Replace with your ToDo app URL
  await page.fill('#todo-input', 'Aleargă');
  await page.click('button[type="submit"]');
  await expect(page.locator('.todo-item', { hasText: 'Aleargă' })).toBeVisible();

  const checkbox = page.locator('.todo-item:has-text("Aleargă") input[type="checkbox"]');
  await checkbox.check();
  await expect(page.locator('.todo-item.completed:has-text("Aleargă")')).toBeVisible();
});
```
*Comentariu:* API modern, suport pentru toate browserele, auto-waiting, debugging avansat.

**Observații:**
- Cypress și Playwright oferă sintaxă modernă, simplă, cu așteptări implicite și debugging vizual.
- Playwright permite testare pe mai multe browsere, inclusiv Safari, și scenarii complexe (ex: multi-tab).
- Selenium necesită gestionare manuală a driverelor și sincronizărilor, dar oferă cea mai largă compatibilitate.

---

### 4. Implementare: Teste automate cu Cypress

#### **Motivația alegerii Cypress**

Am ales Cypress pentru partea practică deoarece:
- Permite dezvoltarea rapidă a testelor cu feedback vizual și debugging facil.
- Am mai avut experiență cu el.
- Este ideal pentru aplicații moderne, scrise în JavaScript, și pentru echipe care doresc integrare rapidă cu CI/CD.
- Asigură stabilitate și viteză la rularea testelor, eliminând multe probleme de sincronizare care apar la Selenium.

#### **Structura testelor**

Vom testa următoarele aspecte ale aplicației ToDo:

- Adăugarea unei sarcini noi
- Marcarea unei sarcini ca finalizată
- Filtrarea sarcinilor active
- Filtrarea sarcinilor finalizate
- Editarea unei sarcini existente
- Ștergerea unei sarcini existente


**Test de compatibilitate browser**  
Cypress permite rularea testelor pe Chrome, Edge, Firefox, cu o singură comandă:
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
```

---

### 5. Documentație și rezultate

- **Configurație hardware/software:**
    - OS: macOS 15.4.1
    - Node.js: v18.x
    - Cypress: v14.x
    - Browsere: Chrome 135, Firefox 126
    - 
- **Setup:**
    - Instalare Cypress: `npm install cypress --save-dev`
    - Structură proiect: `/test/cypress/cypress/e2e/`, `/test/cypress/cypress/fixtures/`
  
- **Rulare teste:**
    - `npm run cy:open` (`npx cypress open`) pentru UI, `npm run cy:tests` (`npx cypress run`) pentru headless
    - 
- **Capturi de ecran și rezultate:**
    - Cypress generează automat capturi la fiecare test eșuat și rapoarte detaliate.
    - Testele au trecut pe ambele browsere.

---


### Concluzii

- **Cypress** oferă o experiență superioară pentru testarea rapidă și stabilă a interfeței grafice a aplicațiilor web moderne, cu debugging vizual și setup minim.
- **Selenium** rămâne alegerea potrivită pentru proiecte mari, multi-platformă, unde este necesară testarea pe browsere diverse și integrarea cu alte tool-uri.
- **Playwright** este o alegere excelentă pentru proiecte moderne, multi-platformă, care necesită testare pe browsere diverse, inclusiv Safari, cu suport pentru emulare mobilă, debugging avansat și execuție rapidă.
- Utilizarea AI pentru generarea de teste poate accelera procesul, dar testele scrise manual, structurate și adaptate aplicației, oferă o acoperire și întreținere mai bună.
- Toate framework-uri pot fi integrate în pipeline-uri CI/CD pentru testare automată la fiecare commit.

---
