// src/components/OnboardingOverlay.jsx
import React, { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';

const WelcomeDialog = ({ onSkip, onStart }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome to Trip Management!
        </h2>
        <button 
          onClick={onSkip}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Let's take a quick tour to help you get started with managing your trips.
        </p>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            View and edit trip details
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Upload and manage trip photos
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Update trip information
          </li>
        </ul>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={onSkip}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Skip Tour
        </button>
        <button
          onClick={onStart}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Start Tour
        </button>
      </div>
    </div>
  </div>
);

const Tooltip = ({ step, onPrevious, onNext, isLastStep }) => {
  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2'
  };

  useEffect(() => {
    // Scroll target element into view
    const targetElement = document.querySelector(step.target);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [step]);

  return (
    <div 
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
    >
      <div className="relative w-full h-full">
        <div
          className="absolute pointer-events-auto bg-white"
          style={{
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
            zIndex: 1
          }}
        >
          <div className={`absolute ${positionClasses[step.position]} z-10`}>
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-xs pointer-events-auto">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={onPrevious}
                  className={`text-sm text-gray-600 hover:text-gray-900 ${step.step === 0 ? 'invisible' : ''}`}
                >
                  Previous
                </button>
                <button
                  onClick={onNext}
                  className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  {isLastStep ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OnboardingOverlay = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);

  const steps = [
    {
      step: 0,
      target: '[data-tour="view-details"]',
      title: 'View Trip Details',
      description: 'Click this button to see full trip information and make changes.',
      position: 'left'
    },
    {
      step: 1,
      target: '[data-tour="media-tab"]',
      title: 'Media Management',
      description: 'Switch to this tab to manage trip photos and media content.',
      position: 'bottom'
    },
    {
      step: 2,
      target: '[data-tour="upload-image"]',
      title: 'Upload Images',
      description: 'Drop your images here or click to upload trip photos.',
      position: 'right'
    },
    {
      step: 3,
      target: '[data-tour="save-changes"]',
      title: 'Save Changes',
      description: 'Don\'t forget to save your updates before closing.',
      position: 'top'
    }
  ];

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem('tripOnboardingComplete');
    if (hasSeenOnboarding) {
      onComplete();
    }
  }, [onComplete]);

  const completeOnboarding = () => {
    localStorage.setItem('tripOnboardingComplete', 'true');
    onComplete();
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrevious = () => {
    setStep(prev => Math.max(0, prev - 1));
  };

  if (showWelcome) {
    return (
      <WelcomeDialog
        onSkip={completeOnboarding}
        onStart={() => setShowWelcome(false)}
      />
    );
  }

  return (
    <Tooltip
      step={steps[step]}
      onPrevious={handlePrevious}
      onNext={handleNext}
      isLastStep={step === steps.length - 1}
    />
  );
};

export default OnboardingOverlay;