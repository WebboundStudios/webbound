'use client';

import Lottie from 'lottie-react';
import contactFormAnimation from '../../../public/contact-form.json';

export default function InquirySuccessAnimation() {
  return <Lottie animationData={contactFormAnimation} loop={false} className="size-full" />;
}
