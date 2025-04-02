import { useState} from 'react';
import './Stepper.css';
import Step from './Step';
const StepperContainer = () => {
  const steps = [
    { title: "Step 1", message: "This is the description" },
    { title: "Step 2", message: "This is the description" },
    { title: "Step 3", message: "This is the description" }
  ];

  const [currentStep, setCurrentStep] = useState(0);


  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };



  const handleStepClick = (index) => {
    if (index <= currentStep) setCurrentStep(index);
  };

  return (
    
      <div className="stepper-wrapper">
        <div className="stepper-container">
          <div className="stepper">
            {steps.map((step, index) => (
              <div key={index} className="step-item">
                <div
                  className={`step-circle ${
                    index < currentStep ? 'completed' : 
                    index === currentStep ? 'current' : ''
                  }`}
                  onClick={() => handleStepClick(index)}
                  role="button"
                  tabIndex={0}
                >
                  {index < currentStep ? (
                    <span className="checkmark">✓</span>
                  ) : (
                    <span>{step.index}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`step-line ${
                    index < currentStep ? 'completed' : ''
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="step-content-container">
            <div className="step-content">
              <Step title={steps[currentStep].title} message={steps[currentStep].message}/>
             
              
            </div>
          </div>

          <div className="stepper-buttons">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="stepper-button"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="stepper-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default StepperContainer;
