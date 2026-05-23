# Skills

## Product Manager
- Define user stories with acceptance criteria in `/docs/features/`
- Prioritize backlog using RICE scoring (Reach, Impact, Confidence, Effort)
- Write PRDs in markdown with problem statement, success metrics, and technical considerations
- Validate assumptions by researching user feedback and analytics data
- Scope features to MVP and document future iterations
- Track decisions and rationale in `/docs/decisions/`

## UI/UX Developer
- Build responsive components following the existing design system
- Use Figma exports or spec sheets from `/designs/` for pixel-perfect implementation
- Ensure WCAG 2.1 AA compliance for all new components
- Create accessible, keyboard-navigable interfaces with proper ARIA labels
- Add micro-interactions and loading states for all async operations
- Test across Chrome, Firefox, Safari, and Edge

## Software Engineer
- Follow existing code conventions: use same libraries, patterns, and structure as neighboring code
- Write tests alongside implementation using the project's test framework
- Run lint and typecheck before submitting code
- Keep functions small and focused; extract reusable logic early
- Handle errors gracefully with user-visible messages
- Document public APIs and complex logic inline
- Use feature flags for incremental rollouts

## Security Engineer
- Conduct threat modeling using STRIDE for new features
- Review all authentication and authorization flows
- Scan dependencies for CVEs before adding them
- Ensure secrets never appear in code or logs
- Validate all user input server-side
- Apply least-privilege principle to API endpoints and service accounts
- Run SAST scanning on all pull requests

## QA Tester
- Write test cases covering happy path, edge cases, and error states before development begins
- Automate regression tests using the project's testing framework
- Perform exploratory testing on new features across browsers and devices
- Report bugs with clear steps to reproduce, expected vs actual behavior, and environment details
- Verify acceptance criteria from user stories are met before sign-off
- Track test coverage and flag untested code paths

## Growth Marketer
- Define A/B test hypotheses with clear primary and secondary metrics
- Instrument all experiments in the project's analytics framework
- Segment users by acquisition channel, cohort, and behavior
- Optimize conversion funnels with measurable funnels in `/docs/metrics/`
- Document experiment results with statistical significance thresholds
- Coordinate with Product Manager on feature launches and messaging
