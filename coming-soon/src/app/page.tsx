export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Campus Couch
        </h1>
        
        <div className="text-3xl font-semibold text-indigo-600 mb-6">
          Coming Soon
        </div>
        
        <div className="text-2xl font-medium text-gray-700 mb-8">
          Official Launch: April 25, 2024
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            What We Do
          </h2>
          
          <p className="text-gray-600 text-lg">
            Campus Couch is revolutionizing student living by providing stylish, affordable furniture 
            tailored specifically for students and young professionals. We make it easy to elevate 
            your space without breaking the bank.
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-indigo-600">✓</span>
              <span className="text-gray-700">Affordable Furniture Solutions</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-indigo-600">✓</span>
              <span className="text-gray-700">Student-Focused Design</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-indigo-600">✓</span>
              <span className="text-gray-700">Easy Delivery & Setup</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-gray-600 mb-4">
            Have questions? We'd love to hear from you!
          </p>
          <a 
            href="mailto:info@campuscouch.com" 
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Contact Us
          </a>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Campus Couch. All rights reserved.
        </div>
      </div>
    </div>
  );
} 