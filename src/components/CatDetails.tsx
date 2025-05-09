import React, { useState } from 'react';
import { IconCopy, IconExternalLink } from '@tabler/icons-react';
import Loading from './common/Loading';
import { useCatById } from '../hooks/useCatApi';
import CatImage from './CatImage';
import { ErrorMessage } from './common/ErrorMessage';
import { type Breed } from '../types';
import { BREED_DETAILS } from '../constants';

interface CatDetailsProps {
  catId: string;
}

const CatDetails: React.FC<CatDetailsProps> = ({ catId }) => {
  const { data: cat, isLoading, error } = useCatById(catId);
  const [copied, setCopied] = useState(false);
  const breed: Breed | undefined = cat?.breeds?.[0];

  if (isLoading) {
    return <Loading />;
  }

  if (error || !cat) {
    return <ErrorMessage message="Error loading cat details. Please try again." />;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <div className="h-96 md:h-full rounded-lg overflow-hidden">
          <CatImage cat={cat} className="h-full" showBreedName={false} />
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col gap-6 p-6 overflow-y-auto max-h-[50vh] md:max-h-[80vh]">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {breed ? breed.name : 'Cat Details'}
          </h2>

          <button
            onClick={() => {
              try {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              } catch {
                // do nothing or send to a third party service to log the error
              }
            }}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 relative cursor-pointer group"
          >
            <IconCopy size={16} className="mr-2 transition-transform group-hover:scale-110" />
            <span>Copy link to share</span>
            {copied && (
              <span className="absolute left-1/2 -top-8 -translate-x-1/2 bg-gray-700 text-white text-sm rounded-md px-3 py-1 z-10">
                Copied!
              </span>
            )}
          </button>
        </div>

        {breed && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">About the {breed.name}</h3>
              <p className="text-gray-700">{breed.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BREED_DETAILS.map((detail) => (
                <div key={detail.label} className="space-y-1">
                  <h4 className="text-sm font-semibold text-gray-500">{detail.label}</h4>
                  <p className="text-gray-700">{detail.getValue(breed)}</p>
                </div>
              ))}
            </div>

            {breed.wikipedia_url && (
              <a
                href={breed.wikipedia_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline group"
              >
                <span>Read more on Wikipedia</span>
                <IconExternalLink
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatDetails;
