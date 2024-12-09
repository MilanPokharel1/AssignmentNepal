import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  BookOpen, 
  ChevronRight,
  X 
} from 'lucide-react';

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [filteredFAQs, setFilteredFAQs] = useState([]);

  const faqs = [
    {
      category: 'Account',
      questions: [
        { 
          question: 'How do I reset my password?', 
          answer: 'Click "Forgot Password" on the login page and follow the email instructions.' 
        },
        { 
          question: 'Can I change my email address?', 
          answer: 'You cannot change your email address. If you lost your email contact Customer Service.' 
        }
      ]
    },
    {
      category: 'Billing',
      questions: [
        { 
          question: 'What payment methods do you accept?', 
          answer: 'We accept credit cards, FonePay dynamic QR, and Fonepay Static QR.' 
        },
        { 
          question: 'How can I update my payment method?', 
          answer: 'You dont have to change your payment method, Just select the payment options and proceed.' 
        }
      ]
    }
  ];

  useEffect(() => {
    const filtered = faqs.flatMap(category => 
      category.questions.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredFAQs(filtered);
  }, [searchQuery]);

  const contactOptions = [
    {
      icon: <MessageCircle className="text-blue-400" size={24} />,
      title: 'Live Chat',
      description: 'Instant support, 24/7',
      action: () => setActiveModal('chat')
    },
    {
      icon: <Mail className="text-green-400" size={24} />,
      title: 'Email Support',
      description: 'support@assignmentnepal.com',
      action: () => setActiveModal('email')
    },
    {
      icon: <Phone className="text-purple-400" size={24} />,
      title: 'Phone Support',
      description: '+977 9864646464',
      action: () => setActiveModal('phone')
    }
  ];

  const renderModal = () => {
    const modalContent = {
      'chat': (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Live Chat</h2>
          <p className="text-gray-600">Our support team is ready to help you!</p>
          <div className="mt-4">
            <input 
              type="text" 
              placeholder="Your message" 
              className="w-full p-3 border rounded-lg text-gray-700 bg-gray-50"
            />
            <button className="mt-4 w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition">
              Start Chat
            </button>
          </div>
        </div>
      ),
      'email': (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Email Support</h2>
          <form className="space-y-4">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full p-3 border rounded-lg text-gray-700 bg-gray-50" 
            />
            <textarea 
              placeholder="Describe your issue" 
              className="w-full p-3 border rounded-lg h-32 text-gray-700 bg-gray-50"
            ></textarea>
            <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition">
              Send Email
            </button>
          </form>
        </div>
      ),
      'phone': (
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Phone Support</h2>
          <p className="text-gray-600">Call us at: +1 (555) 123-4567</p>
          <p className="text-gray-600">Hours: Mon-Fri, 9am-5pm EST</p>
        </div>
      )
    };

    return activeModal ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-96 relative overflow-hidden">
          <button 
            onClick={() => setActiveModal(null)} 
            className="absolute top-4 right-4 hover:bg-gray-100 rounded-full p-2"
          >
            <X className="text-gray-500" />
          </button>
          {modalContent[activeModal]}
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="min-h-[90vh] min-w-[60vw] bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full h-full max-w-full bg-white shadow-2xl rounded-3xl overflow-hidden">
        
        <div className="p-6">
          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder="Search FAQs and support topics..." 
              className="w-full pl-12 pr-4 py-3 border rounded-full text-gray-700 bg-gray-50 shadow-sm focus:ring-2 focus:ring-indigo-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-4 text-gray-400" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Frequently Asked Questions</h2>
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-100 p-4 rounded-lg mb-3 hover:shadow-md transition"
                  >
                    <h3 className="font-bold mb-2 text-gray-800">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No FAQs found matching your search.</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold mb-4 flex items-center text-gray-700">
                  <BookOpen className="mr-2 text-blue-500" />
                  Support Channels
                </h3>
                {contactOptions.map((option, index) => (
                  <div 
                    key={index} 
                    onClick={option.action}
                    className="flex items-center bg-white p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-100 hover:shadow-md transition"
                  >
                    {option.icon}
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-800">{option.title}</h4>
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderModal()}
    </div>
  );
};

export default HelpSupport;