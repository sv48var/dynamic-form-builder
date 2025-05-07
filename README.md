# Angular Dynamic Form Builder

This Angular application allows users to dynamically create a form with custom fields, then render and submit the form with validations. It was built as part of a frontend assignment for Amigo.

---

## Task Objective

The goal is to create a dynamic form builder using Angular Reactive Forms. The user should be able to:

- Configure custom form fields
- Generate the form based on this configuration
- Validate required fields
- Submit the form and view the submitted data in JSON format

---

## Features

### Form Configuration Page

- Add multiple form fields dynamically
- Each field includes:
  - A label
  - Type selector: `Text`, `Number`, `Email`, or `Dropdown`
  - Required toggle
  - Custom dropdown options (if type is `Dropdown`)
- Fields can be removed from the configuration

### Generated Form Page

- Displays form based on configuration
- Real-time validation on required fields
- On submission:
  - Shows inline validation errors if any
  - Displays submitted data in JSON format

---

## Tech Stack

- Angular 13+
- Angular Reactive Forms (`FormBuilder`, `FormGroup`, `FormArray`)
- Angular Material (UI components)
- TypeScript
- CSS/SCSS

---

## Getting Started

# Clone the repo
git clone https://github.com/sv48var/dynamic-form-builder.git
cd angular-dynamic-form-builder

# Install dependencies
npm install

# Run the app locally
ng serve

# Optional: Build the app
ng build

## Project Structure
src/
├── app/
│   ├── form-config/         # Component to create and edit form fields
│   ├── generated-form/      # Component to render and submit the dynamic form
│   ├── services/
│   │   └── form-state.service.ts  # Shared service for form configuration
│   ├── app-routing.module.ts
│   └── app.module.ts