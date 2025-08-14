import React from 'react';
import { InlineWidget } from "react-calendly";
import { X, Calendar } from 'lucide-react';

interface CalendlyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Schedule a Demo</h2>
                        <p className="text-gray-600 mt-1">Book a call to see FlowMate in action</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        aria-label="Close modal"
                    >
                        <X className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                {/* Calendly Widget */}
                <div className="h-[600px] overflow-auto">
                    <InlineWidget
                        url="https://calendly.com/usorohdev/flowmate-demo"
                        styles={{
                            height: '600px'
                        }}
                    />
                </div>

                {/* Optional: Add a footer with additional info */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
                    <p className="text-sm text-gray-600">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Select a time that works best for you
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CalendlyModal;