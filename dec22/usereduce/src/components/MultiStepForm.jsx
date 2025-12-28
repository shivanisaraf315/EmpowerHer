import { useReducer } from "react";

const initialState = {
  step: 1,
  values: {
    name: "",
    email: "",
    username: "",
    password: "",
  },
  errors: {}, // bonus: validation errors
  isSubmitted: false,
};

function validateStep(step, values) {
  const errors = {};

  if (step === 1) {
    if (!values.name.trim()) errors.name = "Name is required";
    if (!values.email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Invalid email format";
  }

  if (step === 2) {
    if (!values.username.trim()) errors.username = "Username is required";
    if (!values.password) errors.password = "Password is required";
    else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";
  }

  return errors;
}

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD": {
      const { field, value } = action.payload;

      const updatedValues = { ...state.values, [field]: value };

      // Clear error for that field while typing (optional but nice)
      const updatedErrors = { ...state.errors };
      if (updatedErrors[field]) delete updatedErrors[field];

      return { ...state, values: updatedValues, errors: updatedErrors };
    }

    case "NEXT_STEP": {
      const errors = validateStep(state.step, state.values);
      if (Object.keys(errors).length > 0) {
        return { ...state, errors };
      }
      return { ...state, step: Math.min(3, state.step + 1), errors: {} };
    }

    case "PREVIOUS_STEP": {
      return { ...state, step: Math.max(1, state.step - 1), errors: {} };
    }

    case "SUBMIT_FORM": {
      // Validate step 2 before submitting (since step 3 is review)
      const errorsStep1 = validateStep(1, state.values);
      const errorsStep2 = validateStep(2, state.values);
      const allErrors = { ...errorsStep1, ...errorsStep2 };

      if (Object.keys(allErrors).length > 0) {
        // If something missing, move user to first invalid step
        const goToStep = Object.keys(errorsStep1).length > 0 ? 1 : 2;
        return { ...state, step: goToStep, errors: allErrors, isSubmitted: false };
      }

      return { ...state, isSubmitted: true };
    }

    case "RESET_FORM": {
      return initialState;
    }

    default:
      return state;
  }
}

export default function MultiStepForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { step, values, errors, isSubmitted } = state;

  // bonus: disable Next until required fields are filled (basic check)
  const canGoNext =
    step === 1
      ? values.name.trim() && values.email.trim()
      : step === 2
      ? values.username.trim() && values.password
      : true;

  return (
    <div className="ms-wrap">
      <h2>Multi-Step User Registration Form (useReducer)</h2>

      {/* Progress Indicator (bonus) */}
      <div className="progress">
        <div className={step === 1 ? "dot active" : "dot"}>1</div>
        <div className="line" />
        <div className={step === 2 ? "dot active" : "dot"}>2</div>
        <div className="line" />
        <div className={step === 3 ? "dot active" : "dot"}>3</div>
      </div>

      {isSubmitted ? (
        <div className="card">
          <h3>Submitted Successfully ✅</h3>
          <div className="review">
            <p>
              <b>Name:</b> {values.name}
            </p>
            <p>
              <b>Email:</b> {values.email}
            </p>
            <p>
              <b>Username:</b> {values.username}
            </p>
            <p>
              <b>Password:</b> {"*".repeat(values.password.length)}
            </p>
          </div>

          <button className="btn" onClick={() => dispatch({ type: "RESET_FORM" })}>
            Reset Form
          </button>
        </div>
      ) : (
        <div className="card">
          {step === 1 && (
            <>
              <h3>Step 1: Personal Details</h3>

              <label className="label">
                Name
                <input
                  className="input"
                  value={values.name}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      payload: { field: "name", value: e.target.value },
                    })
                  }
                />
                {errors.name && <span className="err">{errors.name}</span>}
              </label>

              <label className="label">
                Email
                <input
                  className="input"
                  value={values.email}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      payload: { field: "email", value: e.target.value },
                    })
                  }
                />
                {errors.email && <span className="err">{errors.email}</span>}
              </label>

              <div className="actions">
                <button
                  className="btn"
                  onClick={() => dispatch({ type: "NEXT_STEP" })}
                  disabled={!canGoNext}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3>Step 2: Account Details</h3>

              <label className="label">
                Username
                <input
                  className="input"
                  value={values.username}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      payload: { field: "username", value: e.target.value },
                    })
                  }
                />
                {errors.username && <span className="err">{errors.username}</span>}
              </label>

              <label className="label">
                Password
                <input
                  type="password"
                  className="input"
                  value={values.password}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      payload: { field: "password", value: e.target.value },
                    })
                  }
                />
                {errors.password && <span className="err">{errors.password}</span>}
              </label>

              <div className="actions">
                <button className="btn secondary" onClick={() => dispatch({ type: "PREVIOUS_STEP" })}>
                  Previous
                </button>
                <button
                  className="btn"
                  onClick={() => dispatch({ type: "NEXT_STEP" })}
                  disabled={!canGoNext}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3>Step 3: Review & Submit</h3>

              <div className="review">
                <p>
                  <b>Name:</b> {values.name}
                </p>
                <p>
                  <b>Email:</b> {values.email}
                </p>
                <p>
                  <b>Username:</b> {values.username}
                </p>
                <p>
                  <b>Password:</b> {"*".repeat(values.password.length)}
                </p>
              </div>

              <div className="actions">
                <button className="btn secondary" onClick={() => dispatch({ type: "PREVIOUS_STEP" })}>
                  Previous
                </button>
                <button className="btn" onClick={() => dispatch({ type: "SUBMIT_FORM" })}>
                  Submit
                </button>
              </div>

              <button className="btn danger" onClick={() => dispatch({ type: "RESET_FORM" })}>
                Reset Form
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
