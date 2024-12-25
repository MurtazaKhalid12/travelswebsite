
import React from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 mt-6">
      <div className="flex w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden">
        {/* Left Side - Green Panel */}
        <div className="bg-emerald-500 text-white p-8 w-1/3 space-y-6">
          <div>
            <h2 className="text-2xl font-light mb-2">Let's get in touch</h2>
            <p className="text-emerald-50 text-sm">
              We're open for any suggestion or just to have a chat
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center">
                <MapPin size={16} />
              </div>
              <div className="text-sm">
                <p>6th Floor, ARFA Tower </p>
                <p>Lahore – Kasur Rd, Nishtar Town, Lahore, Punjab</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center">
                <Phone size={16} />
              </div>
              <p className="text-sm">Phone: + 923443581288</p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center">
                <Mail size={16} />
              </div>
              <p className="text-sm">Email: murtazakhalid63@gmail.com</p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center">
                <Globe size={16} />
              </div>
              <p className="text-sm">Website: yoursite.com</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white p-8 w-2/3">
          <h2 className="text-2xl text-gray-800 mb-6">Get in touch</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-3 py-2 text-sm border-b border-gray-300 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 text-sm border-b border-gray-300 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                SUBJECT
              </label>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-3 py-2 text-sm border-b border-gray-300 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                MESSAGE
              </label>
              <textarea
                placeholder="Message"
                rows={3}
                className="w-full px-3 py-2 text-sm border-b border-gray-300 focus:border-emerald-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-emerald-500 text-white px-6 py-2 text-sm rounded-md hover:bg-emerald-600 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
