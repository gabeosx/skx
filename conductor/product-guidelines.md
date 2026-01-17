# Product Guidelines: skx

## Tone & Voice
- **Professional & Technical:** The tool should communicate with clarity and precision. Avoid fluff; focus on providing the user with the exact information they need to manage their skills effectively.
- **Utility-First:** Every interaction should serve a clear purpose, prioritizing efficiency and accuracy in both CLI and interactive modes.

## Visual Identity (Terminal UI)
- **Modern & Stylized:** Utilize modern CLI UI libraries (like `clack`, `chalk`, or `ink`) to create a polished experience. 
- **Interactive Elements:** Use symbols, borders, and subtle color accents to distinguish between different types of information (e.g., success messages, prompts, skill details).
- **Consistency:** Maintain a consistent layout and color scheme throughout the application to build user familiarity.

## Error Handling
- **Actionable & Descriptive:** Errors should not just state that something went wrong. They must explain *why* it failed and, whenever possible, provide a clear path to resolution (e.g., "Skill not found in registry. Try running `skx search` to find the correct name.").
- **User-Centric Messages:** Avoid raw system errors; translate technical failures into human-readable advice.
