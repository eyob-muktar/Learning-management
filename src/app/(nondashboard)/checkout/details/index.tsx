'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useCurrentCourse } from '../../../../hooks/useCurrentCourse';
import Loading from '../../../../components/Loading';
import CoursePreview from '../../../../components/CoursePreview';
import SignUpComponent from '../../../../components/SignUp';
import SignInComponent from '../../../../components/SignIn';

const CheckoutDetailsPage = () => {
  const { course: SelectedCourse, isLoading, isError } = useCurrentCourse();
  const searchParams = useSearchParams();
  const showSignUp = searchParams.get('showSignUp') === 'true';

  if (isLoading) return <Loading />;
  if (isError) return <div>Error</div>;
  if (!SelectedCourse || Array.isArray(SelectedCourse))
    return <div>Course not found</div>;
  return (
    <div className='checkout-details'>
      <div className='checkout-details__container'>
        <div className='checkout-details__preview'>
          <CoursePreview course={SelectedCourse} />
        </div>
        <div className='checkout-details__auth'>
          {showSignUp ? <SignUpComponent /> : <SignInComponent />}
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetailsPage;
