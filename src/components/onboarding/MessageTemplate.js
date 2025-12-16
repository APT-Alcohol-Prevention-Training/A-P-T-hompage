import React from "react";
import Image from "next/image";

const MessageTemplate = ({
  title,
  learningPoints,
  sections = [],
  tip = null,
  className = "",
}) => {
  return (
    <section className={`max-w-2xl mx-auto p-8 ${className}`}>
      <div className="flex justify-center mb-4">
        <Image src="/logo.svg" width={150} height={80} alt="Logo" />
      </div>

      
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

      
      {learningPoints && (
        <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700">
          {learningPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}

    
      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          {section.title && (
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {section.title}
            </h3>
          )}
          {section.content && (
            <p className="text-gray-700 mb-4">{section.content}</p>
          )}
          {section.list && (
            <ul className={`space-y-3 mb-6 text-gray-700 ${section.listType === 'disc' ? 'list-disc list-inside' : ''}`}>
              {section.list.map((item, idx) => (
                <li key={idx}>
                  {typeof item === 'object' ? (
                    <>
                      <span className="font-medium">{item.label}:</span>{" "}
                      {item.value} {item.emphasis && <em>({item.emphasis})</em>}
                    </>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}


      {tip && (
        <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded">
          <p className="text-gray-800 italic">{tip}</p>
        </div>
      )}
    </section>
  );
};

export default MessageTemplate; 