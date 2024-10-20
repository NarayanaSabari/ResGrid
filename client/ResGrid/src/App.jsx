import { useState, useEffect } from 'react';
import { Bell, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        setIsAboutVisible(rect.top <= window.innerHeight * 0.75);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Bell className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">ResGrid</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            <a href="#home" className="hover:text-green-200">Home</a>
            <a href="#about" className="hover:text-green-200">About</a>
            <a href="#services" className="hover:text-green-200">Services</a>
            <a href="#contact" className="hover:text-green-200">Contact</a>
          </nav>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-green-600 py-2">
            <a href="#home" className="block px-4 py-2 hover:bg-green-700">Home</a>
            <a href="#about" className="block px-4 py-2 hover:bg-green-700">About</a>
            <a href="#services" className="block px-4 py-2 hover:bg-green-700">Services</a>
            <a href="#contact" className="block px-4 py-2 hover:bg-green-700">Contact</a>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <section id="home" className="bg-green-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Protecting Communities, Preserving Lives</h2>
            <p className="text-xl mb-8">Stay informed, stay prepared, stay safe.</p>
            <a href="#contact" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300">
              Report Emergency
            </a>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <img src="https://github.com/user-attachments/assets/ae094e1f-b2d5-491b-ab32-af493412c37a" alt="Disaster Response Team" className="w-full h-96 rounded-lg shadow-lg object-cover" />
          </div>
        </section>

        <section id="about" className={`py-16 transition-opacity duration-1000 ${isAboutVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-8">
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-700">
                  ResGrid is committed to building safer, more resilient communities. 
                  We work tirelessly to prepare for, respond to, and mitigate the impact of natural and man-made disasters across the region.
                </p>
              </div>
              <div className="w-full md:w-1/2 px-4 mb-8">
                <h3 className="text-xl font-semibold mb-4">Our Approach</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Comprehensive disaster risk assessment</li>
                  <li>Advanced early warning systems</li>
                  <li>Community-based disaster preparedness programs</li>
                  <li>Rapid emergency response and relief operations</li>
                  <li>Sustainable post-disaster recovery and rehabilitation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-gray-200 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Early Warning</h3>
                <p className="text-gray-700">
                  Stay ahead of disasters with our advanced early warning system, providing timely alerts for various hazards.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Emergency Response</h3>
                <p className="text-gray-700">
                  Our trained teams are ready 24/7 to respond swiftly and effectively to any disaster situation across the region.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Training & Awareness</h3>
                <p className="text-gray-700">
                  Empower yourself and your community with our disaster preparedness training programs and awareness campaigns.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-gray-200 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-8">
                <h3 className="text-xl font-semibold mb-4">Emergency Contacts</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-green-700" />
                    <span>Emergency Hotline: 1070</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-green-700" />
                    <span>Police: 100</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-green-700" />
                    <span>Fire & Rescue: 101</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-green-700" />
                    <span>Ambulance: 108</span>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 px-4 mb-8">
                <h3 className="text-xl font-semibold mb-4">Office Information</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-green-700" />
                    <span>123 Disaster Response Ave, Mysore, India</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-green-700" />
                    <span>Email: info@resgrid.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-700 text-white py-6 text-center">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 ResGrid. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://www.facebook.com" className="hover:text-green-300">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://www.twitter.com" className="hover:text-green-300">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com" className="hover:text-green-300">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
