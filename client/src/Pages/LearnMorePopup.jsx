// LearnMorePopup.jsx
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { animated, useSpring, config } from 'react-spring';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Lottie from 'react-lottie';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import Lottie animations
import digitalSafetyAnimation from "../animations/digitalSafety.json";
import emotionalIntelligenceAnimation from "../animations/emotionalIntelligence.json";
import personalFinanceAnimation from "../animations/personalFinance.json";
import entrepreneurshipAnimation from "../animations/entrepreneurship.json";

const LearnMorePopup = ({ program, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  // Animation based on program theme
  const animation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    config: config.gentle,
  });

  useEffect(() => {
    // Trigger confetti effect when popup opens
    if (showConfetti) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#4ade80', '#fbbf24', '#60a5fa'],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#4ade80', '#fbbf24', '#60a5fa'],
        });
      }, 250);

      return () => {
        clearInterval(interval);
      };
    }
  }, [showConfetti]);

  // Animation settings for Lottie
  const getLottieOptions = (animationData) => {
    return {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
  };

  // Get animation data based on program title
  const getAnimationData = (title) => {
    switch (title) {
      case "Digital Safety & Fraud Prevention":
        return digitalSafetyAnimation;
      case "Emotional Intelligence":
        return emotionalIntelligenceAnimation;
      case "Personal Finance":
        return personalFinanceAnimation;
      case "Entrepreneurship":
        return entrepreneurshipAnimation;
      default:
        return digitalSafetyAnimation;
    }
  };

  // Embedded program details
  const programDetails = {
    "Digital Safety & Fraud Prevention": {
      itinerary: [
        { title: "Types of Cyber Threats", content: "Deep dive into phishing, malware, scams targeting youth" },
        { title: "Real-Life Examples", content: "Analysis of recent fraud cases specifically targeting kids and teens" },
        { title: "Identifying Suspicious Activities", content: "Interactive exercises to spot red flags in emails, messages, and websites" },
        { title: "Secure Passwords & 2FA", content: "Workshop on creating strong passwords and setting up two-factor authentication" },
        { title: "Safe Browsing Habits", content: "Hands-on training with privacy settings, ad blockers, and VPNs" },
        { title: "Parental Involvement", content: "Tools and strategies for monitoring online activity and educating parents" },
        { title: "Family Digital Safety Plan", content: "Collaborative session to create personalized family safety protocols" }
      ],
      outcomes: {
        title: "Digital Safety",
        tag: "Top Result",
        tagColor: "bg-green-100 text-green-800",
        borderColor: "border-green-600",
        metrics: [
          { name: "Fraud Detection Skills", value: "94% Improvement", width: "94%" },
          { name: "Online Safety Practices", value: "89%", width: "89%" },
          { name: "Parental Awareness Increase", value: "78%", width: "78%" }
        ],
        achievement: "97% of students successfully identified and avoided simulated phishing attempts after our program."
      }
    },
    "Emotional Intelligence": {
      itinerary: [
        { title: "Understanding Emotions", content: "Tools to identify and effectively manage emotions in various situations" },
        { title: "Mindfulness Techniques", content: "Practical exercises for staying calm and focused under pressure" },
        { title: "Empathy Building", content: "Role-playing activities to understand perspectives beyond your own" },
        { title: "Active Listening", content: "Structured conversation practices that improve communication skills" },
        { title: "Conflict Resolution", content: "Step-by-step strategies for peacefully resolving disagreements" },
        { title: "Relationship Building", content: "Techniques for creating and maintaining strong connections with others" },
        { title: "Practical Exercises", content: "Hands-on activities that reinforce emotional intelligence concepts" }
      ],
      outcomes: {
        title: "Emotional Intelligence",
        tag: "Parent Favorite",
        tagColor: "bg-yellow-100 text-yellow-800",
        borderColor: "border-yellow-600",
        metrics: [
          { name: "Conflict Resolution", value: "70% Improvement", width: "70%" },
          { name: "Emotional Control", value: "85%", width: "85%" },
          { name: "Behavior Change", value: "82%", width: "82%" }
        ],
        achievement: "73% reduction in disciplinary incidents reported in schools and home after implementing our emotional intelligence curriculum."
      }
    },
    "Personal Finance": {
      itinerary: [
        { title: "Money Basics", content: "Understanding currency, banking systems, and financial terminology" },
        { title: "Budgeting 101", content: "Creating and maintaining effective personal budgets" },
        { title: "Smart Saving Strategies", content: "Techniques for short-term and long-term saving goals" },
        { title: "Responsible Spending", content: "Distinguishing needs vs. wants and making informed purchases" },
        { title: "Introduction to Investing", content: "Age-appropriate overview of how investments work" },
        { title: "Financial Goal Setting", content: "Workshops on creating achievable financial milestones" },
        { title: "Digital Financial Tools", content: "Hands-on experience with safe banking and budgeting apps" }
      ],
      outcomes: {
        title: "Personal Finance",
        tag: "Life-Changing",
        tagColor: "bg-green-100 text-green-800",
        borderColor: "border-green-600",
        metrics: [
          { name: "Budgeting Skills", value: "80% Adoption", width: "80%" },
          { name: "Saving Habit Formation", value: "88%", width: "88%" },
          { name: "Financial awareness Score", value: "79%", width: "79%" }
        ],
        achievement: "Students started average savings of 60% of there monthly pocket money after the program, with 64% maintaining this habit for over a months."
      }
    },
    "Entrepreneurship": {
      itinerary: [
        { title: "Entrepreneurial Mindset", content: "Developing problem-solving and opportunity-spotting skills" },
        { title: "Idea Generation", content: "Creative workshops to identify needs and innovative solutions" },
        { title: "Business Planning Basics", content: "Step-by-step guide to creating a simple business plan" },
        { title: "Marketing Fundamentals", content: "Understanding your audience and communicating value" },
        { title: "Financial Literacy", content: "Pricing strategies, profit calculations, and budget management" },
        { title: "Presentation Skills", content: "Training on how to pitch ideas effectively" },
        { title: "Mini Startup Challenge", content: "Hands-on experience launching a small entrepreneurial project" }
      ],
      outcomes: {
        title: "Entrepreneurship",
        tag: "Most Popular",
        tagColor: "bg-yellow-100 text-yellow-800",
        borderColor: "border-yellow-600",
        metrics: [
          { name: "Business Plan Creation", value: "90% Adoption", width: "90%" },
          { name: "Startup conversation", value: "83%", width: "83%" },
          { name: "Goal Skill Acquisition", value: "65%", width: "65%" }
        ],
        achievement: "40% of students were serious about there idea and had converstation, idea sharing with there teacher and family members"
      }
    }
  };

  const details = programDetails[program.title] || {};
  const outcomeDetails = details.outcomes || {};

  // Trigger confetti effect when component mounts
  useEffect(() => {
    setShowConfetti(true);
    
    // Clean up confetti after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <animated.div 
        style={animation} 
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-0 max-w-5xl w-full mx-4 overflow-hidden max-h-[90vh] border border-green-500"
      >
        {/* Header with close button and animation */}
        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-4xl font-bold text-white mb-4">{program.title}</h3>
              <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
                <FaTimes className="text-2xl" />
              </button>
            </div>
            <p className="text-white text-xl opacity-90 max-w-2xl">{program.content}</p>
          </motion.div>
          
          <div className="absolute right-8 bottom-0 w-48 h-48 opacity-90">
            <Lottie 
              options={getLottieOptions(getAnimationData(program.title))}
              height={200}
              width={200}
            />
          </div>
          
          <div className="absolute top-0 right-0 w-full h-full opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFFFFF" d="M40.6,-68.5C54.1,-62.5,67.5,-54.4,76.7,-42.3C85.9,-30.3,90.8,-15.1,88.9,-1.1C87,12.9,78.2,25.9,69.8,38.2C61.3,50.6,53.1,62.4,42,70.7C30.9,79,15.4,83.7,0.8,82.5C-13.8,81.2,-27.6,74.1,-41.1,66.7C-54.6,59.3,-67.8,51.7,-75.7,40.1C-83.6,28.5,-86.1,14.2,-83.4,1.6C-80.7,-11.1,-72.7,-22.2,-65.4,-34.5C-58.1,-46.8,-51.5,-60.2,-41,-68.1C-30.5,-75.9,-15.3,-78.2,-0.4,-77.4C14.4,-76.7,28.9,-73,40.6,-68.5Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
        
        <div className="overflow-y-auto p-8" style={{ maxHeight: "calc(90vh - 200px)" }}>
          {/* Program Itinerary with Animations */}
          {details.itinerary && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <h4 className="text-2xl font-bold text-emerald-500 dark:text-emerald-400 mb-6 flex items-center">
                <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 w-10 h-10 flex items-center justify-center rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </span>
                Program Itinerary & Highlights
              </h4>
              
              <div className="space-y-4">
                {details.itinerary.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <h5 className="font-bold text-green-600 dark:text-green-400 text-lg mb-1">{item.title}</h5>
                    <p className="text-gray-700 dark:text-gray-300">{item.content}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Measurable Outcomes */}
          {outcomeDetails.metrics && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8"
            >
              <h4 className="text-2xl font-bold text-yellow-400 mb-6">Measurable Outcomes</h4>
              
              <div className="bg-green-900 p-6 rounded-xl shadow-lg border-t-4 border-green-600">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-yellow-400">{outcomeDetails.title}</h3>
                  <div className={`${outcomeDetails.tagColor} font-bold py-1 px-3 rounded-full text-sm`}>
                    {outcomeDetails.tag}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {outcomeDetails.metrics.map((metric, i) => (
                    <motion.div 
                      key={i}
                      initial={{ width: "0%" }}
                      animate={{ width: metric.width }}
                      transition={{ delay: 0.7 + (i * 0.2), duration: 1 }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-300">{metric.name}</span>
                        <span className="text-yellow-400 font-bold">{metric.value}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: metric.width }}></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <p className="mt-6 text-gray-300">
                  <span className="font-bold text-yellow-400">Key Achievement:</span> {outcomeDetails.achievement}
                </p>
              </div>
            </motion.div>
          )}
          
          {/* Testimonial Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <h4 className="text-2xl font-bold text-emerald-500 dark:text-emerald-400 mb-6">What Parents & Students Say</h4>
            
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              className="testimonial-swiper"
            >
              <SwiperSlide>
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-1 rounded-xl">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                      "This program completely transformed how my daughter approaches online safety. She's now teaching ME about digital security!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">JM</div>
                      <div className="ml-3">
                        <p className="font-bold text-gray-900 dark:text-white">Jessica Miller</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Parent of 14-year-old</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              
              <SwiperSlide>
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-1 rounded-xl">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                      "I never thought learning about finances could be fun! Now I'm saving up for my first investment and tracking my spending."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">TJ</div>
                      <div className="ml-3">
                        <p className="font-bold text-gray-900 dark:text-white">Tyler Johnson</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">16-year-old student</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </motion.div>
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-center"
          >
            <button
              onClick={() => {
                setShowConfetti(true);
                // Additional action like sign up
              }}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 px-10 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition duration-300 mr-4"
            >
              Sign Up Now
            </button>
            
            <button
              onClick={onClose}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-4 px-10 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
            >
              Close
            </button>
          </motion.div>
        </div>
      </animated.div>
    </div>
  );
};

export default LearnMorePopup;