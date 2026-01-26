/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SuccessMessageProps {
  message: string;
  redirectTo?: string;
  redirectDelay?: number;
  type?: 'success' | 'error' | 'warning' | 'info';
}

export default function SuccessMessage({
  message,
  redirectTo,
  redirectDelay = 3000,
  type = 'success'
}: SuccessMessageProps) {
  const [show, setShow] = React.useState(true);
  const [fadeOut, setFadeOut] = React.useState(false);
  const [countdown, setCountdown] = React.useState(Math.floor(redirectDelay / 1000));
  const router = useRouter();
 const [visible, setVisible] = useState(true);
 
  const styles = {
    success: 'text-green-600 bg-green-50 border-green-200',
    error: 'text-red-600 bg-red-50 border-red-200',
    warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    info: 'text-grey-600 bg-blue-50 border-blue-200',
  };

  React.useEffect(() => {
    if (!message) return;

    setShow(true);
    setFadeOut(false);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // FADE EFEKAT - počinje 500ms prije nego što nestane obavješenje
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, redirectDelay - 700);

    const timer = setTimeout(() => {
      setShow(false);
      // Uklanja query parametre sa trenutnog URL-a
      const cleanPath = window.location.pathname;
      router.replace(cleanPath);
    }, redirectDelay);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(fadeTimer);
      clearTimeout(timer);
    };
  }, [message, redirectTo, redirectDelay, router]);

  if (!show || !message) return null;

  return (
    <div className={`border rounded-lg p-4 text-center mb-4 transition-opacity duration-500 ${styles[type]} ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {message}
      {/* {redirectTo && <p className="text-sm mt-2">Preusmjeravanje za {countdown} {countdown === 1 ? 'sekundu' : 'sekundi'}...</p>} */}
    </div>
  );
}
