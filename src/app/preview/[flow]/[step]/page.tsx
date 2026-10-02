import { notFound } from 'next/navigation';
import { LoginFlow, RegisterFlow } from '@/modules/auth';

export default function PreviewStepPage({ params }: { params: { flow: string; step: string } }) {
  const { flow, step } = params;

  if (flow === 'register' && (step === 'otp' || step === 'password')) {
    return <RegisterFlow preview={step} />;
  }
  if (flow === 'login' && (step === 'otp' || step === 'new-password')) {
    return <LoginFlow preview={step} />;
  }
  notFound();
}
