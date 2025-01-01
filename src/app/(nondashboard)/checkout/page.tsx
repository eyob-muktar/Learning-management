'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';
import Loading from '../../../components/Loading';
import WizardStepper from '../../../components/WizardStepper';
import CheckoutDetailsPage from './details';
import { useCheckoutNavigation } from '../../../hooks/useCheckoutNavigation';
import PaymentPage from './payment';
import CompletionPage from './completion';

const CheckoutWizard = () => {
  const { isLoaded } = useUser();
  const { checkoutStep } = useCheckoutNavigation();
  console.log({ checkoutStep });
  if (!isLoaded) return <Loading />;
  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <CheckoutDetailsPage />;
      case 2:
        return <PaymentPage />;
      case 3:
        return <CompletionPage />;
      default:
        return <CheckoutDetailsPage />;
    }
  };

  return (
    <div className='checkout'>
      <WizardStepper currentStep={checkoutStep} />
      <div className='checkout__content'>{renderStep()}</div>
    </div>
  );
};

export default CheckoutWizard;
