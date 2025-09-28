# Requirements Document

## Introduction

machinaRL Frontend is a production-ready web application that showcases a 3D reinforcement learning sandbox concept. The platform demonstrates how different AI models (ChatGPT, Claude, Grok, Gemini) can be embedded as "brains" within 3D geometric shapes (cubes, spheres, pyramids) that navigate through various courses. The frontend serves as both a marketing showcase and interactive demonstration platform, featuring a landing page, demo playground, and performance leaderboard.

## Requirements

### Requirement 1: Landing Page Experience

**User Story:** As a visitor, I want to understand what machinaRL is and see an engaging 3D demonstration, so that I can quickly grasp the concept and decide to explore further.

#### Acceptance Criteria

1. WHEN a user visits the root path (/) THEN the system SHALL display a hero section with the headline "Welcome to machinaRL 🌀" and explanatory subtext
2. WHEN the landing page loads THEN the system SHALL render a 3D viewport showing rotating geometric shapes on the right side
3. WHEN a user interacts with the 3D viewport THEN the system SHALL allow toggling between different AI models (ChatGPT, Claude, Grok, Gemini)
4. WHEN the hero section is displayed THEN the system SHALL provide CTA buttons for "Watch Demo", "View Leaderboard", and "Docs"
5. WHEN a user scrolls down THEN the system SHALL display a "How It Works" section with three columns explaining LLM Brains, Reinforcement Loop, and Evaluation
6. WHEN the courses section is visible THEN the system SHALL show a grid of course cards (Maze, Obstacle Run, Climbing Wall) with visual thumbnails
7. WHEN the abilities section loads THEN the system SHALL display unlocked abilities as interactive pills (Movement, Jumping, Climbing, Navigation)
8. WHEN the leaderboard preview is shown THEN the system SHALL display a compact sortable table with Model, Course, Best Time, and Abilities columns
9. WHEN a user reaches the bottom THEN the system SHALL show an FAQ accordion with 6 expandable items
10. WHEN the footer is displayed THEN the system SHALL include links to Docs, GitHub, social media, and legal pages

### Requirement 2: Interactive Demo Playground

**User Story:** As a user, I want to select different AI models and courses to see how they perform in a 3D environment, so that I can understand the concept through hands-on interaction.

#### Acceptance Criteria

1. WHEN a user navigates to /demo THEN the system SHALL display course selection options (Maze, Obstacle, Climb)
2. WHEN the demo page loads THEN the system SHALL provide shape selection (Cube, Sphere, Pyramid) and model selection (ChatGPT, Claude, Grok, Gemini)
3. WHEN a user makes selections THEN the system SHALL render a 3D scene showing the selected agent traversing the chosen course
4. WHEN the demo is running THEN the system SHALL display overlay information including model name, current ability, timer, and attempt count
5. WHEN controls are available THEN the system SHALL provide Play, Pause, and Reset functionality
6. WHEN the demo runs THEN the system SHALL execute a scripted path simulation at 60fps on desktop
7. WHEN abilities are unlocked during demo THEN the system SHALL visually indicate the progression
8. WHEN the demo is active THEN the system SHALL display a disclaimer stating "This demo is illustrative; training runs are offline. No live LLM calls."

### Requirement 3: Performance Leaderboard

**User Story:** As a user, I want to view and filter performance data across different AI models and courses, so that I can compare which models perform best in various scenarios.

#### Acceptance Criteria

1. WHEN a user navigates to /leaderboard THEN the system SHALL display a comprehensive data table
2. WHEN the leaderboard loads THEN the system SHALL show columns for Rank, Model, Course, Best Time, Attempts, Abilities Unlocked, and Date
3. WHEN filtering options are available THEN the system SHALL allow filtering by model and by course
4. WHEN a user clicks column headers THEN the system SHALL sort the data accordingly
5. WHEN the table is populated THEN the system SHALL pull data from the /api/leaderboard endpoint
6. WHEN the table is too wide for mobile THEN the system SHALL provide horizontal scrolling with sticky headers
7. WHEN data is loading THEN the system SHALL show appropriate loading states

### Requirement 4: Technical Performance Standards

**User Story:** As a user, I want the application to load quickly and run smoothly across devices, so that I have an optimal browsing experience.

#### Acceptance Criteria

1. WHEN the landing page is audited THEN the system SHALL achieve Lighthouse scores ≥ 90 for Performance, Best Practices, and SEO
2. WHEN the 3D hero animation runs on desktop THEN the system SHALL maintain 60fps performance
3. WHEN pages load THEN the system SHALL implement proper loading states and error boundaries
4. WHEN images are displayed THEN the system SHALL use optimized formats and lazy loading
5. WHEN the application is built THEN the system SHALL generate static pages where possible for optimal performance

### Requirement 5: Responsive Design and Accessibility

**User Story:** As a user with different devices and accessibility needs, I want the application to work well on any screen size and be navigable with keyboard or assistive technologies, so that I can access all functionality regardless of my setup.

#### Acceptance Criteria

1. WHEN viewed on mobile devices THEN the system SHALL adapt the hero section to stack vertically
2. WHEN tables are displayed on small screens THEN the system SHALL provide horizontal scrolling with sticky headers
3. WHEN interactive elements are focused THEN the system SHALL show visible focus indicators
4. WHEN using keyboard navigation THEN the system SHALL make all interactive components accessible via keyboard
5. WHEN color contrast is measured THEN the system SHALL maintain a ratio ≥ 4.5:1 for all text
6. WHEN screen readers are used THEN the system SHALL provide proper aria-labels and semantic HTML
7. WHEN animations are present THEN the system SHALL respect user preferences for reduced motion

### Requirement 6: API and Data Management

**User Story:** As a developer, I want well-structured API endpoints and data models, so that the frontend can efficiently retrieve and display information.

#### Acceptance Criteria

1. WHEN the application needs course data THEN the system SHALL serve it from src/data/courses.ts
2. WHEN leaderboard data is requested THEN the system SHALL provide it via /api/leaderboard endpoint
3. WHEN system health is checked THEN the system SHALL respond via /api/ping endpoint
4. WHEN mock data is needed THEN the system SHALL use structured JSON from src/data/leaderboard.json
5. WHEN API responses are returned THEN the system SHALL include proper HTTP status codes and error handling
6. WHEN data structures are defined THEN the system SHALL use TypeScript interfaces for type safety

### Requirement 7: Visual Design and Branding

**User Story:** As a user, I want the application to have a cohesive, modern design that reflects the high-tech nature of the product, so that I feel confident in the platform's quality and professionalism.

#### Acceptance Criteria

1. WHEN the application loads THEN the system SHALL use a dark, minimal theme with sci-fi aesthetics
2. WHEN colors are applied THEN the system SHALL use neutral base colors with electric blue/violet accents
3. WHEN text is displayed THEN the system SHALL use Inter/Manrope fonts for body text and JetBrains Mono for code labels
4. WHEN animations occur THEN the system SHALL use Framer Motion for smooth fades and hover states
5. WHEN 3D elements are rendered THEN the system SHALL implement smooth damping for natural movement
6. WHEN interactive elements are hovered THEN the system SHALL provide appropriate visual feedback
7. WHEN the design is implemented THEN the system SHALL maintain visual consistency across all pages