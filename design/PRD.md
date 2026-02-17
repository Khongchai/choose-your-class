Product Requirements Document (PRD): Music Learning Preference Web App
1. Project Overview & Environment
Target Audience: Pre-college and college students majoring in music (Classical and Thai traditional traditions).
Core Objective: A pilot study web application used in a live exhibition to assess participants' learning preferences based on Kolb's Experiential Learning Theory.
Key Measurement: Determine if students lean toward visual or aural dominance, mapping their scores to the CE, RO, AC, and AE quadrants.
Environment: Live exhibition. The app must be highly responsive, support audio playback, and handle quick user resets after each participant finishes.
2. User Flow & Screen Requirements
Screen 1: Start Page
UI Elements: Title of the study/exhibition, a brief welcoming description, and a clear "Start Assessment" button.
Screen 2: Consent Form
Functionality: Mandatory gatekeeping for academic research ethics.
UI Elements: Scrollable text box containing the study's terms (anonymity, data usage, right to withdraw).
Logic: The "Continue" button must remain disabled until a checkbox ("I agree to participate") is selected. A boolean flag (consent_given = true) must be logged in the database.
Screen 3: Self-Assessment (Knowledge Transformation)
Goal: Measure Active Experimentation (AE) vs. Reflective Observation (RO).
Content: 7 multiple-choice questions.
Logic: * Randomization: The order of the 7 questions, and the order of the choices within them, must be randomized per user to prevent screen-copying in the exhibition.
Screen 4: Performance Test (Grasping Knowledge)
Goal: Measure Concrete Experience (CE - Aural/Ears) vs. Abstract Conceptualization (AC - Visual/Eyes).
Content: 7 performance-based questions involving audio playback and visual music theory.
Crucial Logic Requirements:
Randomization: Question and choice order must be randomized.
The 10-Second Timer: A visible countdown timer starts when the question loads. If the user selects an answer before 10 seconds, record the exact time taken (e.g.,  4.32  seconds) and move to the next question.
Timeout: If the timer hits 0, auto-advance to the next question and record a score of 0 for that specific item.
Rhythm Tapping Mechanic: For questions requiring participants to tap a button to a rhythm, the developer must build an Acceptable Margin of Error.
Dev Instruction: Define the correct rhythm as an array of timestamp intervals. When the user taps, calculate the delta. If the user's tap falls within a defined tolerance window (e.g.,  \pm 200  milliseconds), score it as a hit. Calculate the total percentage of correct hits to determine if the answer passes as "Correct" (1) or "Incorrect" (0).
Screen 5: Results & Persona
UI Elements: * The Persona Card: Modeled after the Cosmos Persona reference. Dynamically displays an illustration, Strengths, Weaknesses, and Cosmic Ingredients based on the user's final dominant quadrant (Accommodator, Diverger, Converger, Assimilator). * The Radar/Scatter Chart: A visual 2x2 grid plotting the user's exact score.
Logic: The system must calculate the final coordinates to place a visual marker on the chart (see Scoring Rubric below).
"Save My Result" Image Download
Functionality: Participants must be able to save their final Persona Card and Radar Chart to their device to share with friends or keep as a souvenir.
UI Elements: A prominent "Download Image" or "Save to Camera Roll" button below the results.
Technical Requirement: The developer should use a frontend library (such as html2canvas or similar) to capture a composite snapshot of the DOM (the Persona illustration, the text, and the plotted 2x2 radar chart) and automatically trigger a .PNG or .JPG download to the user's mobile device or computer.
3. Scoring Rubric & Data Logic
The app will use a binary scoring system (0 or 1) for a total of 14 questions.
Part 1: Self-Assessment (7 Questions)
Maps to the X-Axis (Transformation).
Each question has choices mapped to either AE or RO.
Example Logic: If Question 1 choice is AE-dominant,  AE = AE + 1 . If RO-dominant,  RO = RO + 1 . Total combined score for this section will equal 7.
Part 2: Performance Test (7 Questions)
Maps to the Y-Axis (Grasping Knowledge).
Each question has choices mapped to either CE (Aural) or AC (Visual).
Example Logic: If Question 8 choice is CE-dominant,  CE = CE + 1 . If AC-dominant,  AC = AC + 1 . Total combined score for this section will equal 7.
Coordinate Mapping for the Result Chart:
To plot the user on the 2x2 grid, the developer will calculate the net score for both axes:
 X = AE - RO  (Values will range from -7 to +7)
 Y = CE - AC  (Values will range from -7 to +7)
The resulting  (X, Y)  coordinate dictates both their position on the chart and which Persona Card to display.
4. Backend, Data Storage, & Researcher Export
Database Security: The database must securely store anonymous results. No personally identifiable information (PII) should be tied to the test data, ensuring complete participant confidentiality.
Admin Data Export (Excel/CSV): * Functionality: Provide a secure, hidden admin URL or dashboard where the researcher can click a button to download the entire database as a clean .XLSX (Excel) or .CSV file.
Data Formatting: The columns in the Excel sheet must be formatted cleanly as numerical values (0 or 1 for answers, exact decimals for timing) so the sheet is immediately ready to be imported into statistical analysis software without manual cleanup.

