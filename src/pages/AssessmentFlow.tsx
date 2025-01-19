import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import {
  Wind,
  Sun,
  Waves,
  Flame,
  Mountain,
  ChevronRight,
  ChevronLeft,
  BarChart3,
} from 'lucide-react';

type ProjectType = 'solar' | 'wind' | 'biomass' | 'geothermal' | 'hydro';

interface FormData {
  projectName: string;
  projectType: ProjectType | '';
  location: string;
  latitude: string;
  longitude: string;
  environmentalAnswers: { [key: string]: boolean };
  socialAnswers: { [key: string]: boolean };
  governanceAnswers: { [key: string]: boolean };
}

const initialFormData: FormData = {
  projectName: '',
  projectType: '',
  location: '',
  latitude: '',
  longitude: '',
  environmentalAnswers: {},
  socialAnswers: {},
  governanceAnswers: {},
};

const projectTypes = [
  { id: 'solar', name: 'Solar', icon: Sun },
  { id: 'wind', name: 'Wind', icon: Wind },
  { id: 'hydro', name: 'Hydro', icon: Waves },
  { id: 'biomass', name: 'Biomass', icon: Flame },
  { id: 'geothermal', name: 'Geothermal', icon: Mountain },
];

const environmentalQuestions = [
  'Does the project have a materials recycling program?',
  'Does the project implement energy efficiency measures?',
  'Is there a biodiversity impact assessment conducted?',
  'Does the project have a system to monitor greenhouse gas emissions?',
  'Are there measures for sustainable land use and conservation?',
];

const socialQuestions = [
  'Does the project follow wage standards that meet Davis-Bacon Act guidelines?',
  'Does the project have an apprenticeship program?',
  'Are there programs for community engagement?',
  'Is there a diversity and inclusion policy?',
  'Are there guidelines for fair labor practices?',
];

const governanceQuestions = [
  'Are ESG principles formalized in project documentation?',
  'Is there a formal human rights policy?',
  'Are there third-party ESG audits?',
  'Is there an anti-bribery policy?',
  'Are there clear whistleblowing procedures?',
];

const AssessmentFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const navigate = useNavigate();
  const { addProject } = useProjects();

  const calculateScore = (answers: { [key: string]: boolean }) => {
    const trueCount = Object.values(answers).filter(Boolean).length;
    return (trueCount / Object.keys(answers).length) * 100;
  };

  const handleSubmit = () => {
    const environmentalScore = calculateScore(formData.environmentalAnswers);
    const socialScore = calculateScore(formData.socialAnswers);
    const governanceScore = calculateScore(formData.governanceAnswers);
    const esgScore = (environmentalScore + socialScore + governanceScore) / 3;

    addProject({
      id: crypto.randomUUID(),
      name: formData.projectName,
      type: formData.projectType as ProjectType,
      location: formData.location,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      esgScore,
      environmentalScore,
      socialScore,
      governanceScore,
    });

    navigate('/map');
  };

  const renderQuestions = (
    questions: string[],
    category: 'environmentalAnswers' | 'socialAnswers' | 'governanceAnswers'
  ) => (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div key={index} className="flex items-start space-x-3">
          <input
            type="checkbox"
            id={`${category}-${index}`}
            className="mt-1 h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
            checked={formData[category][index] || false}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [category]: {
                  ...prev[category],
                  [index]: e.target.checked,
                },
              }))
            }
          />
          <label
            htmlFor={`${category}-${index}`}
            className="text-sm text-gray-700"
          >
            {question}
          </label>
        </div>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="projectName"
                className="block text-sm font-medium text-gray-700"
              >
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                value={formData.projectName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    projectName: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {projectTypes.map(({ id, name, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    className={`${
                      formData.projectType === id
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                        : 'bg-white border-gray-300 text-gray-700'
                    } border rounded-lg p-4 flex flex-col items-center justify-center hover:bg-emerald-50 transition-colors`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        projectType: id as ProjectType,
                      }))
                    }
                  >
                    <Icon className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">{name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="latitude"
                  className="block text-sm font-medium text-gray-700"
                >
                  Latitude
                </label>
                <input
                  type="text"
                  id="latitude"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  value={formData.latitude}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      latitude: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="longitude"
                  className="block text-sm font-medium text-gray-700"
                >
                  Longitude
                </label>
                <input
                  type="text"
                  id="longitude"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  value={formData.longitude}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      longitude: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Environmental Criteria
            </h3>
            {renderQuestions(environmentalQuestions, 'environmentalAnswers')}
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Social Criteria
            </h3>
            {renderQuestions(socialQuestions, 'socialAnswers')}
          </div>
        );
      case 4:
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Governance Criteria
            </h3>
            {renderQuestions(governanceQuestions, 'governanceAnswers')}
          </div>
        );
      case 5:
        const environmentalScore = calculateScore(formData.environmentalAnswers);
        const socialScore = calculateScore(formData.socialAnswers);
        const governanceScore = calculateScore(formData.governanceAnswers);
        const totalScore =
          (environmentalScore + socialScore + governanceScore) / 3;

        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Results Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-base font-medium text-gray-900 mb-4">
                  ESG Scores
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">Environmental</span>
                      <span className="text-sm text-gray-900">
                        {environmentalScore.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 rounded-full h-2"
                        style={{ width: `${environmentalScore}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">Social</span>
                      <span className="text-sm text-gray-900">
                        {socialScore.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 rounded-full h-2"
                        style={{ width: `${socialScore}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">Governance</span>
                      <span className="text-sm text-gray-900">
                        {governanceScore.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 rounded-full h-2"
                        style={{ width: `${governanceScore}%` }}
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        Total ESG Score
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {totalScore.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-emerald-600 rounded-full h-3"
                        style={{ width: `${totalScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-base font-medium text-gray-900 mb-4">
                  Project Details
                </h4>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm text-gray-500">Project Name</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {formData.projectName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Project Type</dt>
                    <dd className="text-sm font-medium text-gray-900 capitalize">
                      {formData.projectType}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Location</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {formData.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Coordinates</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {formData.latitude}, {formData.longitude}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            ESG Assessment
            <span className="ml-2 text-sm font-medium text-gray-500">
              Step {step} of 5
            </span>
          </h2>
          <BarChart3 className="h-6 w-6 text-emerald-600" />
        </div>
        <div className="mt-4 relative">
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        {renderStep()}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep((prev) => prev - 1)}
          disabled={step === 1}
          className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
            step === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>
        {step < 5 ? (
          <button
            type="button"
            onClick={() => setStep((prev) => prev + 1)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
          >
            View on Map
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AssessmentFlow;