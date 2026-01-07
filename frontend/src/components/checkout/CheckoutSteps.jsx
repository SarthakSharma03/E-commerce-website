import React from 'react';
import { FaCheck } from 'react-icons/fa';

const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Checkout' },
    { number: 2, label: 'Payment' },
    { number: 3, label: 'Confirmation' },
  ];

  return (
    <div className="flex items-center justify-center mb-10 w-full max-w-3xl mx-auto">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <div key={step.number} className="flex items-center w-full last:w-auto">
            <div className="relative flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium border-2 transition-colors duration-300
                  ${isCompleted ? 'bg-green-500 border-green-500 text-white' : ''}
                  ${isActive ? 'bg-red-500 border-red-500 text-white' : ''}
                  ${!isActive && !isCompleted ? 'bg-white border-gray-300 text-gray-500' : ''}
                `}
              >
                {isCompleted ? <FaCheck size={14} /> : step.number}
              </div>
              <span
                className={`absolute top-12 text-xs font-medium uppercase whitespace-nowrap
                  ${isActive || isCompleted ? 'text-black' : 'text-gray-400'}
                `}
              >
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`flex-1 h-[2px] mx-4 mb-4 ${
                isCompleted ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutSteps;
