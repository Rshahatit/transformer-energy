import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useProjects } from '../context/ProjectContext';
import { Sun, Wind, Waves, Flame, Mountain, Loader2 } from 'lucide-react';
import Papa from 'papaparse';

// Replace with your Mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoicnNoYWhhdGl0IiwiYSI6ImNtNjJwcWZwejExNnUyam9pMmsxNGJ3czMifQ.5zdvUnV-Hw-SNp9Xz01ZMQ';

interface CSVProject {
  "Project Name": string;
  "Project Location": string;
  latitude: string;
  longitude: string;
  "Total Score": string;
  "Environmental Indicators": string;
  "Social Indicators": string;
  "Governance Indicators": string;
}

const ProjectMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { projects, initializeProjects } = useProjects();
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await fetch('/geocode_esg.csv');
      const csvText = await response.text();
      
      // Use Papaparse instead of manual splitting
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true, // Automatically convert numbers
        complete: (results) => {
          const parsedProjects = results.data
            .map(row => ({
              id: crypto.randomUUID(),
              name: row['Project Name'],
              type: getProjectType(row['Project Name'].toLowerCase()),
              location: row['Project Location'],
              latitude: row.latitude,
              longitude: row.longitude,
              esgScore: row['Total Score'],
              environmentalScore: row['Environmental Indicators'],
              socialScore: row['Social Indicators'],
              governanceScore: row['Governance Indicators']
            }))
            .filter(project => !isNaN(project.latitude) && !isNaN(project.longitude));
          
          initializeProjects(parsedProjects);
          setLoading(false);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          setLoading(false);
        }
      });
    } catch (error) {
      console.error('Error loading projects:', error);
      setLoading(false);
    }
  };

  fetchProjects();
}, []); // Empty dependency array to run only once on mount

  const getProjectType = (name: string): string => {
    if (name.includes('solar')) return 'solar';
    if (name.includes('wind')) return 'wind';
    if (name.includes('hydro')) return 'hydro';
    if (name.includes('biomass') || name.includes('biogass') || name.includes('bioenergy')) return 'biomass';
    if (name.includes('geothermal')) return 'geothermal';
    return 'solar'; // Default to solar if type can't be determined
  };

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'solar':
        return <Sun className="h-5 w-5 text-amber-500" />;
      case 'wind':
        return <Wind className="h-5 w-5 text-blue-500" />;
      case 'hydro':
        return <Waves className="h-5 w-5 text-cyan-500" />;
      case 'biomass':
        return <Flame className="h-5 w-5 text-green-500" />;
      case 'geothermal':
        return <Mountain className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-98.5795, 39.8283], // Center of US
      zoom: 3,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    return () => {
      map.current?.remove();
    };
  }, [loading]);

useEffect(() => {
  if (!map.current || !projects.length) return;

  // Remove existing markers
  const markers = document.getElementsByClassName('marker');
  while (markers[0]) {
    markers[0].remove();
  }

  projects.forEach((project) => {
    const el = document.createElement('div');
    // Add Tailwind classes for the marker container
    el.className = 'cursor-pointer block';

    const markerContent = document.createElement('div');
    // Add Tailwind classes for the marker content
    markerContent.className = 'p-2 bg-white rounded-full shadow-lg transform transition-transform hover:scale-110 flex items-center justify-center';

    let svgHTML = '';
    switch (project.type) {
      case 'solar':
        svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
        break;
      case 'wind':
        svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>`;
        break;
      case 'hydro':
        svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`;
        break;
      case 'biomass':
        svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.94-2-5-1.786 3-3 2-4-2z"/></svg>`;
        break;
      case 'geothermal':
        svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>`;
        break;
    }

    markerContent.innerHTML = svgHTML;
    el.appendChild(markerContent);

    // Create popup
    const popup = new mapboxgl.Popup({ offset: [0, -10] }).setHTML(`
      <div class="p-4">
        <h3 class="font-semibold text-gray-900">${project.name}</h3>
        <p class="text-sm text-gray-600 mt-1">${project.location}</p>
        <div class="mt-3">
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-medium text-gray-700">ESG Score</span>
            <span class="text-sm font-medium text-gray-900">${project.esgScore.toFixed(1)}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="${getScoreColor(project.esgScore)} h-2 rounded-full" style="width: ${project.esgScore}%"></div>
          </div>
        </div>
      </div>
    `);

    new mapboxgl.Marker(el)
      .setLngLat([project.longitude, project.latitude])
      .setPopup(popup)
      .addTo(map.current!);
  });
}, [projects]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="p-4 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Renewable Energy Projects
          </h2>
          {loading && (
            <div className="flex items-center text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Loading projects...
            </div>
          )}
        </div>
        <div className="mt-2 flex items-center space-x-4">
          <div className="text-sm text-gray-600">Project Types:</div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Sun className="h-5 w-5 text-amber-500 mr-1" />
              <span className="text-sm text-gray-700">Solar</span>
            </div>
            <div className="flex items-center">
              <Wind className="h-5 w-5 text-blue-500 mr-1" />
              <span className="text-sm text-gray-700">Wind</span>
            </div>
            <div className="flex items-center">
              <Waves className="h-5 w-5 text-cyan-500 mr-1" />
              <span className="text-sm text-gray-700">Hydro</span>
            </div>
            <div className="flex items-center">
              <Flame className="h-5 w-5 text-green-500 mr-1" />
              <span className="text-sm text-gray-700">Biomass</span>
            </div>
            <div className="flex items-center">
              <Mountain className="h-5 w-5 text-red-500 mr-1" />
              <span className="text-sm text-gray-700">Geothermal</span>
            </div>
          </div>
        </div>
      </div>
      <div ref={mapContainer} className="flex-1" />
    </div>
  );
};

export default ProjectMap;