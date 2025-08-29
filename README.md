#  Bubbles App - Testing

This is a simple HTML5 Canvas project built with **plain JavaScript and HTML** (no external libraries).  
It was created as part of a manual tester assignment.

---

##  Features
- Draws a **circle (bubble)** on the left side of the canvas with a **random color**.
- Draws an **arrow** on the right side of the canvas.
- **Hit button**: makes the arrow fly towards the circle.
- When the arrow **hits the circle**, the circle changes its color.
- **Reset button**: restores the initial state with a fresh random-colored circle.
- Optional: Clicking inside the canvas repositions the circle vertically.
- Keyboard shortcuts:  
  - `Space` / `Enter` → Hit  
  - `R` → Reset  

---

---

## 🚀 How to Run
1. Download or clone the project folder.
2. Open **index.html** in any modern browser (Chrome, Edge, Firefox, Safari).
3. Play with the app:
   - Click **Hit** to fire the arrow.
   - Watch the circle change color on hit.
   - Click **Reset** to restart.
   - (Optional) Click inside the canvas to move the circle vertically.

---

## 🎨 Example Preview
Canvas when loaded initially:

After pressing **Hit**, the arrow moves left, and if it collides with the circle, the circle changes color.

---

## 📂 Requirements
- No external libraries are needed.
- Works in any modern browser that supports `<canvas>`.

---

## ✨ Extra Notes
- Code is fully commented for clarity.
- Canvas is drawn with a **black border** (as per assignment requirement).
- Can be easily extended with multiple bubbles, scoring, or animations.
