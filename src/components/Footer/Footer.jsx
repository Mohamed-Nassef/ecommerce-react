import React from 'react';

export default function Footer() {
  return (
    <footer className=" bg-slate-100 mt-20 pt-10 pb-5">
      <div className="container mx-auto px-5">
        {/* Top section */}
        <div className="text-center md:text-left mb-8">
          <h2 className="text-xl font-semibold mb-2">Get the FreshCart app</h2>
          <p className="text-gray-600 mb-4">
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Email .."
              className="w-full md:w-10/12 px-4 py-2 rounded border border-gray-300"
            />
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
              Share App Link
            </button>
          </div>
        </div>

        <hr className="my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className="font-normal">Payment Partners</span>
            <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="Amazon Pay" className="h-6 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="American Express" className="h-6 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="MasterCard" className="h-6 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="PayPal" className="h-6 w-auto" />
          </div>

          <div className="flex items-center gap-4">
            <span className="font-medium">Get deliveries with FreshCart</span>
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
}
