Hospital Appointment and Patient Management System (Angular)

Phase 1: UI Scaffolding & Domain Modeling

This project represents the early-stage development of a healthcare platform. It focuses on establishing a professional architecture, strong typing, and presentational component design before integrating complex business logic or backend services.

 🎯 Engineering Objectives
1.  Strict Separation of Concerns:
    -   Models: Pure TS interfaces defining the domain (no classes with behavior).
    -   Mock Data: Static data layer in "src/app/mock-data/" mimicking an API response.
    -   Components: Purely presentational ("Dumb Components") handling UI and inputs/outputs.
    -   Container: "AppComponent" acts as the "Smart Component" managing state and orchestration.

2.  Type Safety:
    -   Strict TypeScript usage with interfaces ("Doctor", "Patient", "Appointment").
    -   No "any" types; usage of Union Types for status fields.
<img width="1087" height="270" alt="image" src="https://github.com/user-attachments/assets/37ce410b-2249-4f81-ace2-8141fc506121" />

 🛠 Tech Stack
-   Framework: Angular 21 (Standalone Components)
-   Language: TypeScript 5.2+
-   Styling: Vanilla CSS (Modular & Scoped)
-   Architecture: Component-based, Data-driven

<img width="893" height="480" alt="image" src="https://github.com/user-attachments/assets/cbf01c99-d6bf-4e66-9ef6-68e4ee8c5fcb" />

 🚀 How to Run
1.  Clone: "git clone <repo-url>"
2.  Install: "npm install"
3.  Run: "ng serve"
4.  Visit: "http://localhost:4200"

 🔮 Future Scope (Phase 2 & 3)
-   Routing: migration to "@angular/router" for view management.
-   Services: Moving data fetching from "AppComponent" to injectable services ("DoctorService").
-   Backend: Integration with a NestJS/Spring Boot API.
-   State: Implementation of NgRx or Signals for global state management.
