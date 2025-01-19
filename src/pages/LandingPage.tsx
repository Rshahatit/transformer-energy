import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  BarChart,
  Network,
  Brain,
  ArrowRight,
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'ESG Project Scoring',
      description:
        'Comprehensive evaluation of renewable energy projects using environmental, social, and governance criteria.',
      icon: <LineChart className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: 'AI-driven PR Strategy',
      description:
        'Leverage AI to develop effective communication strategies for your renewable energy projects.',
      icon: <Brain className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: 'Network Construction',
      description:
        'Connect with key stakeholders in the renewable energy ecosystem.',
      icon: <Network className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: 'Comparative Analysis',
      description:
        'Benchmark your projects against industry standards and peer projects.',
      icon: <BarChart className="h-6 w-6 text-emerald-600" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          ESG Scoring for
          <span className="text-emerald-600"> Renewable Energy</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          AI-Powered ESG Consulting & Network Building for Renewable Energy
          Projects
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <button
            onClick={() => navigate('/assessment')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
          >
            Start Your ESG Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-32">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-4 left-4 bg-emerald-50 rounded-lg p-3">
                {feature.icon}
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;