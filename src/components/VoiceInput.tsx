import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface VoiceInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const VoiceInput = ({ value, onChange, placeholder, className }: VoiceInputProps) => {
  const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();
  
  // When transcript changes, append it to the current value
  useEffect(() => {
    if (transcript) {
      const newValue = value ? `${value} ${transcript}` : transcript;
      onChange(newValue);
      setTranscript(''); // Clear after appending
    }
  }, [transcript, onChange, value, setTranscript]);

  return (
    <div className={`relative flex items-center ${className || ''}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
      />
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        className={`absolute right-2 p-1 rounded-full ${
          isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-slate-400 hover:text-slate-600'
        }`}
        title={isListening ? "Đang nghe..." : "Nhập bằng giọng nói"}
      >
        {isListening ? <Mic size={18} /> : <MicOff size={18} />}
      </button>
    </div>
  );
};

export const VoiceTextarea = ({ value, onChange, placeholder, className, rows = 3 }: VoiceInputProps & { rows?: number }) => {
  const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();
  
  useEffect(() => {
    if (transcript) {
      const newValue = value ? `${value} ${transcript}` : transcript;
      onChange(newValue);
      setTranscript('');
    }
  }, [transcript, onChange, value, setTranscript]);

  return (
    <div className={`relative ${className || ''}`}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
      />
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        className={`absolute top-2 right-2 p-1 rounded-full ${
          isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-slate-400 hover:text-slate-600'
        }`}
        title={isListening ? "Đang nghe..." : "Nhập bằng giọng nói"}
      >
        {isListening ? <Mic size={18} /> : <MicOff size={18} />}
      </button>
    </div>
  );
};
