import React, { useState } from 'react';
import { Building2, Ban as Bank, Factory, Heart, Briefcase, Search, Users, BadgeCheck, BarChart3 } from 'lucide-react';

type ProfileCategory =
  | 'all'
  | 'developer'
  | 'financial'
  | 'epc'
  | 'ngo'
  | 'consultant';

interface Profile {
  id: string;
  name: string;
  category: ProfileCategory;
  image: string;
  focus: string[];
  esgScore: number;
  description: string;
  location: string;
  verified: boolean;
}

const profiles: Profile[] = [
  {
    id: '1',
    name: 'SunPower Renewables',
    category: 'developer',
    image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&auto=format&fit=crop&q=60',
    focus: ['Solar', 'Wind'],
    esgScore: 92,
    description: 'Leading developer of utility-scale solar and wind projects with a strong commitment to community engagement.',
    location: 'California, USA',
    verified: true,
  },
  {
    id: '2',
    name: 'Green Investment Partners',
    category: 'financial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60',
    focus: ['Renewable Energy', 'Sustainable Finance'],
    esgScore: 88,
    description: 'Sustainable investment firm specializing in renewable energy project financing and ESG-focused investments.',
    location: 'New York, USA',
    verified: true,
  },
  {
    id: '3',
    name: 'EcoBuilders Construction',
    category: 'epc',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&auto=format&fit=crop&q=60',
    focus: ['Solar Installation', 'Energy Storage'],
    esgScore: 85,
    description: 'Leading EPC contractor specializing in renewable energy construction with a focus on sustainable practices.',
    location: 'Texas, USA',
    verified: true,
  },
  {
    id: '4',
    name: 'Clean Energy Alliance',
    category: 'ngo',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60',
    focus: ['Advocacy', 'Community Engagement'],
    esgScore: 95,
    description: 'Non-profit organization dedicated to advancing renewable energy adoption and environmental justice.',
    location: 'Washington DC, USA',
    verified: true,
  },
  {
    id: '5',
    name: 'Sustainable Solutions Group',
    category: 'consultant',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=60',
    focus: ['ESG Consulting', 'Project Development'],
    esgScore: 90,
    description: 'Expert consultancy providing ESG strategy and renewable energy project development services.',
    location: 'Colorado, USA',
    verified: true,
  },
];

const categoryIcons = {
  developer: <Building2 className="h-5 w-5" />,
  financial: <Bank className="h-5 w-5" />,
  epc: <Factory className="h-5 w-5" />,
  ngo: <Heart className="h-5 w-5" />,
  consultant: <Briefcase className="h-5 w-5" />,
};

const categoryNames = {
  all: 'All Profiles',
  developer: 'Renewable Energy Developers',
  financial: 'Financial Institutions',
  epc: 'EPC Firms',
  ngo: 'NGOs',
  consultant: 'Industry Consultants',
};

const CommunityNetwork = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProfileCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProfiles = profiles.filter((profile) => {
    const matchesCategory = selectedCategory === 'all' || profile.category === selectedCategory;
    const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-orange-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Community Network</h2>
          <p className="mt-1 text-sm text-gray-500">
            Connect with key stakeholders in the renewable energy ecosystem
          </p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search profiles..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {Object.entries(categoryNames).map(([key, name]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key as ProfileCategory)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              selectedCategory === key
                ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="h-48 overflow-hidden rounded-t-lg">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    {profile.name}
                    {profile.verified && (
                      <BadgeCheck className="h-5 w-5 text-emerald-500 ml-1" />
                    )}
                  </h3>
                  <p className="text-sm text-gray-500">{profile.location}</p>
                </div>
                <div className="flex items-center">
                  {categoryIcons[profile.category]}
                  <span
                    className={`ml-2 font-semibold ${getScoreColor(
                      profile.esgScore
                    )}`}
                  >
                    {profile.esgScore}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">{profile.description}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.focus.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                    >
                      <Users className="h-4 w-4 text-gray-500" />
                    </div>
                  ))}
                </div>
                <button className="inline-flex items-center px-3 py-1.5 border border-emerald-600 rounded-lg text-sm font-medium text-emerald-600 hover:bg-emerald-50">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityNetwork;