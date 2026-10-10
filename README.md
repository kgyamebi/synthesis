# Akwaaba Ghana – Discover and Plan Your Trip

Kofi-Asante Gyamebi (02522028) · Web Technologies · Ashesi University

A travel web app for Ghana with three interactive features:

1. **Explore** – 8 real places in Ghana as cards. Click Beaches / Nature / History to filter them.
2. **Trip quiz** – answer 3 questions and the app recommends a place for you.
3. **Budget planner** – choose a place, days, travellers, transport and a guide. The total,
   breakdown and a day-by-day plan update instantly as you change anything.

## How to run

```
python -m http.server 8000
```

Then open http://127.0.0.1:8000/index.html (or double-click `start-server.bat`).

## Files

| File | What it holds |
|---|---|
| `index.html` | The structure and content (Lessons 1–5) |
| `styles.css` | All the styling and layout (Lessons 6–7) |
| `script.js` | All the interactivity (Lessons 8–9) |

---

## Which lesson each part comes from

| Lesson | Where it is used |
|---|---|
| 1 – How the web works | Served by a local web server, viewed at `http://127.0.0.1:8000` |
| 2 – HTML basics, head, metadata | `<meta charset>`, `viewport`, `author`, `description`, `<title>`, comments |
| 3 – Text, lists, structure | `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`; `ul`, `ol`, `dl`; `em`, `strong` |
| 4 – Links | In-page links `#explore`, `#quiz`, `#planner`, `#top` |
| 5 – Forms and HTML APIs | Quiz and planner forms: `fieldset`, `legend`, `label`, radio, checkbox, `select`, number inputs with `min`/`max`; `<noscript>`; `addEventListener`, `hidden` |
| 6 – CSS basics | External stylesheet, type/class/descendant selectors, grouping, `:hover`, `:has(:checked)`, gradients, `rgb()` colours, `transform`, `calc()`, shorthands, comments |
| 7 – Box model and responsive design | `box-sizing: border-box`, `display: block / inline-block`, padding/margin/border, flexbox (nav, stats, breakdown), grid (cards, planner, quiz), mobile-first `@media (width >= ...)`, `calc(2rem + 4vw)` heading, viewport meta tag |
| 8 – Exploring JavaScript | `console.log`, `const` and `let`, arrays, functions with parameters and `return`, arithmetic, `getElementById` + `textContent`, `toFixed(2)` |
| 9 – Expressions and control flow | `if / else if / else`, `switch`, comparison (`===`, `<`, `>=`), logical (`&&`, `||`), ternary `? :`, `for` loops, `++`, `%` |

---

## How the JavaScript works (plain English)

**Arrays (top of script.js)** – `places`, `dailyCost` and `emojis` line up by position.
Index 5 is Cape Coast Castle in all three, so `dailyCost[5]` is its price (260).

**Greeting** – gets the hour with `new Date().getHours()`. `if` it is before 12 say good morning,
`else if` before 17 say good afternoon, `else` good evening. Then put it on the page with `textContent`.

**Filter (`showCategory`)** – a `for` loop goes through every card. If the category is `"all"` **or** (`||`)
the card has that class, show it (`display = "block"`) and add 1 to `shown`; otherwise hide it
(`display = "none"`). A second loop highlights the clicked button.

**Quiz** – when the form is submitted, `preventDefault()` stops the page reloading. A `for` loop reads
each answer and counts `beach`, `nature` and `history`. If an answer is empty, it shows an error and
`return`s (stops). The biggest count wins (`if / else if / else`), then a `switch` picks the place and message.

**Planner (`calculateBudget`)** – reads the form values and turns them into numbers with `Number()`.
- Checks the numbers first: if days or travellers are out of range, show an error and stop.
- `stay = dailyCost × days × travellers`
- `transport = transportCost(type) × travellers` (the function uses a `switch`)
- `guide = wantsGuide ? 150 × days : 0` (ternary)
- Discount: `travellers >= 4 && days >= 3` (both must be true) → 10% off
- Budget level with `if / else if / else` on the cost per person
- `money()` formats numbers as `GH₵ 1234.00` using `toFixed(2)`

**Day plan (`buildDayPlan`)** – a `for` loop from day 1 to the number of days. Day 1 is "Travel to…",
the last day is "Last morning…", middle days pick an activity from an array using `%` (remainder) so
they cycle through the list. Each line is a new `<li>` made with `createElement` and added with `appendChild`.

**Live updates** – `plannerForm.addEventListener("input", calculateBudget)` reruns the calculation
every time anything in the planner changes.

---

## Likely quiz questions

| Question | Answer |
|---|---|
| Difference between `const` and `let`? | `const` can't be reassigned (e.g. `places`, `GUIDE_PER_DAY`); `let` can (e.g. `shown`, `greeting`). |
| Why `Number()` on the inputs? | Form values are always strings. `"3" * 2` works but `"3" + 2` gives `"32"`, so convert first. |
| What does `===` do? | Checks equal value **and** type. |
| What does `&&` do in the discount? | Both conditions must be true: 4+ travellers **and** 3+ days. |
| What does `\|\|` do in the filter? | Only one needs to be true: "all" is chosen **or** the card matches. |
| What does `? :` do? | A short if/else: `wantsGuide ? 150 * days : 0`. |
| Why `break` in a `switch`? | Stops it running into the next case. |
| What does `return` do inside the quiz loop? | Stops the whole function early when a question is unanswered. |
| What does `%` do? | Gives the remainder. `5 % 4` is 1, so activities cycle 0, 1, 2, 3, 0... |
| `textContent` vs typing in HTML? | `textContent` changes the words inside an element from JavaScript. |
| What is `<noscript>` for? | Shows a message only when JavaScript is turned off. |
| Why `event.preventDefault()`? | A form normally reloads the page when submitted; this stops that. |
| What does `box-sizing: border-box` do? | Width includes padding and border, so boxes are the size you set. |
| Why `display: inline-block` on links? | Inline elements ignore vertical padding; inline-block respects it. |
| What does "mobile first" mean? | Base CSS is for phones; `@media (width >= ...)` adds columns for bigger screens. |
| What does `grid-template-columns: 1fr 1fr` do? | Two equal columns; `fr` shares the free space. |
| What does `calc(2rem + 4vw)` do? | Heading grows with the screen width but can still be zoomed. |
| What does `:has(:checked)` do? | Styles a label that contains a checked radio/checkbox. |

## Small extras (one line each, outside the lessons)

- `scroll-behavior: smooth;` – makes the in-page links glide instead of jumping.
- `transition: transform 0.2s;` – makes hover movement smooth instead of instant.
- `box-shadow` – the soft shadow under the cards (Lesson 7 mentions shadows).

Delete any of these lines and the app still works exactly the same.
