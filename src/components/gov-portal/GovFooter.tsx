import React from 'react';
import { EmblemIcon } from './EmblemIcon';
import { ShieldCheck, ExternalLink, HelpCircle, Phone, Mail, Lock } from 'lucide-react';

export const GovFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#062a63] text-white border-t-4 border-[#ff9933] mt-auto">
      {/* Top Banner Row */}
      <div className="bg-[#041c44] py-4 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center space-x-3">
            <EmblemIcon size={32} />
            <div>
              <div className="font-extrabold text-white text-sm">National Scheme Portal</div>
              <div className="text-[11px] text-slate-400">Government of India • Ministry of Electronics & IT</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#138808]" />
              <span>STQC 256-Bit SSL Encrypted</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-[#ff9933]" />
              <span>Helpline: 1800-11-0001 (Toll Free)</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-[#ff9933]" />
              <span>helpdesk-nsp@gov.in</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-slate-300 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h2 className="font-bold text-white text-sm mb-2 border-b border-[#ff9933] pb-1 inline-block">
            About Portal
          </h2>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            National Scheme Portal is a one-stop digital platform designed to provide Indian citizens with easy access to all Union & State government welfare schemes, direct benefit transfers, and scheme application tracking.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-white text-sm mb-2 border-b border-[#ff9933] pb-1 inline-block">
            Quick Links
          </h2>
          <ul className="space-y-1.5 text-[11px]">
            <li><a href="#schemes" className="hover:text-[#ff9933] transition-colors flex items-center space-x-1"><span>• Find Schemes by Category</span></a></li>
            <li><a href="#eligibility" className="hover:text-[#ff9933] transition-colors flex items-center space-x-1"><span>• Check Scheme Eligibility</span></a></li>
            <li><a href="#guidelines" className="hover:text-[#ff9933] transition-colors flex items-center space-x-1"><span>• Document Verification Standards</span></a></li>
            <li><a href="#faq" className="hover:text-[#ff9933] transition-colors flex items-center space-x-1"><span>• Citizen FAQs & Manuals</span></a></li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-white text-sm mb-2 border-b border-[#ff9933] pb-1 inline-block">
            Policies & Standards
          </h2>
          <ul className="space-y-1.5 text-[11px]">
            <li><a href="#privacy" className="hover:text-[#ff9933] transition-colors">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-[#ff9933] transition-colors">Terms & Conditions</a></li>
            <li><a href="#hyperlink" className="hover:text-[#ff9933] transition-colors">Hyperlinking Policy</a></li>
            <li><a href="#copyright" className="hover:text-[#ff9933] transition-colors">Copyright & Disclaimer</a></li>
            <li><a href="#accessibility" className="hover:text-[#ff9933] transition-colors">Accessibility Statement</a></li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-white text-sm mb-2 border-b border-[#ff9933] pb-1 inline-block">
            National Portals
          </h2>
          <ul className="space-y-1.5 text-[11px]">
            <li>
              <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff9933] transition-colors inline-flex items-center space-x-1">
                <span>india.gov.in - National Portal of India</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <a href="https://mygov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff9933] transition-colors inline-flex items-center space-x-1">
                <span>MyGov.in - Citizen Engagement</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <a href="https://uidai.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff9933] transition-colors inline-flex items-center space-x-1">
                <span>UIDAI - Official Aadhaar Portal</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <a href="https://dbtbharat.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff9933] transition-colors inline-flex items-center space-x-1">
                <span>DBT Bharat Portal</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="bg-[#031535] py-3 text-center text-slate-400 text-[11px] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} National Scheme Portal. All Rights Reserved. Government of India.
          </div>
          <div className="text-slate-500">
            Last Updated: 25 September 2026 • Designed & Developed for Universal Welfare Accessibility
          </div>
        </div>
      </div>
    </footer>
  );
};
