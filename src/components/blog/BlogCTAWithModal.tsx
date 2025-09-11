import { useState } from 'react';
import { ActionCTA } from './BlogContentStructure';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';

export const BlogCTAWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ActionCTA 
        question="Ready to transform your business with these strategies?"
        primaryAction={{ 
          text: "Get Started Today", 
          action: openModal
        }}
      />
      
      <LeadCaptureModal 
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};