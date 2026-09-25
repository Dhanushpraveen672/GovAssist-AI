import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, Volume2, ShieldCheck, AlertCircle } from 'lucide-react';

interface CaptchaBoxProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  onRefreshCaptchaCode?: (code: string) => void;
  id?: string;
}

// Generate random 5-character alphanumeric string avoiding ambiguous chars (I, 1, O, 0, L)
export const generateCaptchaCode = (): string => {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const CaptchaBox: React.FC<CaptchaBoxProps> = ({
  value,
  onChange,
  error,
  onRefreshCaptchaCode,
  id = 'captcha-input',
}) => {
  const [captchaCode, setCaptchaCode] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawCaptchaCanvas = useCallback((code: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#f8fafc');
    bgGradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Noise background dots
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(${Math.floor(Math.random() * 150)}, ${Math.floor(
        Math.random() * 150
      )}, ${Math.floor(Math.random() * 200)}, ${0.15 + Math.random() * 0.25})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 2.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Distorted noise lines across canvas
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(
        Math.random() * 100
      )}, ${Math.floor(Math.random() * 180)}, ${0.4 + Math.random() * 0.3})`;
      ctx.lineWidth = 1.5 + Math.random();
      ctx.beginPath();
      ctx.moveTo(Math.random() * 20, Math.random() * height);
      ctx.bezierCurveTo(
        width * 0.3,
        Math.random() * height,
        width * 0.7,
        Math.random() * height,
        width - Math.random() * 20,
        Math.random() * height
      );
      ctx.stroke();
    }

    // Strikethrough line
    ctx.strokeStyle = '#0b3d91';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(10, height / 2 + (Math.random() * 8 - 4));
    ctx.lineTo(width - 10, height / 2 + (Math.random() * 8 - 4));
    ctx.stroke();

    // Draw each character with skew and rotation
    const charSpacing = width / (code.length + 1);
    const fonts = ['24px Segoe UI', '22px Arial', '25px Courier New', '23px Georgia'];

    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      ctx.save();

      const x = (i + 1) * charSpacing;
      const y = height / 2 + 7 + (Math.random() * 6 - 3);
      const angle = (Math.random() - 0.5) * 0.45; // -12 to +12 deg rotation

      ctx.translate(x, y);
      ctx.rotate(angle);

      ctx.font = `bold ${fonts[i % fonts.length]}`;
      ctx.fillStyle = i % 2 === 0 ? '#0b3d91' : '#062a63';

      // Text Shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.shadowBlur = 2;

      ctx.fillText(char, -8, 0);

      ctx.restore();
    }
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    const newCode = generateCaptchaCode();
    setCaptchaCode(newCode);
    if (onRefreshCaptchaCode) {
      onRefreshCaptchaCode(newCode);
    }
    drawCaptchaCanvas(newCode);
    setTimeout(() => setIsRefreshing(false), 300);
  }, [drawCaptchaCanvas, onRefreshCaptchaCode]);

  useEffect(() => {
    const code = generateCaptchaCode();
    setCaptchaCode(code);
    if (onRefreshCaptchaCode) {
      onRefreshCaptchaCode(code);
    }
    drawCaptchaCanvas(code);
  }, [drawCaptchaCanvas, onRefreshCaptchaCode]);

  const speakCaptcha = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = captchaCode.split('').join(' ');
      const utterance = new SpeechSynthesisUtterance(`Captcha is: ${textToSpeak}`);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
      >
        Security Code (Captcha) <span className="text-red-500">*</span>
      </label>

      {/* Captcha Display Box + Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Canvas Display Box with Strikethrough & Distortion */}
        <div className="relative inline-flex items-center justify-between bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg p-1.5 shadow-inner overflow-hidden select-none min-w-[170px] h-[52px]">
          <canvas
            ref={canvasRef}
            width={160}
            height={44}
            className="rounded cursor-pointer"
            title="Click to refresh captcha"
            onClick={handleRefresh}
          />

          {/* Strikethrough Visual Styling overlay fallback */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[85%] h-[2px] bg-[#ff9933]/70 transform -rotate-3" />
          </div>
        </div>

        {/* Action Icon Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={handleRefresh}
            title="Refresh Captcha Code"
            aria-label="Refresh Captcha Code"
            className="p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-[#0b3d91] dark:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-[#0b3d91] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0b3d91]"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={speakCaptcha}
            title="Audio Captcha (Listen)"
            aria-label="Audio Captcha (Listen)"
            className="p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0b3d91]"
          >
            <Volume2 className="w-4 h-4 text-[#ff9933]" />
          </button>
        </div>

        {/* Captcha Text Input */}
        <div className="flex-1 min-w-[140px]">
          <input
            type="text"
            id={id}
            name="captchaInput"
            value={value}
            maxLength={5}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type code"
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`w-full px-3.5 py-2.5 font-mono text-base font-bold tracking-widest bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
              error
                ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                : 'border-slate-300 dark:border-slate-600 focus:ring-[#0b3d91] focus:border-[#0b3d91]'
            }`}
          />
        </div>
      </div>

      {error ? (
        <p id={`${id}-error`} className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center space-x-1 pt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
          Case-sensitive 5-character security validation code.
        </p>
      )}
    </div>
  );
};
