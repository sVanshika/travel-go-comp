import React from 'react';

const ActivityModal = ({ isOpen, onClose, activities }) => {
    if (!isOpen) return null;
  
    console.log("Selected Activities:", activities[0].activities);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Activities</h2>
                <ul className="space-y-6 text-sm text-gray-800">
  {activities.map((dayItem, dayIndex) => (
    <li key={dayIndex}>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
        {dayItem.day}
      </h3>

      <ul className="pl-5 list-disc space-y-2">
        {dayItem.activities.map((act, i) => (
          <li key={i}>
            <span className="font-semibold text-blue-700">{act.time}</span>
            <span className="ml-2 text-gray-700">{act.description}</span>
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>


                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ActivityModal;